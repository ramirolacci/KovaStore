import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    showToast
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const progressPercent = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast('Order placed successfully! Thank you for shopping with SubUrban.');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>
            <ShoppingBag size={22} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h3>
          <button className="icon-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {cart.length > 0 && (
          <div className="free-shipping-bar">
            {remainingForFreeShipping > 0 ? (
              <p>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for FREE Shipping!</p>
            ) : (
              <p className="success-text">🎉 You unlocked FREE Shipping!</p>
            )}
            <div className="progress-bg">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={54} color="#555" />
              <p>Your cart is empty.</p>
              <button className="main-btn" onClick={() => setIsCartOpen(false)}>
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-item-details">
                    <h4>{item.product.name}</h4>
                    {item.selectedSize && <span className="size-badge">Size: {item.selectedSize}</span>}
                    <p className="item-price">${(item.product.price * item.quantity).toFixed(2)}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="delete-item-btn"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
