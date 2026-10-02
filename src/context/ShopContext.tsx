import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CategoryFilter, SortOption } from '../types/product';
import { productsData } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  favorites: string[]; // Product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  favoritesCount: number;
  isWishlistOnly: boolean;
  setIsWishlistOnly: (wishlistOnly: boolean) => void;

  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  toastMessage: string | null;
  toastType: 'success' | 'info' | 'favorite';
  showToast: (msg: string, type?: 'success' | 'info' | 'favorite') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(productsData);
  
  // Load initial cart & favorites from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kova_suburban_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kova_suburban_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(() => {
    return localStorage.getItem('kova_promo_code') || null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOnly, setIsWishlistOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'favorite'>('success');

  useEffect(() => {
    localStorage.setItem('kova_suburban_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kova_suburban_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (appliedPromoCode) {
      localStorage.setItem('kova_promo_code', appliedPromoCode);
    } else {
      localStorage.removeItem('kova_promo_code');
    }
  }, [appliedPromoCode]);

  const showToast = (msg: string, type: 'success' | 'info' | 'favorite' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Talle Único');
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize: chosenSize }];
      }
    });

    showToast(`Agregado "${product.name}" (${chosenSize}) a la bolsa`, 'success');
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && (!size || item.selectedSize === size)))
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && (!size || item.selectedSize === size)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'KOVA20' || formatted === 'SUBURBAN20') {
      setAppliedPromoCode(formatted);
      showToast('🎉 ¡Cupón KOVA20 aplicado! 20% de descuento desbloqueado.', 'success');
      return { success: true, message: '¡20% OFF aplicado con éxito!' };
    }
    if (formatted === 'FREESHIP') {
      setAppliedPromoCode(formatted);
      showToast('🎉 ¡Cupón de envío gratis aplicado!', 'success');
      return { success: true, message: '¡Envío Gratis activado!' };
    }
    return { success: false, message: 'Cupón de descuento no válido.' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    showToast('Cupón promocional eliminado', 'info');
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      if (exists) {
        showToast(`Eliminado "${product?.name || 'Producto'}" de favoritos`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Guardado "${product?.name || 'Producto'}" en favoritos`, 'favorite');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  const discountRate = appliedPromoCode === 'KOVA20' || appliedPromoCode === 'SUBURBAN20' ? 0.20 : 0;
  const cartDiscount = cartSubtotal * discountRate;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
        isWishlistOnly,
        setIsWishlistOnly,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        toastType,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
