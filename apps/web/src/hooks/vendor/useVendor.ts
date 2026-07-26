'use client';

import { useState, useEffect } from 'react';
import {
  MOCK_VENDORS,
  MOCK_VENDOR_CATEGORIES,
  MOCK_PURCHASE_ORDERS,
  VendorItem,
  VendorCategory,
  PurchaseOrder
} from '@/lib/mock/vendor';

export function useVendor() {
  const [vendors, setVendors] = useState<VendorItem[]>(MOCK_VENDORS);
  const [vendorCategories, setVendorCategories] = useState<VendorCategory[]>(MOCK_VENDOR_CATEGORIES);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(MOCK_PURCHASE_ORDERS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PO' | 'VENDORS'>('PO');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const addVendor = (newVendor: Omit<VendorItem, 'id' | 'rating' | 'status'>) => {
    const created: VendorItem = {
      ...newVendor,
      id: `vnd-${Date.now()}`,
      rating: 5.0,
      status: 'ACTIVE'
    };
    setVendors((prev) => [created, ...prev]);
  };

  const toggleVendorStatus = (id: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: v.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : v
      )
    );
  };

  const addVendorCategory = (newCat: Omit<VendorCategory, 'id' | 'vendorCount'>) => {
    const created: VendorCategory = {
      ...newCat,
      id: `vnd-cat-${Date.now()}`,
      vendorCount: 0
    };
    setVendorCategories((prev) => [created, ...prev]);
  };

  const updateVendorCategory = (id: string, updatedCat: Partial<VendorCategory>) => {
    setVendorCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c))
    );
  };

  const deleteVendorCategory = (id: string) => {
    setVendorCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const approvePO = (poId: string) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => (po.id === poId ? { ...po, status: 'APPROVED' } : po))
    );
  };

  const rejectPO = (poId: string) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => (po.id === poId ? { ...po, status: 'REJECTED' } : po))
    );
  };

  return {
    vendors,
    vendorCategories,
    purchaseOrders,
    loading,
    activeTab,
    setActiveTab,
    addVendor,
    toggleVendorStatus,
    addVendorCategory,
    updateVendorCategory,
    deleteVendorCategory,
    approvePO,
    rejectPO
  };
}
