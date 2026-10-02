import React from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryFilter as CategoryType, SortOption } from '../types/product';
import { Sparkles, SlidersHorizontal, Heart, X, Check } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    isWishlistOnly,
    setIsWishlistOnly,
    sortBy,
    setSortBy,
    favoritesCount
  } = useShop();

  const categories: { label: string; value: CategoryType; count?: number; isSpecial?: boolean }[] = [
    { label: 'All Catalog', value: 'all', count: products.length },
    { label: 'Apparel', value: 'products', count: products.filter(p => p.category === 'products').length },
    { label: 'Accessories', value: 'accessories', count: products.filter(p => p.category === 'accessories').length },
    { label: 'Men', value: 'men', count: products.filter(p => p.gender === 'men' || p.gender === 'unisex').length },
    { label: 'Women', value: 'women', count: products.filter(p => p.gender === 'women' || p.gender === 'unisex').length },
    { label: 'New Drop', value: 'new', count: products.filter(p => p.isNew).length, isSpecial: true }
  ];

  return (
    <div className="filter-controls-wrapper">
      {/* Wishlist Active Notification Banner */}
      {isWishlistOnly && (
        <div className="wishlist-active-banner">
          <div className="wishlist-banner-content">
            <Heart size={18} fill="currentColor" color="var(--color-danger)" />
            <span>
              Viewing <strong>{favoritesCount} saved {favoritesCount === 1 ? 'item' : 'items'}</strong> in your wishlist
            </span>
          </div>
          <button className="btn-banner-clear" onClick={() => setIsWishlistOnly(false)}>
            <X size={15} /> Show All Products
          </button>
        </div>
      )}

      {/* Main Filter & Sort Toolbar */}
      {!isWishlistOnly && (
        <div className="toolbar-container">
          {/* Category Pills */}
          <div className="category-scroll-container">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  className={`category-chip ${isActive ? 'active' : ''} ${cat.isSpecial ? 'special-chip' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.isSpecial && <Sparkles size={13} className="chip-sparkle" />}
                  <span>{cat.label}</span>
                  {cat.count !== undefined && <span className="chip-count">{cat.count}</span>}
                  {isActive && <Check size={13} className="chip-check" />}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-box">
            <SlidersHorizontal size={15} className="sort-icon" />
            <span className="sort-label">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="sort-select"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
