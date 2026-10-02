import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types/product';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite, addToCart, setQuickViewProduct } = useShop();
  const favorited = isFavorite(product.id);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size'
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  return (
    <div className="product-card-modern">
      {/* Product Badges */}
      <div className="card-badge-container">
        {product.tag && (
          <span className={`badge-tag badge-${product.tag.toLowerCase()}`}>
            {product.tag}
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
        title={favorited ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label="Wishlist toggle"
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
            <Eye size={15} /> Quick View
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.stockCount && product.stockCount <= 5 && (
          <div className="card-stock-alert">
            <span className="stock-dot"></span>
            Only {product.stockCount} left
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
            <span className="reviews-count">({product.reviewCount} reviews)</span>
          )}
          <span className="category-tag">{product.gender || product.category}</span>
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
            <span className="size-label">Size:</span>
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
            title="Add to cart"
          >
            {isAddedRecently ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
