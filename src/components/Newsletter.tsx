import React, { useState, useRef, useLayoutEffect } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapperRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Por favor, ingresa una dirección de correo válida', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('🎉 ¡Bienvenido al Club VIP! Usa el código KOVA20 para un 20% OFF.', 'success');
  };

  return (
    <section ref={sectionRef} className="newsletter-section">
      <div ref={wrapperRef} className="newsletter-wrapper">
        <div className="newsletter-text">
          <span className="newsletter-tag">ÚNETE AL CÍRCULO INTERNO</span>
          <h3>OBTÉN 20% DE DESCUENTO EN TU PRIMER DROP</h3>
          <p>
            Recibe acceso privado a lanzamientos secretos, alertas de restock y lookbooks editoriales exclusivos antes que nadie.
          </p>
        </div>

        {isSubscribed ? (
          <div className="newsletter-success">
            <CheckCircle2 size={28} color="var(--color-accent)" />
            <div>
              <h4>¡Ya estás en la lista VIP!</h4>
              <p>Tu código <strong>KOVA20</strong> ha sido activado. Aplícalo al finalizar tu compra.</p>
            </div>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <Mail size={18} className="mail-icon" />
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Suscribirme <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
