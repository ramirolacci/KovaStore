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
          alt="KOVA Streetwear Capsule 2026"
          className="hero-image"
        />
        <div className="hero-glow-sphere"></div>
      </div>

      <div className="hero-content">
        <div className="hero-tag-row">
          <span className="hero-pill hero-pill-live">
            <span className="pulsing-dot"></span>
            DROP 01 // SS-26 LIVE
          </span>
          <span className="hero-pill hero-pill-blur">
            <Sparkles size={13} color="var(--color-accent)" />
            LIMITED QUANTITIES
          </span>
        </div>

        <h1 className="hero-title">
          MODERN <br />
          <span className="text-gradient">STREETWEAR</span> <br />
          EVOLUTION.
        </h1>

        <p className="hero-subtitle">
          Heavyweight silhouettes, technical utilitarian wear, and minimalist aesthetics engineered for modern culture.
        </p>

        <div className="hero-cta-group">
          <a
            href="#trends"
            className="btn-primary hero-btn-main"
            onClick={(e) => handleShopClick(e, 'all')}
          >
            Explore Collection
            <ArrowUpRight size={18} />
          </a>

          <button
            className="btn-secondary hero-btn-secondary"
            onClick={(e) => handleShopClick(e, 'new')}
          >
            <Flame size={16} color="var(--color-accent)" />
            New Arrivals
          </button>
        </div>

        {/* Floating Mini Feature Badges */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <strong>450+ GSM</strong>
            <span>Heavyweight Terry</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong>100%</strong>
            <span>Organic &amp; Tested</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong>4.9 ★</strong>
            <span>Over 1,500+ Drops</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <a href="#trends" onClick={(e) => handleShopClick(e, 'all')} aria-label="Scroll to products">
          <span className="scroll-text">DISCOVER PRODUCTS</span>
          <ChevronDown size={18} className="bounce-arrow" />
        </a>
      </div>
    </section>
  );
};
