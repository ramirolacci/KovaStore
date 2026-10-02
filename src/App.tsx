import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { NotificationToast } from './components/NotificationToast';

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <div className="app-layout">
        <AnnouncementBar />
        <Header />
        <main className="main-content-flow">
          <Hero />
          <TrustBadges />
          <ProductGrid />
          <PromoBanner />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <NotificationToast />
      </div>
    </ShopProvider>
  );
};

export default App;
