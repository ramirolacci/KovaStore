import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryFilter as CategoryType, SortOption } from '../types/product';
import { Sparkles, SlidersHorizontal, Heart, X, Check, ChevronDown, Flame, Star, ArrowUpDown, LucideIcon } from 'lucide-react';

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

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const categories: { label: string; value: CategoryType; count?: number; isSpecial?: boolean }[] = [
    { label: 'Todo el Catálogo', value: 'all', count: products.length },
    { label: 'Indumentaria', value: 'products', count: products.filter(p => p.category === 'products').length },
    { label: 'Accesorios', value: 'accessories', count: products.filter(p => p.category === 'accessories').length },
    { label: 'Hombre', value: 'men', count: products.filter(p => p.gender === 'men' || p.gender === 'unisex').length },
    { label: 'Mujer', value: 'women', count: products.filter(p => p.gender === 'women' || p.gender === 'unisex').length },
    { label: 'Nuevo Drop', value: 'new', count: products.filter(p => p.isNew).length, isSpecial: true }
  ];

  const sortOptions: { label: string; value: SortOption; icon: LucideIcon }[] = [
    { label: 'Destacados del Drop', value: 'featured', icon: Flame },
    { label: 'Precio: Menor a Mayor', value: 'price-asc', icon: ArrowUpDown },
    { label: 'Precio: Mayor a Menor', value: 'price-desc', icon: ArrowUpDown },
    { label: 'Mejor Valorados', value: 'rating', icon: Star },
    { label: 'Más Recientes', value: 'newest', icon: Sparkles }
  ];

  const currentSortOption = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

          {/* Custom Styled Sort Dropdown */}
          <div className="custom-sort-wrapper" ref={sortDropdownRef}>
            <button
              type="button"
              className={`sort-trigger-btn ${isSortOpen ? 'active' : ''}`}
              onClick={() => setIsSortOpen(!isSortOpen)}
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
            >
              <SlidersHorizontal size={14} className="sort-icon" />
              <span className="sort-label">Ordenar:</span>
              <span className="sort-current-val">{currentSortOption.label}</span>
              <ChevronDown size={14} className={`sort-chevron ${isSortOpen ? 'open' : ''}`} />
            </button>

            {isSortOpen && (
              <div className="custom-sort-menu" role="listbox">
                <div className="sort-menu-header">OPCIONES DE ORDEN</div>
                {sortOptions.map((opt) => {
                  const isSelected = sortBy === opt.value;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`sort-menu-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortOpen(false);
                      }}
                    >
                      <div className="sort-item-left">
                        <Icon size={14} className="sort-item-icon" />
                        <span className="sort-item-label">{opt.label}</span>
                      </div>
                      {isSelected && <Check size={14} className="sort-item-check" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
