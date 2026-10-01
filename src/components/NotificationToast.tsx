import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">
        <CheckCircle2 size={20} color="#87FF77" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
