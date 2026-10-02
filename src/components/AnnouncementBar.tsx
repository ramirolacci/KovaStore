import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const messages = [
  { icon: Sparkles, text: 'USA EL CÓDIGO "KOVA20" PARA UN 20% DE DESCUENTO EN TU PRIMERA COMPRA' },
  { icon: Truck, text: 'ENVÍO EXPRESS GRATIS EN TODAS LAS COMPRAS SUPERIORES A $100' },
  { icon: ShieldCheck, text: 'DROP 100% AUTÉNTICO GARANTIZADO — 30 DÍAS DE CAMBIO SIN CARGO' }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = messages[currentIndex].icon;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <CurrentIcon size={14} className="announcement-icon" />
        <span className="announcement-text">{messages[currentIndex].text}</span>
        <button
          className="announcement-cta"
          onClick={() => {
            const el = document.getElementById('trends');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explorar Colección <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
