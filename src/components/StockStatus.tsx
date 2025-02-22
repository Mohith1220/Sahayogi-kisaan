import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StockStatusProps {
  quantity: number;
  unit: string;
}

export function StockStatus({ quantity, unit }: StockStatusProps) {
  const { t } = useTranslation();

  const getStockStatus = () => {
    if (quantity > 100) {
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        text: t('stock.inStock'),
        className: 'text-green-600 bg-green-50'
      };
    } else if (quantity > 0) {
      return {
        icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
        text: t('stock.lowStock'),
        className: 'text-yellow-600 bg-yellow-50'
      };
    } else {
      return {
        icon: <XCircle className="w-4 h-4 text-red-500" />,
        text: t('stock.outOfStock'),
        className: 'text-red-600 bg-red-50'
      };
    }
  };

  const status = getStockStatus();

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-sm ${status.className}`}>
      {status.icon}
      <span>{status.text}</span>
      <span className="text-xs">({quantity} {unit})</span>
    </div>
  );
}