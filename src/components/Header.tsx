import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryFilter } from '../types/product';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    favoritesCount,
    isWishlistOnly,
    setIsWishlistOnly,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearchInput(false);
        setIsNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(category);
    setIsWishlistOnly(false);
    setIsNavOpen(false);
    
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

  const navItems: { label: string; value: CategoryFilter; isSpecial?: boolean }[] = [
    { label: 'All Catalog', value: 'all' },
    { label: 'Apparel', value: 'products' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'New Drop', value: 'new', isSpecial: true }
  ];

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => handleCategoryClick('all')}>
          <span className="logo-main">KOVA</span>
          <span className="logo-sub">STUDIO</span>
          <span className="logo-dot"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className={`main-nav ${isNavOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = !isWishlistOnly && selectedCategory === item.value;
              return (
                <li key={item.value}>
                  <button
                    className={`nav-link ${isActive ? 'active' : ''} ${item.isSpecial ? 'special-link' : ''}`}
                    onClick={() => handleCategoryClick(item.value)}
                  >
                    {item.isSpecial && <Sparkles size={13} className="special-icon" />}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Action Icons */}
        <div className="header-actions">
          {/* Search Toggle / Expanded Bar */}
          <div className="search-box-wrapper">
            {showSearchInput ? (
              <div className="search-expanded">
                <Search size={16} className="search-inner-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search drops, hoodies, rings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="search-close-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchInput(false);
                  }}
                  title="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                className="action-icon-btn"
                title="Search products (Ctrl+K)"
                onClick={() => setShowSearchInput(true)}
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className={`action-icon-btn wishlist-icon-btn ${isWishlistOnly ? 'active' : ''}`}
            title="Wishlist"
            onClick={handleWishlistToggle}
          >
            <Heart size={20} fill={isWishlistOnly || favoritesCount > 0 ? 'currentColor' : 'none'} />
            {favoritesCount > 0 && <span className="action-badge badge-fav">{favoritesCount}</span>}
          </button>

          {/* Shopping Cart Button */}
          <button
            className="action-icon-btn cart-icon-btn"
            title="Shopping Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="action-badge badge-cart">{cartCount}</span>}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            className="action-icon-btn mobile-menu-toggle"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
