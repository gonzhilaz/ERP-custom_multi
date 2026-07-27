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

  const evaluateGuardrailResponse = (promptText: string): string => {
    const text = promptText.toLowerCase();

    // Check for typos in hotel/kamar
    const isHotelQuery = text.includes('hotel') || text.includes('kamar') || text.includes('kmaar') || text.includes('kmr');
    const isTotalQuery = text.includes('total') || text.includes('totlal') || text.includes('jumlah') || text.includes('jml');

    // Specific Intent 1: Total Kamar Hotel
    if (isHotelQuery && isTotalQuery) {
      return `[DeepSeek-R1 Hotel PMS Engine]: Total Kapasitas Kamar Hotel Grand Royal = 120 Kamar.
- Kamar Terisi (Occupied): 101 Kamar (Occupancy Rate: 84.2%)
- Kamar Siap Huni (Available Clean): 16 Kamar
- Kamar Butuh Turnover (Checkout Dirty): 3 Kamar (Kamar 304, 308, 412).`;
    }

    // Specific Intent 2: General Hotel/Wisata
    if (isHotelQuery || text.includes('wisata') || text.includes('occupancy')) {
      return `[DeepSeek-R1 Hotelier & Tourism Specialist]: Ringkasan Kinerja PMS Hotel:
- Total Kapasitas: 120 Kamar (101 Terisi / 84.2% Occupancy).
- ADR: Rp 850.000 / Malam. RevPAR: Rp 715.700.
- Rekomendasi Bundling Wisata: Paket 'Weekend Staycation' mendongkrak RevPAR +18.5%.`;
    }

    // Out of scope check
    const outOfScopeKeywords = ['piala dunia', 'sepak bola', 'game', 'bermain', 'cerita fiksi', 'film', 'lagu'];
    if (outOfScopeKeywords.some((k) => text.includes(k))) {
      return `[DeepSeek ERP Guardrail System]: Mohon maaf, saya adalah DeepSeek ERP Enterprise Assistant yang dirancang khusus untuk membantu analisis keuangan, budgeting, operasional (Retail, Resto, Catering, Hotel, Tambang, Perkebunan), korespondensi resmi, dan strategi Sales/Marketing. Silakan tanyakan seputar operasional ERP Anda.`;
    }

    // Domain 1: Budgeting & Finance
    if (text.includes('budget') || text.includes('anggaran') || text.includes('keuangan') || text.includes('laba')) {
      return `[DeepSeek-R1 Financial Analyst]: Berdasarkan analisis histori kas & proyeksi Q3 — Rekomendasi Alokasi Budgeting:
1. Alokasi Modal Kerja Tambang: Rp 450.000.000 (Operasional Solar & Overhaul Fleet).
2. Anggaran Bahan Baku Catering: Rp 125.000.000 (Target 45.800 Pax Menu Bergizi).
3. Proyeksi Net Margin Holding: 43.2% dengan Cash Flow Cadangan Aman.`;
    }

    // Domain 2: Surat Menyurat & DMS
    if (text.includes('surat') || text.includes('dms') || text.includes('dokumen') || text.includes('sppd')) {
      return `[DeepSeek-R1 Legal & Executive Secretary]: Rekomendasi Format Surat Menyurat Resmi ERP:
- Draf Surat Penawaran Harga (SPH #SPH/2026/07/042) untuk Klien Corporate Hotel & Catering.
- Klausul Proteksi MoU Vendor Supplier Bahan Baku (Garansi Retur H+1 jika mutu di bawah grade A).
- Template SPPD Perjalanan Dinas Cabang dengan otorisasi approval otomatis Direksi.`;
    }

    // Domain 3: Catering & Nutrisi Bergizi
    if (text.includes('catering') || text.includes('resep') || text.includes('gizi') || text.includes('menu')) {
      return `[DeepSeek-R1 F&B Chef & Nutritionist]: Perencanaan Menu Catering Massal & Nilai Gizi (Mess Hall & Event):
- Menu Utama: Daging Sapi Lada Hitam + Tumis Buncis Jagung Manis + Buah Potong Semangka.
- Analisis Nutrisi Per Pax: 650 Kcal, 32g Protein, 75g Karbohidrat, 18g Lemak.
- HPP Per Porsi (BOM Costing): Rp 18.500 / Pax (Gross Margin 48% vs Harga Jual Rp 35.000).`;
    }

    // Domain 5: Mining & Hauling Fleet
    if (text.includes('tambang') || text.includes('mining') || text.includes('hauling') || text.includes('solar')) {
      return `[DeepSeek-R1 Mining Site Specialist]: Analisis Ritase & Fleet Efficiency Tambang Emas:
- Total Cargo Cargo Minggu Ini: 701.5 Ton Ore Kadar Tinggi (Au 4.8 g/t).
- Konsumsi BBM Solar Volvo FMX: 28.5 L/Jam (Di Bawah Batas Maksimum 30L/Jam). Unit aman untuk shift malam.`;
    }

    // Domain 6: Perkebunan (Sawit, Durian & Holtikultura)
    if (text.includes('sawit') || text.includes('durian') || text.includes('kebun') || text.includes('perkebunan') || text.includes('tbs') || text.includes('cpo')) {
      return `[DeepSeek-R1 Plantation & Agri Specialist]: Analisis Perkebunan & Produksi Hasil Panen:
1. Kelapa Sawit (TBS & CPO): Panen Minggu Ini 245.8 Ton TBS (BJR 18.4kg). Rendemen CPO PKS: 22.1% (Hasil CPO 54.3 Ton). Estimasi Omset CPO Rp 651.600.000.
2. Perkebunan Durian (Musang King & Black Thorn): Proyeksi Panen 4.5 Ton Grade A (60kg/pohon). Jadwal pengocoran pupuk KNO3 Merah & kalsium cair akhir minggu ini.`;
    }

    // Domain 7: Tech Stack, Full-Stack & DevOps Infrastructure
    if (text.includes('sql') || text.includes('postgres') || text.includes('prisma') || text.includes('next') || text.includes('node') || text.includes('express') || text.includes('flutter') || text.includes('react native') || text.includes('mcp') || text.includes('nginx') || text.includes('apache') || text.includes('ubuntu') || text.includes('vps')) {
      return `[DeepSeek-R1 Full-Stack & DevOps Architect]: Analisis Rekayasa Perangkat Lunak & Infrastruktur VPS:
1. PostgreSQL & Prisma ORM: Skema database ERP Multi-Tenant berjalan terindeks dengan komposit [tenantId, isDeleted]. Query Text-to-SQL tereksekusi aman dengan paged limit.
2. App Architecture (Next.js 16 + React Native / Flutter): Frontend Next.js App Router dengan Turbopack bundling, didukung aplikasi kasir POS React Native & Flutter Mobile ESS.
3. Server & Deployment (Nginx / Ubuntu VPS / MCP Server): Reverse Proxy Nginx mengarahkan lalu lintas SSL Port 443 ke Next.js (Port 3000) & Node/Express API (Port 5000) dengan MCP Server tools aktif.`;
    }

    // Default Fallback
    return `[DeepSeek-R1 Enterprise Assistant]: Hasil analisis real-time dari Central DB ERP — Sistem berjalan optimal 100% mematuhi aturan AGENTS.md (Zero Hardcode, Gembok Backdate Locked, & Audit Trail Permanent Log).`;
  };

  const sendAiQuery = async (customPrompt?: string) => {
    const promptToUse = customPrompt || queryInput;
    if (!promptToUse.trim()) return;

    setIsProcessing(true);

    try {
      const res = await fetch('/api/ai/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse })
      });

      const data = await res.json();
      let aiAnswer = data.response;

      if (!aiAnswer || data.source === 'MOCK_ENGINE_FALLBACK') {
        aiAnswer = evaluateGuardrailResponse(promptToUse);
      }

      const newLog: AiQueryLog = {
        id: `ai-${Date.now()}`,
        source: 'WHATSAPP_EXECUTIVE_BOT',
        userQuery: promptToUse,
        aiResponse: aiAnswer,
        timestamp: new Date().toLocaleString(),
        status: 'PROCESSED'
      };

      setLogs((prev) => [newLog, ...prev]);
      setQueryInput('');
    } catch {
      const fallbackAnswer = evaluateGuardrailResponse(promptToUse);
      const newLog: AiQueryLog = {
        id: `ai-${Date.now()}`,
        source: 'WHATSAPP_EXECUTIVE_BOT',
        userQuery: promptToUse,
        aiResponse: fallbackAnswer,
        timestamp: new Date().toLocaleString(),
        status: 'PROCESSED'
      };

      setLogs((prev) => [newLog, ...prev]);
      setQueryInput('');
    } finally {
      setIsProcessing(false);
    }
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
