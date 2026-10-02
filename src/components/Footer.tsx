import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsWishlistOnly } = useShop();

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
    <footer className="footer-modern">
      <div className="footer-top-container">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <a href="#" className="brand-logo footer-logo" onClick={scrollToTop}>
            <span className="logo-main">KOVA</span>
            <span className="logo-sub">STUDIO</span>
            <span className="logo-dot"></span>
          </a>
          <p className="footer-tagline">
            High-streetwear brand cultivating architectural cuts, heavyweight cottons, and timeless urban aesthetics.
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
              <span>contact@kovastudio.com</span>
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
          <h4 className="footer-heading">Collections</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => handleCategoryNav('all')}>All Streetwear</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('new')}>New SS-26 Drop</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('men')}>Men's Heavyweight</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('women')}>Women's Silhouettes</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('accessories')}>Chains &amp; Accessories</button>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links-list">
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Shipping Information</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Returns &amp; Exchanges</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Size &amp; Fit Guide</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Order Tracking</a></li>
            <li><a href="#trends" onClick={() => handleCategoryNav('all')}>Terms &amp; Privacy Policy</a></li>
          </ul>
        </div>

        {/* Store Highlights */}
        <div className="footer-col">
          <h4 className="footer-heading">Drop Alerts</h4>
          <p className="footer-info-text">
            Stay ahead of seasonal releases. VIP members get 1-hour early access before public release.
          </p>
          <div className="footer-badge-pill">
            <span>SPRING / SUMMER 2026 ARCHIVE</span>
          </div>
          <button className="footer-back-to-top" onClick={scrollToTop}>
            Back To Top <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; 2026 <strong>KOVA STUDIO</strong> / SubUrban. All rights reserved. Crafted for urban culture.
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
