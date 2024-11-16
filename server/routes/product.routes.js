// routes/product.routes.js
import express from 'express';
import Product from '../models/product.model.js';
import { auth, adminAuth } from '../middleware/auth.middleware.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', async (req, res) => {
  try {
    const { category, subCategory, search, sort, limit = 10, page = 1 } = req.query;
    
    let query = {};
    
    // Apply filters
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply sorting
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption.price = 1;
        break;
      case 'price-desc':
        sortOption.price = -1;
        break;
      case 'newest':
        sortOption.createdAt = -1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create product (admin only)
router.post('/', [auth, adminAuth, upload.array('images', 10)], async (req, res) => {
  try {
    const productData = JSON.parse(req.body.product);
    
    // Upload images to Cloudinary
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'sammy-baba-store' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    // Create product with image URLs
    const product = new Product({
      ...productData,
      colors: productData.colors.map((color, index) => ({
        ...color,
        imageUrls: [imageUrls[index]]
      }))
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;