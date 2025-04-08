import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { OrderItem as OrderItemType } from '../types';

interface OrderItemProps {
  item: OrderItemType;
  onUpdateQuantity: (id: number, isSmallVersion: boolean, change: number) => void;
}

export function OrderItem({ item, onUpdateQuantity }: OrderItemProps) {
  const price = item.isSmallVersion ? (item.smallPrice || item.price) : item.price;

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 border-b">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
          {item.isSmallVersion && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
              Small
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-600">
          ${price.toFixed(2)} × {item.quantity}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => onUpdateQuantity(item.id, item.isSmallVersion || false, -1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.isSmallVersion || false, 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      <div className="font-bold text-sm sm:text-base">
        ${(price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}