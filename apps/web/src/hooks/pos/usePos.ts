'use client';

import { useState } from 'react';
import { MOCK_POS_MENU, MOCK_MENU_CATEGORIES, PosMenuItem, PosOrderItem, MenuCategoryItem } from '@/lib/mock/pos';

export interface TaxOption {
  id: string;
  name: string;
  rate: number;
  coaAccount: string;
}

export const MASTER_TAX_OPTIONS: TaxOption[] = [
  { id: 'tax-11', name: 'PPN 11% (Standar Retail)', rate: 11, coaAccount: '2-10300 - Utang PPN Keluaran Retail' },
  { id: 'tax-12', name: 'PPN 12% (Regulasi 2026)', rate: 12, coaAccount: '2-10300 - Utang PPN Keluaran Retail' },
  { id: 'tax-10', name: 'PB1 10% (Pajak Restoran/F&B)', rate: 10, coaAccount: '2-10301 - Utang Pajak Restoran PB1' },
  { id: 'tax-0', name: 'Bebas Pajak (0%)', rate: 0, coaAccount: 'N/A - Non Taxable' }
];

export function usePos() {
  const [menuItems, setMenuItems] = useState<PosMenuItem[]>(MOCK_POS_MENU);
  const [menuCategories, setMenuCategories] = useState<MenuCategoryItem[]>(MOCK_MENU_CATEGORIES);
  const [cart, setCart] = useState<PosOrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReceiptPrinted, setIsReceiptPrinted] = useState(false);

  // Dynamic User-Configurable Tax State
  const [selectedTaxId, setSelectedTaxId] = useState<string>('tax-11');
  const [customTaxRate, setCustomTaxRate] = useState<number>(11);

  const activeTaxOption = MASTER_TAX_OPTIONS.find((t) => t.id === selectedTaxId);
  const taxRatePercentage = selectedTaxId === 'custom' ? customTaxRate : activeTaxOption ? activeTaxOption.rate : 11;
  const taxCoaAccount = activeTaxOption ? activeTaxOption.coaAccount : '2-10300 - Utang PPN Keluaran Retail';

  const addMenuItem = (newItem: Omit<PosMenuItem, 'id'>) => {
    const created: PosMenuItem = {
      ...newItem,
      id: `pos-${Date.now()}`
    };
    setMenuItems((prev) => [created, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  };

  const addMenuCategory = (newCat: Omit<MenuCategoryItem, 'id' | 'itemCount'>) => {
    const created: MenuCategoryItem = {
      ...newCat,
      id: `mcat-${Date.now()}`,
      itemCount: 0
    };
    setMenuCategories((prev) => [created, ...prev]);
  };

  const updateMenuCategory = (id: string, updatedCat: Partial<MenuCategoryItem>) => {
    setMenuCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c))
    );
  };

  const deleteMenuCategory = (id: string) => {
    setMenuCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addToCart = (item: PosMenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.item.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as PosOrderItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const getItemQuantityInCart = (itemId: string) => {
    const found = cart.find((i) => i.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const clearCart = () => setCart([]);

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Financial Price Calculations: Subtotal, Tax Amount, Total
  const subtotalAmount = cart.reduce((acc, i) => acc + i.item.price * i.quantity, 0);
  const taxAmount = Math.round(subtotalAmount * (taxRatePercentage / 100));
  const totalAmount = subtotalAmount + taxAmount;

  const simulateCheckoutAndPrint = () => {
    if (cart.length === 0) return;
    setIsReceiptPrinted(true);
    setTimeout(() => {
      setIsReceiptPrinted(false);
      setCart([]);
    }, 2000);
  };

  return {
    menuItems: filteredMenuItems,
    allMenuItems: menuItems,
    menuCategories,
    cart,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedTaxId,
    setSelectedTaxId,
    customTaxRate,
    setCustomTaxRate,
    taxRatePercentage,
    taxCoaAccount,
    addMenuItem,
    deleteMenuItem,
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getItemQuantityInCart,
    clearCart,
    subtotalAmount,
    taxAmount,
    totalAmount,
    isReceiptPrinted,
    simulateCheckoutAndPrint
  };
}
