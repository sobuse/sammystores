import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women', 'socks']
  },
  subCategory: {
    type: String,
    required: true
  },
  colors: [{
    name: String,
    value: String,
    imageUrls: [String]
  }],
  sizes: [{
    size: String,
    inventory: Number
  }],
  features: [String],
  isNew: {
    type: Boolean,
    default: false
  },
  isSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);