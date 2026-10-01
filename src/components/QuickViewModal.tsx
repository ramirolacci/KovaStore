import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleFavorite, isFavorite } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const favorited = isFavorite(quickViewProduct.id);
  const availableSizes = quickViewProduct.sizes || ['S', 'M', 'L', 'XL'];
  const activeSize = selectedSize || availableSizes[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setQuickViewProduct(null)}>
          <X size={24} />
        </button>

        <div className="modal-grid">
          <div className="modal-image">
            <img src={quickViewProduct.image} alt={quickViewProduct.name} />
          </div>

          <div className="modal-info">
            <h2>{quickViewProduct.name}</h2>
            <div className="rate" style={{ marginBottom: '1rem' }}>
              {[...Array(quickViewProduct.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#FFBF00" color="#FFBF00" style={{ marginRight: '2px' }} />
              ))}
              <span className="rating-text">(5.0 / 5)</span>
            </div>

            <p className="modal-price">${quickViewProduct.price.toFixed(2)}</p>

            <p className="modal-description">{quickViewProduct.description}</p>

            {availableSizes.length > 0 && (
              <div className="size-selector">
                <label>Select Size:</label>
                <div className="size-options">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      className={`size-btn ${activeSize === sz ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="main-btn add-btn" onClick={handleAddToCart}>
                <ShoppingBag size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Add To Cart
              </button>

              <button
                className={`fav-modal-btn ${favorited ? 'active' : ''}`}
                onClick={() => toggleFavorite(quickViewProduct.id)}
              >
                <Heart size={22} fill={favorited ? '#ff3b30' : 'none'} color={favorited ? '#ff3b30' : 'currentColor'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
