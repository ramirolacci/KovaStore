import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryFilter } from '../types/product';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    favoritesCount,
    isWishlistOnly,
    setIsWishlistOnly,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(category);
    setIsWishlistOnly(false);
    setIsNavOpen(false);
    
    // Smooth scroll to products section
    const productsSection = document.getElementById('trends');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlistOnly(!isWishlistOnly);
    setIsNavOpen(false);
    const productsSection = document.getElementById('trends');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <a href="#" className="logo" onClick={() => handleCategoryClick('all')}>
        Sub<span>Urban</span>
      </a>

      <ul className={`nav ${isNavOpen ? 'open' : ''}`}>
        <li>
          <a href="#trends" onClick={() => handleCategoryClick('women')}>
            Woman
          </a>
        </li>
        <li>
          <a href="#trends" onClick={() => handleCategoryClick('men')}>
            Men
          </a>
        </li>
        <li>
          <a href="#trends" onClick={() => handleCategoryClick('kids')}>
            Kids
          </a>
        </li>
        <li>
          <a href="#trends" onClick={() => handleCategoryClick('accessories')}>
            Accessories
          </a>
        </li>
        <li>
          <a href="#trends" onClick={() => handleCategoryClick('new')}>
            New Collection
          </a>
        </li>
      </ul>

      <div className="nav-icon">
        <div className="search-wrapper">
          {showSearchInput ? (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="icon-btn" onClick={() => setShowSearchInput(false)}>
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              className="icon-btn"
              title="Search"
              onClick={() => setShowSearchInput(true)}
            >
              <Search size={22} />
            </button>
          )}
        </div>

        <button
          className={`icon-btn wishlist-btn ${isWishlistOnly ? 'active' : ''}`}
          title="Wishlist"
          onClick={handleWishlistToggle}
        >
          <Heart size={22} fill={isWishlistOnly ? '#ff3b30' : 'none'} color={isWishlistOnly ? '#ff3b30' : 'currentColor'} />
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </button>

        <a href="#" className="icon-btn" title="Account" onClick={(e) => e.preventDefault()}>
          <User size={22} />
        </a>

        <button
          className="icon-btn cart-btn"
          title="Shopping Cart"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="badge green-badge">{cartCount}</span>}
        </button>

        <button
          className="icon-btn menu-icon-btn"
          id="menu-icon"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};
