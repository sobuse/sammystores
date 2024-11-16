import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // This will be replaced with actual cart functionality
    console.log('Added to cart:', {
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize,
      quantity
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-allbirds-neutral-light">
            <img
              src={product.images[selectedColor]}
              alt={product.name}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`aspect-w-1 aspect-h-1 ${
                  selectedColor === index ? 'ring-2 ring-allbirds-charcoal' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - ${product.colors[index]}`}
                  className="object-cover object-center w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-allbirds-charcoal">{product.name}</h1>
            <p className="text-xl text-allbirds-gray mt-2">
              ${product.isSale ? product.salePrice : product.price}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-allbirds-charcoal mb-3">COLOR</h3>
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === index
                      ? 'border-allbirds-charcoal'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-allbirds-charcoal mb-3">SIZE</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 border ${
                    selectedSize === size
                      ? 'border-allbirds-charcoal bg-allbirds-charcoal text-white'
                      : 'border-allbirds-stone hover:border-allbirds-charcoal'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-sm font-medium text-allbirds-charcoal mb-3">QUANTITY</h3>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border border-allbirds-stone rounded px-3 py-2"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-allbirds-charcoal text-white py-4 hover:bg-allbirds-brown transition duration-200"
          >
            Add to Cart
          </button>

          {/* Product Description */}
          <div className="border-t border-allbirds-stone pt-6">
            <h3 className="text-lg font-medium text-allbirds-charcoal mb-3">Description</h3>
            <p className="text-allbirds-gray">{product.description}</p>
            <ul className="mt-4 space-y-2">
              {product.features.map(feature => (
                <li key={feature} className="flex items-center text-allbirds-gray">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;