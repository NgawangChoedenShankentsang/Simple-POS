import React from 'react';
import { ShoppingCart, Trash2, Receipt } from 'lucide-react';
import { OrderItem as OrderItemComponent } from './OrderItem';
import { CashCalculator } from './CashCalculator';
import type { OrderItem } from '../types';

interface OrderSidebarProps {
  currentOrder: OrderItem[];
  total: number;
  onUpdateQuantity: (id: number, isSmallVersion: boolean, change: number) => void;
  onClearOrder: () => void;
}

export function OrderSidebar({ currentOrder, total, onUpdateQuantity, onClearOrder }: OrderSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          Current Order
        </h2>
        {currentOrder.length > 0 && (
          <button
            onClick={onClearOrder}
            className="text-red-500 hover:text-red-700 p-1.5 sm:p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {currentOrder.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
          <p className="text-gray-500">Your order is empty</p>
          <p className="text-xs sm:text-sm text-gray-400">Add items from the menu to get started</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {currentOrder.map(item => (
            <OrderItemComponent
              key={`${item.id}-${item.isSmallVersion ? 'small' : 'regular'}`}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}

          <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onClearOrder}
              className="w-full mt-3 sm:mt-4 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
            >
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
              Complete Order
            </button>
            <CashCalculator total={total} />
          </div>
        </div>
      )}
    </div>
  );
}