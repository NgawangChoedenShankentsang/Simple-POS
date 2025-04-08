import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuItem } from './components/MenuItem';
import { OrderSidebar } from './components/OrderSidebar';
import { Toast } from './components/Toast';
import type { MenuItem as MenuItemType, OrderItem, ToastMessage } from './types';

function App() {
  const [menu] = useState<MenuItemType[]>([
    {
      id: 1,
      name: 'Momo',
      price: 15,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800',
      hasSmallVersion: true,
      smallPrice: 10,
      popular: true
    },
    {
      id: 2,
      name: 'Vegi Momo',
      price: 15,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800',
      hasSmallVersion: true,
      smallPrice: 10
    },
    {
      id: 3,
      name: 'Chicken Chowmein',
      price: 12,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
      hasSmallVersion: true,
      smallPrice: 8,
      popular: true
    },
    {
      id: 4,
      name: 'Vegi Chowmein',
      price: 8,
      category: 'Main',
      image: 'https://greenbowl2soul.com/wp-content/uploads/2023/03/vegetable-chow-mein.jpg',
      hasSmallVersion: true,
      smallPrice: 6
    },
    {
      id: 5,
      name: 'Rice + Curry/Sweet&Sour',
      price: 12,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
      hasSmallVersion: true,
      smallPrice: 8
    },
    {
      id: 6,
      name: 'Spring Roll',
      price: 2.50,
      category: 'Sides',
      image: 'https://www.elmundoeats.com/wp-content/uploads/2024/02/A-stack-of-crispy-spring-rolls-on-a-plate-1024x1536.jpg'
    },
    {
      id: 7,
      name: 'Red Bull',
      price: 3,
      category: 'Drinks',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/8.4_floz_can_of_Red_Bull_Energy_Drink.jpg'
    },
    {
      id: 8,
      name: 'Soft Drinks',
      price: 2.50,
      category: 'Drinks',
      image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=800'
    }
  ]);

  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const newTotal = currentOrder.reduce((sum, item) => {
      const price = item.isSmallVersion ? (item.smallPrice || item.price) : item.price;
      return sum + (price * item.quantity);
    }, 0);
    setTotal(newTotal);
  }, [currentOrder]);

  const addToOrder = (menuItem: MenuItemType, variant: 'regular' | 'small') => {
    setCurrentOrder(prev => {
      const isSmall = variant === 'small';
      const existing = prev.find(item => 
        item.id === menuItem.id && item.isSmallVersion === isSmall
      );

      if (existing) {
        return prev.map(item =>
          item.id === menuItem.id && item.isSmallVersion === isSmall
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, {
        ...menuItem,
        quantity: 1,
        isSmallVersion: isSmall
      }];
    });

    setToast({
      message: `Added ${menuItem.name}${variant === 'small' ? ' (Small)' : ''} to order`,
      type: 'success'
    });
  };

  const updateQuantity = (itemId: number, isSmallVersion: boolean, change: number) => {
    setCurrentOrder(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId && item.isSmallVersion === isSmallVersion) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
      return updated;
    });
  };

  const clearOrder = () => {
    setCurrentOrder([]);
    setToast({
      message: 'Order completed successfully!',
      type: 'info'
    });
  };

  const categories = ['All', ...new Set(menu.map(item => item.category))];
  const filteredMenu = menu
    .filter(item => {
      if (showPopularOnly && !item.popular) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        total={total}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showPopularOnly={showPopularOnly}
        onPopularToggle={setShowPopularOnly}
      />

      <main className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredMenu.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToOrder={addToOrder}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSidebar
            currentOrder={currentOrder}
            total={total}
            onUpdateQuantity={updateQuantity}
            onClearOrder={clearOrder}
          />
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;