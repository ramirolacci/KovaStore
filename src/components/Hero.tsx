import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, Flame, Sparkles, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useShop();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const statGsmRef = useRef<HTMLElement>(null);
  const statPercentRef = useRef<HTMLElement>(null);
  const statRatingRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Hero Stagger Entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const counterObj = { gsm: 0, percent: 0, rating: 0 };

      tl.fromTo(
        '.hero-pill',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.1, clearProps: 'transform,opacity' }
      )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 45, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, clearProps: 'transform,opacity,filter' },
        '-=0.5'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, clearProps: 'transform,opacity' },
        '-=0.7'
      )
      .fromTo(
        '.hero-cta-group > *',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, clearProps: 'transform,opacity' },
        '-=0.6'
      )
      .fromTo(
        '.hero-stat-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, clearProps: 'transform,opacity' },
        '-=0.5'
      )
      .to(
        counterObj,
        {
          gsm: 450,
          percent: 100,
          rating: 4.9,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (statGsmRef.current) {
              statGsmRef.current.textContent = `${Math.floor(counterObj.gsm)}+ GSM`;
            }
            if (statPercentRef.current) {
              statPercentRef.current.textContent = `${Math.floor(counterObj.percent)}%`;
            }
            if (statRatingRef.current) {
              statRatingRef.current.textContent = `${counterObj.rating.toFixed(1)} ★`;
            }
          },
          onComplete: () => {
            if (statGsmRef.current) statGsmRef.current.textContent = '450+ GSM';
            if (statPercentRef.current) statPercentRef.current.textContent = '100%';
            if (statRatingRef.current) statRatingRef.current.textContent = '4.9 ★';
          }
        },
        '<0.1'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 60, scale: 1.08 },
        { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: 'power2.out', clearProps: 'opacity' },
        0.2
      );

      // 2. Parallax on Scroll for Image and Glow
      gsap.to(imageRef.current, {
        y: 80,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(glowRef.current, {
        y: 120,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // 3. Subtle floating animation for Glow
      gsap.to(glowRef.current, {
        scale: 1.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleShopClick = (e: React.MouseEvent, category: 'all' | 'new' = 'all') => {
    e.preventDefault();
    setSelectedCategory(category);
    const trendsElement = document.getElementById('trends');
    if (trendsElement) {
      trendsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-background-wrapper">
        <div className="hero-backdrop-gradient"></div>
        <img
          ref={imageRef}
          src="/Images/Banner-Mobile-PullBear-1.png"
          alt="Cápsula de Streetwear KOVA 2026"
          className="hero-image"
        />
        <div ref={glowRef} className="hero-glow-sphere"></div>
      </div>

      <div ref={contentRef} className="hero-content">
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
            <strong ref={statGsmRef}>0+ GSM</strong>
            <span>Friza Heavyweight</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong ref={statPercentRef}>0%</strong>
            <span>Orgánico y Testeado</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <strong ref={statRatingRef}>0.0 ★</strong>
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
