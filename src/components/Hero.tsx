import React from 'react';
import { ArrowUpRight, Flame, Sparkles, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleShopClick = (e: React.MouseEvent, category: 'all' | 'new' = 'all') => {
    e.preventDefault();
    setSelectedCategory(category);
    const trendsElement = document.getElementById('trends');
    if (trendsElement) {
      trendsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background-wrapper">
        <div className="hero-backdrop-gradient"></div>
        <img
          src="/Images/Banner-Mobile-PullBear-1.png"
          alt="Cápsula de Streetwear KOVA 2026"
          className="hero-image"
        />
        <div className="hero-glow-sphere"></div>
      </div>

      <div className="hero-content">
        <div className="hero-tag-row">
          <span className="hero-pill hero-pill-live">
            <span className="pulsing-dot"></span>
            DROP 01 // SS-26 EN VIVO
          </span>
          <span className="hero-pill hero-pill-blur">
            <Sparkles size={13} color="var(--color-accent)" />
            CANTIDADES LIMITADAS
          </span>
        </div>

        <h1 className="hero-title">
          EVOLUCIÓN DEL <br />
          <span className="text-gradient">STREETWEAR</span> <br />
          MODERNO.
        </h1>

        <p className="hero-subtitle">
          Siluetas de alto gramaje, indumentaria técnica utilitaria y estética minimalista diseñada para la cultura urbana actual.
        </p>

        <div className="hero-cta-group">
          <a
            href="#trends"
            className="btn-primary hero-btn-main"
            onClick={(e) => handleShopClick(e, 'all')}
          >
            Explorar Colección
            <ArrowUpRight size={18} />
          </a>

          <button
            className="btn-secondary hero-btn-secondary"
            onClick={(e) => handleShopClick(e, 'new')}
          >
            <Flame size={16} color="var(--color-accent)" />
            Novedades del Drop
          </button>
        </div>

        {/* Floating Mini Feature Badges */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <strong>450+ GSM</strong>
            <span>Friza Heavyweight</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong>100%</strong>
            <span>Orgánico y Testeado</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong>4.9 ★</strong>
            <span>Más de 1.500+ Drops</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <a href="#trends" onClick={(e) => handleShopClick(e, 'all')} aria-label="Ir a productos">
          <span className="scroll-text">DESCUBRIR PRODUCTOS</span>
          <ChevronDown size={18} className="bounce-arrow" />
        </a>
      </div>
    </section>
  );
};
