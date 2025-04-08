import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CashCalculatorProps {
  total: number;
}

export function CashCalculator({ total }: CashCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState<string>('');
  
  const receivedAmount = parseFloat(cashReceived) || 0;
  const change = receivedAmount - total;
  const isValidAmount = receivedAmount >= total;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
      >
        <Calculator className="w-4 h-4" />
        Calculate Change
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
                setCashReceived('');
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-4 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-4">Calculate Change</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Amount
                  </label>
                  <div className="text-2xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label htmlFor="cashReceived" className="block text-sm font-medium text-gray-700 mb-1">
                    Cash Received
                  </label>
                  <input
                    type="number"
                    id="cashReceived"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                    step="0.01"
                  />
                </div>

                {cashReceived && (
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Received</div>
                      <div className="font-semibold">${receivedAmount.toFixed(2)}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Change</div>
                      <div className={`font-bold ${isValidAmount ? 'text-green-600' : 'text-red-600'}`}>
                        ${change.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCashReceived('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mt-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}