import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <div className="app-container">
        <Header />
        <Hero />
        <ProductGrid />
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <NotificationToast />
      </div>
    </ShopProvider>
  );
};

export default App;
