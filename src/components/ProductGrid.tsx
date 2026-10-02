import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Product } from '../types/product';
import { Sparkles, SearchX, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isWishlistOnly,
    setIsWishlistOnly,
    favorites,
    sortBy
  } = useShop();

  // 1. Filtering Phase
  let filtered = [...products];

  if (isWishlistOnly) {
    filtered = filtered.filter((p) => favorites.includes(p.id));
  } else if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender?.toLowerCase().includes(q)
    );
  } else if (selectedCategory !== 'all') {
    if (selectedCategory === 'products') {
      filtered = filtered.filter((p) => p.category === 'products');
    } else if (selectedCategory === 'accessories') {
      filtered = filtered.filter((p) => p.category === 'accessories');
    } else if (selectedCategory === 'new') {
      filtered = filtered.filter((p) => p.isNew);
    } else {
      filtered = filtered.filter((p) => p.gender === selectedCategory || p.gender === 'unisex');
    }
  }

  // 2. Sorting Phase
  const sortProducts = (items: Product[]) => {
    return [...items].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  };

  const sortedProducts = sortProducts(filtered);
  const isFilteredView = isWishlistOnly || searchQuery.trim() !== '' || selectedCategory !== 'all' || sortBy !== 'featured';

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setIsWishlistOnly(false);
  };

  return (
    <section className="catalog-section" id="trends">
      {/* Section Header */}
      <div className="section-header-modern">
        <div className="section-pill">
          <Sparkles size={13} color="var(--color-accent)" />
          <span>CURATED CAPSULE // SS-26</span>
        </div>
        <h2 className="section-title">
          {isWishlistOnly
            ? 'SAVED WISHLIST'
            : searchQuery
            ? `SEARCH: "${searchQuery}"`
            : selectedCategory === 'all'
            ? 'EXPLORE THE CATALOG'
            : `${selectedCategory.toUpperCase()} COLLECTION`}
        </h2>
        <p className="section-subtitle">
          Engineered for effortless style. Designed with premium textiles and precision tailoring.
        </p>
      </div>

      {/* Filter and Sorting Toolbar */}
      <CategoryFilter />

      {/* Grid Content */}
      {sortedProducts.length === 0 ? (
        <div className="empty-catalog-card">
          <div className="empty-icon-box">
            <SearchX size={48} />
          </div>
          <h3>No products match your criteria</h3>
          <p>
            {isWishlistOnly
              ? 'You have not added any favorites yet. Explore the drop and click the heart icon.'
              : 'Try checking your spelling or adjusting your category and search filters.'}
          </p>
          <button className="btn-primary" onClick={resetAllFilters}>
            <RotateCcw size={16} /> Reset All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid-modern">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
