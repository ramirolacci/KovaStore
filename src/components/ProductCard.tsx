import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types/product';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite, addToCart, setQuickViewProduct } = useShop();
  const favorited = isFavorite(product.id);

  return (
    <div className="row">
      {product.isNew && <span className="new-tag">NEW</span>}

      <div className="image-container">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="overlay-actions">
          <button
            className="quick-view-btn"
            title="Quick View"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye size={18} /> Quick View
          </button>
        </div>
      </div>

      <div
        className="fav"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={24}
          className={`heart-icon ${favorited ? 'favorited' : ''}`}
          fill={favorited ? '#ff3b30' : 'none'}
          color={favorited ? '#ff3b30' : 'currentColor'}
        />
      </div>

      <div className="rate">
        {[...Array(product.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#FFBF00" color="#FFBF00" style={{ marginRight: '2px' }} />
        ))}
      </div>

      <div className="pricing">
        <h4>{product.name}</h4>
        <div className="price-action">
          <p>${product.price.toFixed(2)}</p>
          <button
            className="add-to-cart-btn"
            title="Add to Cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingBag size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};
