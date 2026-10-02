import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Express Worldwide Shipping',
      description: 'Free on all orders over $100. Dispatched in 24h.'
    },
    {
      icon: ShieldCheck,
      title: '100% Certified Authentic',
      description: 'Direct factory partnership. Guaranteed origin.'
    },
    {
      icon: RefreshCw,
      title: '30-Day Easy Exchange',
      description: 'Simple and fast returns with prepaid labels.'
    },
    {
      icon: Zap,
      title: 'Secure Instant Checkout',
      description: '256-bit encrypted checkout with Apple Pay & Cards.'
    }
  ];

  return (
    <section className="trust-section">
      <div className="trust-grid">
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
