import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PromoBanner: React.FC = () => {
  const { setSelectedCategory } = useShop();
  const bannerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.promo-banner-card > *',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    setSelectedCategory('new');
    const el = document.getElementById('trends');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={bannerRef} className="promo-banner-section">
      <div ref={cardRef} className="promo-banner-card">
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
