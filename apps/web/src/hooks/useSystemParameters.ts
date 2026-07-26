'use client';

import { useState } from 'react';
import {
  MOCK_SYSTEM_PARAMETERS,
  SystemParameterItem
} from '@/lib/mock/parameters';

export function useSystemParameters() {
  const [parameters, setParameters] = useState<SystemParameterItem[]>(MOCK_SYSTEM_PARAMETERS);

  const addParameter = (newPrm: Omit<SystemParameterItem, 'id'>) => {
    const item: SystemParameterItem = {
      ...newPrm,
      id: `prm-${Date.now()}`
    };
    setParameters([item, ...parameters]);
    alert(`Parameter [${newPrm.name}] Berhasil Ditambahkan Ke Sistem!`);
  };

  const deleteParameter = (id: string) => {
    setParameters((prev) => prev.filter((p) => p.id !== id));
    alert('Parameter Berhasil Dihapus!');
  };

  return {
    parameters,
    addParameter,
    deleteParameter
  };
}
