'use client';

import { useState, useEffect } from 'react';
import {
  MOCK_INVENTORY_ITEMS,
  MOCK_CATEGORIES,
  MOCK_ASSETS,
  MOCK_ASSET_CATEGORIES,
  MOCK_STORAGE_LOCATIONS,
  MOCK_STORAGE_TYPES,
  InventoryItem,
  InventoryCategory,
  AssetItem,
  AssetCategory,
  StorageLocation,
  StorageTypeItem
} from '@/lib/mock/inventory';

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY_ITEMS);
  const [categories, setCategories] = useState<InventoryCategory[]>(MOCK_CATEGORIES);
  const [assets, setAssets] = useState<AssetItem[]>(MOCK_ASSETS);
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>(MOCK_ASSET_CATEGORIES);
  const [storages, setStorages] = useState<StorageLocation[]>(MOCK_STORAGE_LOCATIONS);
  const [storageTypes, setStorageTypes] = useState<StorageTypeItem[]>(MOCK_STORAGE_TYPES);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filterWarehouse, setFilterWarehouse] = useState<string>('ALL');
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Filtered inventory items
  const filteredItems = items.filter((item) => {
    if (showAlertsOnly && !item.isAlert) return false;
    if (filterWarehouse !== 'ALL' && !item.warehouse.includes(filterWarehouse)) return false;

    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Filtered assets
  const filteredAssets = assets.filter((ast) => {
    return (
      ast.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.branchLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filtered storages
  const filteredStorages = storages.filter((str) => {
    return (
      str.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      str.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      str.branchName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // CRUD Handlers for Inventory
  const addInventoryItem = (newItem: Omit<InventoryItem, 'id' | 'isAlert'>) => {
    const isAlert = newItem.stockQty <= newItem.minStockLevel;
    const created: InventoryItem = {
      ...newItem,
      id: `inv-${Date.now()}`,
      isAlert
    };
    setItems((prev) => [created, ...prev]);
  };

  const deleteInventoryItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // CRUD Handlers for Category
  const addCategory = (newCat: Omit<InventoryCategory, 'id' | 'itemCount'>) => {
    const created: InventoryCategory = {
      ...newCat,
      id: `cat-${Date.now()}`,
      itemCount: 0
    };
    setCategories((prev) => [created, ...prev]);
  };

  const updateCategory = (id: string, updatedCat: Partial<InventoryCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD Handlers for Asset Categories
  const addAssetCategory = (newCat: Omit<AssetCategory, 'id' | 'assetCount'>) => {
    const created: AssetCategory = {
      ...newCat,
      id: `ast-cat-${Date.now()}`,
      assetCount: 0
    };
    setAssetCategories((prev) => [created, ...prev]);
  };

  const updateAssetCategory = (id: string, updatedCat: Partial<AssetCategory>) => {
    setAssetCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c))
    );
  };

  const deleteAssetCategory = (id: string) => {
    setAssetCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD Handlers for Storage Types
  const addStorageType = (newType: Omit<StorageTypeItem, 'id' | 'storageCount'>) => {
    const created: StorageTypeItem = {
      ...newType,
      id: `str-type-${Date.now()}`,
      storageCount: 0
    };
    setStorageTypes((prev) => [created, ...prev]);
  };

  const updateStorageType = (id: string, updatedType: Partial<StorageTypeItem>) => {
    setStorageTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedType } : t))
    );
  };

  const deleteStorageType = (id: string) => {
    setStorageTypes((prev) => prev.filter((t) => t.id !== id));
  };

  // CRUD Handlers for Assets
  const addAssetItem = (newAsset: Omit<AssetItem, 'id' | 'accumulatedDepreciation' | 'bookValue' | 'monthlyDepreciation'>) => {
    const monthlyDep = Math.round((newAsset.purchaseCost - newAsset.salvageValue) / (newAsset.usefulLifeYears * 12));
    const created: AssetItem = {
      ...newAsset,
      id: `ast-${Date.now()}`,
      monthlyDepreciation: monthlyDep,
      accumulatedDepreciation: monthlyDep * 12,
      bookValue: newAsset.purchaseCost - monthlyDep * 12
    };
    setAssets((prev) => [created, ...prev]);
  };

  const deleteAssetItem = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  // CRUD Handlers for Storage
  const addStorageLocation = (newStorage: Omit<StorageLocation, 'id'>) => {
    const created: StorageLocation = {
      ...newStorage,
      id: `str-${Date.now()}`
    };
    setStorages((prev) => [created, ...prev]);
  };

  const deleteStorageLocation = (id: string) => {
    setStorages((prev) => prev.filter((s) => s.id !== id));
  };

  const alertItems = items.filter((i) => i.isAlert);
  const reorderAlertCount = alertItems.length;

  return {
    items: filteredItems,
    allItems: items,
    categories,
    assets: filteredAssets,
    allAssets: assets,
    assetCategories,
    storages: filteredStorages,
    allStorages: storages,
    storageTypes,
    alertItems,
    reorderAlertCount,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filterWarehouse,
    setFilterWarehouse,
    showAlertsOnly,
    setShowAlertsOnly,
    addInventoryItem,
    deleteInventoryItem,
    addCategory,
    updateCategory,
    deleteCategory,
    addAssetItem,
    deleteAssetItem,
    addAssetCategory,
    updateAssetCategory,
    deleteAssetCategory,
    addStorageLocation,
    deleteStorageLocation,
    addStorageType,
    updateStorageType,
    deleteStorageType
  };
}
