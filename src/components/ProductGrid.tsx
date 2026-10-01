import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, searchQuery, isWishlistOnly, favorites } = useShop();

  // Filter products based on active criteria
  let filteredProducts = products;

  if (isWishlistOnly) {
    filteredProducts = products.filter((p) => favorites.includes(p.id));
  } else if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  } else if (selectedCategory !== 'all') {
    if (selectedCategory === 'products') {
      filteredProducts = products.filter((p) => p.category === 'products');
    } else if (selectedCategory === 'accessories') {
      filteredProducts = products.filter((p) => p.category === 'accessories');
    } else if (selectedCategory === 'new') {
      filteredProducts = products.filter((p) => p.isNew);
    } else {
      filteredProducts = products.filter((p) => p.gender === selectedCategory || p.gender === 'unisex');
    }
  }

  const isFilteredView = isWishlistOnly || searchQuery.trim() !== '' || selectedCategory !== 'all';

  const trendClothing = products.filter((p) => p.category === 'products');
  const trendAccessories = products.filter((p) => p.category === 'accessories');

  return (
    <section className="trends" id="trends">
      <CategoryFilter />

      {isFilteredView ? (
        <>
          <div className="center-text">
            <h2>
              {isWishlistOnly
                ? `Wishlist Items (${filteredProducts.length})`
                : searchQuery
                ? `Search Results for "${searchQuery}" (${filteredProducts.length})`
                : `Category: ${selectedCategory.toUpperCase()} (${filteredProducts.length})`}
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-grid">
              <p>No products match your criteria.</p>
            </div>
          ) : (
            <div className="products">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Main Trend Products Section */}
          <div className="center-text">
            <h2>Trend Products</h2>
          </div>
          <div className="products">
            {trendClothing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Trending Accessories Section */}
          <div className="center-text" style={{ marginTop: '4rem' }}>
            <h2>Trending Accessories</h2>
          </div>
          <div className="products">
            {trendAccessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
