import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 bg-allbirds-neutral-light">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="object-cover object-center w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Color Options */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {product.colors.map((color, index) => (
            <button
              key={color}
              className={`w-4 h-4 rounded-full border-2 ${
                currentImageIndex === index
                  ? 'border-allbirds-charcoal'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onMouseEnter={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* New/Sale Badge */}
        {(product.isNew || product.isSale) && (
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 text-xs font-medium ${
              product.isSale ? 'bg-red-600 text-white' : 'bg-allbirds-charcoal text-white'
            }`}>
              {product.isSale ? 'SALE' : 'NEW'}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-allbirds-charcoal font-medium">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-allbirds-gray">{product.colors.length} Colors</p>
          <div className="flex items-center space-x-2">
            {product.isSale && (
              <span className="text-red-600 line-through">${product.price}</span>
            )}
            <span className={product.isSale ? 'text-red-600' : 'text-allbirds-charcoal'}>
              ${product.isSale ? product.salePrice : product.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;