import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-allbirds-neutral-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 p-8">
          {/* Product Images */}
          <div className="col-span-4 flex justify-center items-center space-x-4">
            <img src="/shoe-white.png" alt="White Sneaker" className="w-1/4" />
            <img src="/shoe-gray.png" alt="Gray Sneaker" className="w-1/4" />
            <img src="/shoe-beige.png" alt="Beige Sneaker" className="w-1/4" />
            <img src="/shoe-charcoal.png" alt="Charcoal Sneaker" className="w-1/4" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
          <div className="text-right">
            <h1 className="text-6xl font-light mb-4 text-allbirds-charcoal">Comfortable</h1>
            <h2 className="text-4xl font-light mb-8 text-allbirds-charcoal">BY NATURE</h2>
            <p className="text-lg mb-8 text-allbirds-gray">
              OUR ICONIC EVERYDAY SNEAKS ARE A SOFT,<br />
              PILLOWY RETREAT FOR YOUR FEET.
            </p>
            <div className="flex justify-end space-x-4">
              <Link to="/shop-men" className="bg-allbirds-white text-allbirds-charcoal px-8 py-3 hover:bg-allbirds-cream transition duration-200">
                SHOP MEN
              </Link>
              <Link to="/shop-women" className="bg-allbirds-white text-allbirds-charcoal px-8 py-3 hover:bg-allbirds-cream transition duration-200">
                SHOP WOMEN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;