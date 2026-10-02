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
    { label: 'Todo el Catálogo', value: 'all', count: products.length },
    { label: 'Indumentaria', value: 'products', count: products.filter(p => p.category === 'products').length },
    { label: 'Accesorios', value: 'accessories', count: products.filter(p => p.category === 'accessories').length },
    { label: 'Hombre', value: 'men', count: products.filter(p => p.gender === 'men' || p.gender === 'unisex').length },
    { label: 'Mujer', value: 'women', count: products.filter(p => p.gender === 'women' || p.gender === 'unisex').length },
    { label: 'Nuevo Drop', value: 'new', count: products.filter(p => p.isNew).length, isSpecial: true }
  ];

  return (
    <div className="filter-controls-wrapper">
      {/* Wishlist Active Notification Banner */}
      {isWishlistOnly && (
        <div className="wishlist-active-banner">
          <div className="wishlist-banner-content">
            <Heart size={18} fill="currentColor" color="var(--color-danger)" />
            <span>
              Viendo <strong>{favoritesCount} {favoritesCount === 1 ? 'producto guardado' : 'productos guardados'}</strong> en tus favoritos
            </span>
          </div>
          <button className="btn-banner-clear" onClick={() => setIsWishlistOnly(false)}>
            <X size={15} /> Ver Todo el Catálogo
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
            <span className="sort-label">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="sort-select"
            >
              <option value="featured">Destacados del Drop</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="newest">Más Recientes</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
