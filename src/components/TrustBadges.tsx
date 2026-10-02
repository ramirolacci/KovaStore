import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export const TrustBadges: React.FC = () => {
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
