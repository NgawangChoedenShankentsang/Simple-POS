import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToOrder: (item: MenuItemType, variant: 'regular' | 'kids' | 'small') => void;
}

export function MenuItem({ item, onAddToOrder }: MenuItemProps) {
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasVariants = item.hasKidsVersion || item.hasSmallVersion;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition-all hover:shadow-lg w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <motion.img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {(item.hasKidsVersion || item.hasSmallVersion) && (
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
              Multiple Sizes
            </span>
          )}
          {item.popular && (
            <span className="bg-yellow-400 text-blue-900 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-blue-900" />
              Popular
            </span>
          )}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
          <div className="text-right">
            <p className="text-blue-600 font-bold text-lg sm:text-xl">
              ${item.price.toFixed(2)}
            </p>
            {item.hasSmallVersion && (
              <p className="text-gray-500 text-sm">
                Small: ${item.smallPrice?.toFixed(2)}
              </p>
            )}
            {item.hasKidsVersion && (
              <p className="text-pink-500 text-sm">
                Kids: ${item.kidsPrice?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <motion.div 
          className="flex gap-2"
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => {
              if (hasVariants) {
                setShowSizeOptions(true);
              } else {
                onAddToOrder(item, 'regular');
              }
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add to Order
          </button>
        </motion.div>
      </div>

      {showSizeOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSizeOptions(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg p-4 max-w-xs w-full"
          >
            <h4 className="font-semibold mb-3">Choose Size</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onAddToOrder(item, 'regular');
                  setShowSizeOptions(false);
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Regular (${item.price.toFixed(2)})
              </button>
              {item.hasSmallVersion && (
                <button
                  onClick={() => {
                    onAddToOrder(item, 'small');
                    setShowSizeOptions(false);
                  }}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Small (${item.smallPrice?.toFixed(2)})
                </button>
              )}
              {item.hasKidsVersion && (
                <button
                  onClick={() => {
                    onAddToOrder(item, 'kids');
                    setShowSizeOptions(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Kids (${item.kidsPrice?.toFixed(2)})
                </button>
              )}
              <button
                onClick={() => setShowSizeOptions(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}