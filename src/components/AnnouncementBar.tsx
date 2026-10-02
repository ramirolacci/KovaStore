import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const messages = [
  { icon: Sparkles, text: 'USE CODE "KOVA20" FOR 20% OFF YOUR FIRST ORDER' },
  { icon: Truck, text: 'FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $100' },
  { icon: ShieldCheck, text: 'AUTHENTIC DROP GUARANTEED — 30-DAY HASSLE-FREE RETURNS' }
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
          Explore Drop <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
