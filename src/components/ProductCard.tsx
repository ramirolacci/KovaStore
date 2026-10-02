import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types/product';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

const tagLabels: Record<string, string> = {
  BESTSELLER: 'MÁS VENDIDO',
  HOT: 'TENDENCIA',
  NEW: 'NUEVO',
  LIMITED: 'LIMITADO'
};

const genderLabels: Record<string, string> = {
  men: 'Hombre',
  women: 'Mujer',
  unisex: 'Unisex',
  kids: 'Niños',
  products: 'Indumentaria',
  accessories: 'Accesorio'
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite, addToCart, setQuickViewProduct } = useShop();
  const favorited = isFavorite(product.id);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Talle Único'
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const displayTag = product.tag ? (tagLabels[product.tag] || product.tag) : null;
  const categoryOrGender = product.gender ? (genderLabels[product.gender] || product.gender) : (genderLabels[product.category] || product.category);

  return (
    <div className="product-card-modern">
      {/* Product Badges */}
      <div className="card-badge-container">
        {displayTag && (
          <span className={`badge-tag badge-${product.tag?.toLowerCase()}`}>
            {displayTag}
          </span>
        )}
        {product.discountPercent && (
          <span className="badge-discount">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Wishlist Floating Button */}
      <button
        className={`card-wishlist-btn ${favorited ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        title={favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        aria-label="Alternar favoritos"
      >
        <Heart
          size={18}
          fill={favorited ? 'currentColor' : 'none'}
          className={favorited ? 'heart-favorited' : ''}
        />
      </button>

      {/* Image Container with Hover Actions */}
      <div
        className="card-media-wrapper"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="card-image"
        />
        
        {/* Overlay Action */}
        <div className="card-media-overlay">
          <button
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye size={15} /> Vista Rápida
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.stockCount && product.stockCount <= 5 && (
          <div className="card-stock-alert">
            <span className="stock-dot"></span>
            Solo quedan {product.stockCount}
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="card-details">
        {/* Rating and Reviews */}
        <div className="card-rating-row">
          <div className="stars-wrapper">
            <Star size={13} fill="#FFB800" color="#FFB800" />
            <span className="rating-score">{product.rating.toFixed(1)}</span>
          </div>
          {product.reviewCount && (
            <span className="reviews-count">({product.reviewCount} opiniones)</span>
          )}
          <span className="category-tag">{categoryOrGender}</span>
        </div>

        {/* Product Title */}
        <h3
          className="card-title"
          onClick={() => setQuickViewProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Size Selection Chips if available */}
        {product.sizes && product.sizes.length > 1 && (
          <div className="card-size-selector">
            <span className="size-label">Talle:</span>
            <div className="size-chips-list">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  className={`size-chip-mini ${selectedSize === sz ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="card-footer-row">
          <div className="price-block">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className={`btn-card-add ${isAddedRecently ? 'added-success' : ''}`}
            onClick={handleQuickAdd}
            title="Agregar a la bolsa"
          >
            {isAddedRecently ? (
              <>
                <Check size={16} /> Agregado
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
