import React, { useRef, useLayoutEffect } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsWishlistOnly } = useShop();
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryNav = (cat: 'all' | 'men' | 'women' | 'accessories' | 'new') => {
    setSelectedCategory(cat);
    setIsWishlistOnly(false);
    const elem = document.getElementById('trends');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="footer-modern">
      <div className="footer-top-container">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <a href="#" className="brand-logo footer-logo" onClick={scrollToTop}>
            <span className="logo-main">KOVA</span>
            <span className="logo-sub">STUDIO</span>
            <span className="logo-dot"></span>
          </a>
          <p className="footer-tagline">
            Marca de alta indumentaria urbana que cultiva cortes arquitectónicos, algodones de alto gramaje y estética contemporánea atemporal.
          </p>

          <div className="footer-contact-items">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Santiago del Estero 750, Salta — Argentina</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+54 (387) 658-5219</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>contacto@kovastudio.com</span>
            </div>
          </div>

          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={19} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter size={19} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={19} />
            </a>
          </div>
        </div>

        {/* Collections Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Colecciones</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => handleCategoryNav('all')}>Todo el Streetwear</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('new')}>Nuevo Drop SS-26</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('men')}>Línea Hombre Heavyweight</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('women')}>Siluetas Mujer</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('accessories')}>Cadenas y Accesorios</button>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Atención al Cliente</h4>
          <ul className="footer-links-list">
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Información de Envío</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Cambios y Devoluciones</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Guía de Talles y Medidas</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Seguimiento de Pedido</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Términos y Privacidad</a></li>
          </ul>
        </div>

        {/* Store Highlights */}
        <div className="footer-col">
          <h4 className="footer-heading">Alertas de Lanzamientos</h4>
          <p className="footer-info-text">
            Mantente al frente de cada drop de temporada. Los miembros VIP tienen 1 hora de acceso anticipado.
          </p>
          <div className="footer-badge-pill">
            <span>ARCHIVO PRIMAVERA / VERANO 2026</span>
          </div>
          <button className="footer-back-to-top" onClick={scrollToTop}>
            Volver Arriba <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; 2026 <strong>KOVA STUDIO</strong> / SubUrban. Todos los derechos reservados. Diseñado para la cultura urbana.
          </p>

          <div className="payment-badges-row">
            <span className="pay-tag">VISA</span>
            <span className="pay-tag">MASTERCARD</span>
            <span className="pay-tag">AMEX</span>
            <span className="pay-tag">APPLE PAY</span>
            <span className="pay-tag">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
