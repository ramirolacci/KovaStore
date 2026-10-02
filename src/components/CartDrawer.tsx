import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    showToast
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const progressPercent = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal;
  const isFreeShipping = remainingForFreeShipping <= 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
      setTimeout(() => setPromoError(null), 3000);
    } else {
      setPromoInput('');
      setPromoError(null);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast('🎉 ¡Pedido realizado con éxito! Gracias por comprar en KOVA / SubUrban.', 'success');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div
      className="cart-drawer-overlay"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-panel-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="cart-title-icon" />
            <h3>Tu Bolsa ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar bolsa"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="cart-shipping-meter">
          <div className="shipping-meter-status">
            {isFreeShipping ? (
              <span className="shipping-unlocked">
                <Sparkles size={14} /> ¡Desbloqueaste ENVÍO MUNDIAL GRATIS!
              </span>
            ) : (
              <span>
                Agrega <strong>${remainingForFreeShipping.toFixed(2)}</strong> más para tener <strong>ENVÍO GRATIS</strong>
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className={`shipping-progress-bar ${isFreeShipping ? 'complete' : ''}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Body Items List */}
        <div className="cart-panel-body">
          {cart.length === 0 ? (
            <div className="cart-empty-view">
              <div className="cart-empty-icon-circle">
                <ShoppingBag size={42} />
              </div>
              <h4>Tu bolsa está vacía</h4>
              <p>Explora nuestro último drop y añade tus prendas de streetwear favoritas.</p>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Explorar Drop <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="cart-items-wrapper">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="cart-item-card"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {item.selectedSize && (
                      <span className="cart-item-size-tag">
                        Talle: {item.selectedSize}
                      </span>
                    )}

                    <div className="cart-item-bottom">
                      <div className="cart-item-stepper">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                          }
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                          }
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="cart-item-total-price">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary and Checkout */}
        {cart.length > 0 && (
          <div className="cart-panel-footer">
            {/* Promo Code Input */}
            <div className="cart-promo-container">
              {appliedPromoCode ? (
                <div className="applied-promo-chip">
                  <div className="applied-promo-info">
                    <Tag size={14} color="var(--color-accent)" />
                    <span>Código <strong>{appliedPromoCode}</strong> (-20% OFF)</span>
                  </div>
                  <button className="remove-promo-btn" onClick={removePromoCode} title="Eliminar cupón">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form className="promo-input-group" onSubmit={handleApplyPromo}>
                  <input
                    type="text"
                    placeholder='Cupón de descuento (prueba "KOVA20")'
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit" className="btn-promo-apply">
                    Aplicar
                  </button>
                </form>
              )}
              {promoError && <span className="promo-error-msg">{promoError}</span>}
            </div>

            {/* Calculations Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="summary-row discount-row">
                  <span>Descuento Promocional (20%)</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Costo de Envío</span>
                <span>{isFreeShipping ? 'GRATIS' : '$9.99'}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Estimado</span>
                <strong>${(cartTotal + (isFreeShipping ? 0 : 9.99)).toFixed(2)}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="cart-footer-actions">
              <button
                className="btn-primary btn-checkout-main"
                onClick={handleCheckout}
              >
                Proceder al Pago <ArrowRight size={18} />
              </button>
              <div className="cart-security-badge">
                <ShieldCheck size={14} />
                <span>Checkout 100% Encriptado de 256-Bits y Garantizado</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
