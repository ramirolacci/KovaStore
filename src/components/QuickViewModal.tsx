import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Truck, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const tagLabels: Record<string, string> = {
  BESTSELLER: 'MÁS VENDIDO',
  HOT: 'TENDENCIA',
  NEW: 'NUEVO',
  LIMITED: 'LIMITADO'
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleFavorite, isFavorite } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const favorited = isFavorite(quickViewProduct.id);
  const availableSizes = quickViewProduct.sizes || ['S', 'M', 'L', 'XL'];
  const activeSize = selectedSize || availableSizes[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 800);
  };

  const displayTag = quickViewProduct.tag ? (tagLabels[quickViewProduct.tag] || quickViewProduct.tag) : null;

  return (
    <div
      className="modal-backdrop-modern"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-panel-modern"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-panel-close"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="modal-inner-grid">
          {/* Media Column */}
          <div className="modal-media-col">
            <div className="modal-image-wrapper">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="modal-main-img"
              />
              {displayTag && (
                <span className={`modal-badge badge-${quickViewProduct.tag?.toLowerCase()}`}>
                  {displayTag}
                </span>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="modal-details-col">
            <div className="modal-header-info">
              <div className="modal-rating-badge">
                <Star size={14} fill="#FFB800" color="#FFB800" />
                <span className="rating-num">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="rating-total">
                  ({quickViewProduct.reviewCount || 100}+ opiniones verificadas)
                </span>
              </div>

              <h2 className="modal-product-title">{quickViewProduct.name}</h2>

              <div className="modal-pricing-row">
                <span className="modal-current-price">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <>
                    <span className="modal-original-price">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                    <span className="modal-discount-tag">
                      Ahorras {quickViewProduct.discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="modal-description-text">
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="modal-size-block">
                <div className="modal-label-row">
                  <label>Seleccionar Talle:</label>
                  <span className="size-guide-hint">Corte Estándar</span>
                </div>
                <div className="modal-sizes-list">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      className={`modal-size-btn ${activeSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="modal-qty-block">
              <label>Cantidad:</label>
              <div className="modal-stepper">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={15} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions-row">
              <button
                className={`btn-primary modal-btn-add ${isAdded ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> ¡Agregado a la Bolsa!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Agregar a la Bolsa — ${(quickViewProduct.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              <button
                className={`modal-wishlist-toggle ${favorited ? 'active' : ''}`}
                onClick={() => toggleFavorite(quickViewProduct.id)}
                title="Guardar en favoritos"
              >
                <Heart size={20} fill={favorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Guarantee mini badges */}
            <div className="modal-guarantees">
              <div className="guarantee-item">
                <Truck size={15} color="var(--color-accent)" />
                <span>Envío express gratis en pedidos $100+</span>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={15} color="var(--color-accent)" />
                <span>30 Días de Devolución Sin Cargo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
