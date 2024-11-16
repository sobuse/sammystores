import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = {
    men: {
      title: 'MEN',
      categories: ['Running Shoes', 'Everyday Sneakers', 'Slip-Ons', 'High Tops']
    },
    women: {
      title: 'WOMEN',
      categories: ['Running Shoes', 'Everyday Sneakers', 'Slip-Ons', 'High Tops']
    },
    socks: {
      title: 'SOCKS',
      categories: ['Ankle Socks', 'Crew Socks', 'No-Show Socks', 'Merino Wool']
    }
  };

  return (
    <>
      <nav className="bg-allbirds-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-light text-allbirds-charcoal">
              Sammy Baba
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {Object.entries(navItems).map(([key, item]) => (
                <div key={key} className="relative group">
                  <button
                    className="text-allbirds-charcoal hover:text-allbirds-brown font-light py-2"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.title}
                  </button>
                  {activeDropdown === key && (
                    <div
                      className="absolute left-0 mt-2 w-48 bg-allbirds-white shadow-lg py-2 z-50"
                      onMouseEnter={() => setActiveDropdown(key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.categories.map((category) => (
                        <Link
                          key={category}
                          to={`/${key}/${category.toLowerCase().replace(/ /g, '-')}`}
                          className="block px-4 py-2 text-sm text-allbirds-charcoal hover:bg-allbirds-cream"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/sale" className="text-red-600 hover:text-red-700 font-light py-2">SALE</Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-allbirds-charcoal hover:text-allbirds-brown"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link to="/account" className="text-allbirds-charcoal hover:text-allbirds-brown">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <Link to="/cart" className="text-allbirds-charcoal hover:text-allbirds-brown">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;