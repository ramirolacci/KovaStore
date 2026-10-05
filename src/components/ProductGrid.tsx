import React, { useRef, useLayoutEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Product } from '../types/product';
import { Sparkles, SearchX, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categoryTitles: Record<string, string> = {
  all: 'EXPLORAR TODO EL CATÁLOGO',
  products: 'INDUMENTARIA Y BUZOS',
  accessories: 'JOYERÍA Y ACCESORIOS',
  men: 'COLECCIÓN HOMBRE',
  women: 'COLECCIÓN MUJER',
  new: 'NOVEDADES // ÚLTIMO DROP'
};

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

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // GSAP Section Header & Cards Scroll Reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.section-header-modern',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Filter Toolbar Animation
      gsap.fromTo(
        '.filter-controls-wrapper',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on filter change or initial render
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card-modern',
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: {
            each: 0.07,
            grid: 'auto',
            from: 'start'
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory, searchQuery, sortBy, isWishlistOnly]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setIsWishlistOnly(false);
  };

  const currentTitle = isWishlistOnly
    ? 'TUS PRODUCTOS GUARDADOS'
    : searchQuery
    ? `RESULTADOS DE BÚSQUEDA: "${searchQuery}"`
    : categoryTitles[selectedCategory] || `${selectedCategory.toUpperCase()} DROP`;

  return (
    <section ref={sectionRef} className="catalog-section" id="trends">
      {/* Section Header */}
      <div className="section-header-modern">
        <div className="section-pill">
          <Sparkles size={13} color="var(--color-accent)" />
          <span>CÁPSULA CURADA // SS-26</span>
        </div>
        <h2 className="section-title">{currentTitle}</h2>
        <p className="section-subtitle">
          Diseños de corte contemporáneo confeccionados con textiles pesados de máxima durabilidad.
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
          <h3>No encontramos productos con esos filtros</h3>
          <p>
            {isWishlistOnly
              ? 'Aún no has agregado productos a favoritos. Haz clic en el icono de corazón en cualquier prenda.'
              : 'Verifica la ortografía o intenta restablecer los filtros de categoría y búsqueda.'}
          </p>
          <button className="btn-primary" onClick={resetAllFilters}>
            <RotateCcw size={16} /> Restablecer Todos los Filtros
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="products-grid-modern">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
