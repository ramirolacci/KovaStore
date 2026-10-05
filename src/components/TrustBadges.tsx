import React, { useRef, useLayoutEffect } from 'react';
import { Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrustBadges: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trust-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Truck,
      title: 'Envío Express Nacional e Internacional',
      description: 'Gratis en todas las compras mayores a $100. Despacho en 24h.'
    },
    {
      icon: ShieldCheck,
      title: '100% Auténtico Certificado',
      description: 'Confección directa de autor. Origen y calidad garantizados.'
    },
    {
      icon: RefreshCw,
      title: '30 Días de Cambio Sin Cargo',
      description: 'Devoluciones y cambios de talle simples con gestión rápida.'
    },
    {
      icon: Zap,
      title: 'Checkout Seguro e Instantáneo',
      description: 'Procesamiento encriptado de 256 bits con tarjetas y Apple Pay.'
    }
  ];

  return (
    <section ref={sectionRef} className="trust-section">
      <div ref={cardsRef} className="trust-grid">
        {features.map((f, index) => {
          const Icon = f.icon;
          return (
            <div key={index} className="trust-card">
              <div className="trust-icon-box">
                <Icon size={22} />
              </div>
              <div className="trust-info">
                <h4>{f.title}</h4>
                <p>{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
