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
          <span>ARCHIVO EXCLUSIVO // DROP 04</span>
        </div>
        <h2>LA CULTURA STREETWEAR PURA</h2>
        <p>
          Hoodies de friza francesa pesada, pantalones cargo utilitarios modulares y accesorios de acero de grado quirúrgico confeccionados para la cultura urbana actual.
        </p>
        <div className="promo-actions">
          <button className="btn-primary" onClick={handleExplore}>
            Comprar la Cápsula <ArrowRight size={18} />
          </button>
          <div className="promo-stat">
            <Sparkles size={16} color="var(--color-accent)" />
            <span>Edición Limitada de 250 Unidades</span>
          </div>
        </div>
      </div>
    </section>
  );
};
