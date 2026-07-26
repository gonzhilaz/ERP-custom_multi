'use client';

import { useState, useEffect } from 'react';
import { MOCK_DB_POOLS, MOCK_SECURITY_LOGS, TenantDbPoolStatus, SecurityAuditLog } from '@/lib/mock/health';

export function useSystemHealth() {
  const [pools, setPools] = useState<TenantDbPoolStatus[]>([]);
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPools(MOCK_DB_POOLS);
      setLogs(MOCK_SECURITY_LOGS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const refreshDiagnostics = () => {
    setLoading(true);
    setTimeout(() => {
      setPools(MOCK_DB_POOLS);
      setLoading(false);
    }, 500);
  };

  return {
    pools,
    logs,
    loading,
    refreshDiagnostics
  };
}
