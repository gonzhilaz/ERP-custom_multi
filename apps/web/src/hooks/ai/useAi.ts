'use client';

import { useState, useEffect } from 'react';
import { MOCK_AI_LOGS, AiQueryLog } from '@/lib/mock/ai';

export function useAi() {
  const [logs, setLogs] = useState<AiQueryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs(MOCK_AI_LOGS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const sendAiQuery = (customPrompt?: string) => {
    const promptToUse = customPrompt || queryInput;
    if (!promptToUse.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newLog: AiQueryLog = {
        id: `ai-${Date.now()}`,
        source: 'WHATSAPP_EXECUTIVE_BOT',
        userQuery: promptToUse,
        aiResponse: `[DeepSeek Lite + OpenClaw Agent]: Hasil analisis real-time dari Central DB — Total kas Holding & unit usaha berada dalam batas aman dengan margin laba 43%. Tidak ada anomali keuangan yang terdeteksi.`,
        timestamp: new Date().toLocaleString(),
        status: 'PROCESSED'
      };

      setLogs((prev) => [newLog, ...prev]);
      setQueryInput('');
    }, 1200);
  };

  return {
    logs,
    loading,
    queryInput,
    setQueryInput,
    isProcessing,
    sendAiQuery
  };
}
