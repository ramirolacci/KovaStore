import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory('all');
    const trendsElement = document.getElementById('trends');
    if (trendsElement) {
      trendsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="main-home">
      <div className="main-text">
        <h5>Winter</h5>
        <h1>
          New Winter <br /> Collection
        </h1>
        <p>Check out our newest designs</p>
        <a href="#trends" className="main-btn" onClick={handleShopClick}>
          Shop <ArrowRight size={20} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle' }} />
        </a>
      </div>
      <div className="down">
        <a href="#trends" className="down-arrow" onClick={handleShopClick}>
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};
