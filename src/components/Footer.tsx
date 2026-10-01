import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleCategory = (cat: 'men' | 'women' | 'accessories') => {
    setSelectedCategory(cat);
    const elem = document.getElementById('trends');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="contact">
        <div className="contact-info">
          <div className="info-1">
            <a href="#" className="logo">
              Sub<span>Urban</span>
            </a>
            <p>Santiago de Estero 750, Salta-Capital 4400</p>
            <p>4222015 - 3876585219</p>
            <p>sub.urban@gmail.clom</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={22} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={22} />
              </a>
            </div>
          </div>
          <div className="info-2">
            <h4>Support</h4>
            <p>Contact</p>
            <p>About</p>
            <p>Size Guide</p>
            <p>Terms &amp; Services</p>
            <p>Privacy</p>
          </div>
          <div className="info-3">
            <h4>Shop</h4>
            <p onClick={() => handleCategory('men')}>Mens Wear</p>
            <p onClick={() => handleCategory('women')}>Womans Wear</p>
            <p onClick={() => handleCategory('accessories')}>Accessories</p>
          </div>
        </div>
      </section>
      <div className="copyright">
        <p>
          Copyright © 2025 <u>WaveFrame</u>. All Rights Reserved
        </p>
      </div>
    </>
  );
};
