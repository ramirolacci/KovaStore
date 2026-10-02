import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('🎉 Welcome to the VIP Club! Use code KOVA20 for 20% off.', 'success');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-wrapper">
        <div className="newsletter-text">
          <span className="newsletter-tag">JOIN THE INNER CIRCLE</span>
          <h3>GET 20% OFF YOUR FIRST DROP</h3>
          <p>
            Receive private access to secret product releases, restock alerts, and exclusive editorial lookbooks before anyone else.
          </p>
        </div>

        {isSubscribed ? (
          <div className="newsletter-success">
            <CheckCircle2 size={28} color="var(--color-accent)" />
            <div>
              <h4>You're in the VIP list!</h4>
              <p>Your code <strong>KOVA20</strong> has been unlocked. Apply it at checkout.</p>
            </div>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <Mail size={18} className="mail-icon" />
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
