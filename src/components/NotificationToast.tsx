import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Heart, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage, toastType } = useShop();

  if (!toastMessage) return null;

  return (
    <div className={`toast-notification-wrap toast-type-${toastType}`}>
      <div className="toast-notification-card">
        {toastType === 'favorite' ? (
          <Heart size={18} className="toast-icon fav-icon" fill="currentColor" />
        ) : toastType === 'info' ? (
          <Info size={18} className="toast-icon info-icon" />
        ) : (
          <CheckCircle2 size={18} className="toast-icon success-icon" />
        )}
        <span className="toast-text-content">{toastMessage}</span>
      </div>
    </div>
  );
};
