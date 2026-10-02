import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromoBanner: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleExplore = () => {
    setSelectedCategory('new');
    const el = document.getElementById('trends');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="promo-banner-section">
      <div className="promo-banner-card">
        <div className="promo-badge-pill">
          <Flame size={15} />
          <span>EXCLUSIVE ARCHIVE // DROP 04</span>
        </div>
        <h2>THE RAW STREET CULTURE</h2>
        <p>
          Heavyweight French Terry hoodies, modular utilitarian cargo joggers, and surgical-grade steel accessories engineered for modern youth.
        </p>
        <div className="promo-actions">
          <button className="btn-primary" onClick={handleExplore}>
            Shop The Capsule <ArrowRight size={18} />
          </button>
          <div className="promo-stat">
            <Sparkles size={16} color="var(--color-accent)" />
            <span>Limited Edition of 250 Units</span>
          </div>
        </div>
      </div>
    </section>
  );
};
