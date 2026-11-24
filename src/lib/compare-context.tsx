'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const addToCompare = (product: Product): boolean => {
    if (items.some((i) => i.id === product.id)) {
      return true;
    }
    if (items.length >= 3) {
      return false; // Max 3 items
    }
    setItems((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return items.some((i) => i.id === productId);
  };

  const clearCompare = () => {
    setItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

