import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? (
    <CheckCircle className="w-5 h-5 text-green-500" />
  ) : (
    <AlertCircle className="w-5 h-5 text-blue-500" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 z-50"
    >
      {icon}
      <p className="text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
}