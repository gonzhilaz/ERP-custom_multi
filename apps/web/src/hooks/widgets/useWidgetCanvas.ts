'use client';

import { useState } from 'react';
import { WIDGET_REGISTRY, ROLE_PRESET_WIDGETS, WidgetDefinition } from '@/lib/widgets/widget-registry';

export function useWidgetCanvas(initialRolePreset: string = 'RETAIL_STORE_MANAGER') {
  const defaultWidgetIds = ROLE_PRESET_WIDGETS[initialRolePreset] || ['wgt-pos-sales', 'wgt-mfg-wo', 'wgt-stock-alert', 'wgt-hrd-attendance'];

  const [activeWidgetIds, setActiveWidgetIds] = useState<string[]>(defaultWidgetIds);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addWidgetToCanvas = (widgetId: string) => {
    if (!activeWidgetIds.includes(widgetId)) {
      setActiveWidgetIds((prev) => [...prev, widgetId]);
    }
  };

  const removeWidgetFromCanvas = (widgetId: string) => {
    setActiveWidgetIds((prev) => prev.filter((id) => id !== widgetId));
  };

  const resetToPreset = (roleKey: string = initialRolePreset) => {
    const presetIds = ROLE_PRESET_WIDGETS[roleKey] || defaultWidgetIds;
    setActiveWidgetIds(presetIds);
  };

  const activeWidgets = activeWidgetIds
    .map((id) => WIDGET_REGISTRY.find((w) => w.id === id))
    .filter(Boolean) as WidgetDefinition[];

  const availableWidgets = WIDGET_REGISTRY.filter((w) => !activeWidgetIds.includes(w.id));

  const filteredAvailableWidgets = availableWidgets.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return {
    activeWidgetIds,
    activeWidgets,
    availableWidgets: filteredAvailableWidgets,
    allWidgets: WIDGET_REGISTRY,
    isEditMode,
    setIsEditMode,
    searchQuery,
    setSearchQuery,
    addWidgetToCanvas,
    removeWidgetFromCanvas,
    resetToPreset
  };
}
