import React from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryFilter as CategoryType } from '../types/product';

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, isWishlistOnly, setIsWishlistOnly } = useShop();

  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All Products', value: 'all' },
    { label: 'Clothing', value: 'products' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Kids', value: 'kids' },
    { label: 'New Collection', value: 'new' }
  ];

  return (
    <div className="filter-container">
      {isWishlistOnly && (
        <div className="wishlist-banner">
          <span>Showing your Favorite Items</span>
          <button onClick={() => setIsWishlistOnly(false)}>Show All Catalog</button>
        </div>
      )}

      {!isWishlistOnly && (
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`pill ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
