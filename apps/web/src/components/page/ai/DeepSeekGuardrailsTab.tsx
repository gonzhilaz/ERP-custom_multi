'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Sliders, Sparkles, BookOpen, Utensils, Pickaxe, Hotel, ShoppingCart, Target, Search, FileText } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface SkillDomainItem {
  id: string;
  domainName: string;
  iconName: string;
  scopeCapabilities: string;
  status: 'ACTIVE_GUARDED' | 'DISABLED';
  sampleQueries: string;
}

export const DeepSeekGuardrailsTab = () => {
  const [skills] = useState<SkillDomainItem[]>([
    {
      id: 'sk-01',
      domainName: '📊 Finance, Accounting & Budgeting',
      iconName: 'BarChart3',
      scopeCapabilities: 'Pemeriksaan Akuntansi, COA Mapping, Simulasi Budgeting, P&L Forecast, Audit Jurnal & Deteksi Anomali.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Buatkan proyeksi budgeting operasional unit tambang & catering Q4'
    },
    {
      id: 'sk-02',
      domainName: '✉️ Surat-Menyurat & DMS Legal',
      iconName: 'FileText',
      scopeCapabilities: 'Rekomendasi Draf Surat SPH Penawaran, SP Disiplin HRD, SPPD Dinas, MoU Vendor, & Izin Fleet KIR.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Drafkan surat penawaran harga catering massal untuk pabrik 1000 pax'
    },
    {
      id: 'sk-03',
      domainName: '🛒 Retail & Bakery Operations',
      iconName: 'ShoppingCart',
      scopeCapabilities: 'Kasir POS Settlement, Buffer Point Reorder SKU, Manajemen Kas Kecil, & Retur Expired.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Analisis SKU roti yang mendekati expired date minggu ini'
    },
    {
      id: 'sk-04',
      domainName: '🏭 Manufaktur & Resep Produksi F&B',
      iconName: 'Factory',
      scopeCapabilities: 'Formula BOM Costing, Control Food Waste, HPP Per Porsi, & Efisiensi Resep Pabrikasi.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Hitung HPP porsi catering sapi lada hitam dengan marjin 45%'
    },
    {
      id: 'sk-05',
      domainName: '⛏️ Pertambangan & Fleet Hauling',
      iconName: 'Pickaxe',
      scopeCapabilities: 'Monitoring Ritase Cargo Ore (Au g/t), Efisiensi BBM Solar L/Jam Volvo FMX, & Rotasi Shift Mess Hall.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Berapa rata-rata konsumsi solar dump truck Volvo FMX shift 1?'
    },
    {
      id: 'sk-06',
      domainName: '🍳 Catering & Menu Gizi Massal',
      iconName: 'Utensils',
      scopeCapabilities: 'Perencanaan Menu Bergizi 4 Sehat, Hitung Kalori/Protein Per Pax, & Logistik Expedisi Catering.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Rencanakan variasi menu catering bergizi tinggi protein 650 Kcal'
    },
    {
      id: 'sk-07',
      domainName: '🏨 Perhotelan & Tour Wisata',
      iconName: 'Hotel',
      scopeCapabilities: 'PMS Room Occupancy Rate %, ADR, RevPAR, Housekeeping turnover, & Bundling Paket Tour Wisata.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Analisis RevPAR hotelir dan rekomendasi paket staycation akhir pekan'
    },
    {
      id: 'sk-08',
      domainName: '🎯 Sales, CRM & Marketing',
      iconName: 'Target',
      scopeCapabilities: 'Analisis Funnel SPH Quotation, Win-Rate Conversion, Loyalty Segment, & Lead ROI Campaign.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Berapa win-rate penawaran harga sales CRM bulan ini?'
    },
    {
      id: 'sk-09',
      domainName: '🔍 SEO & Digital Analytics',
      iconName: 'Search',
      scopeCapabilities: 'Intent Keyword Analysis, Optimasi Traffic Brand Hotel & Catering, & Digital Funnel Tracking.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Saran keyword SEO terbaik untuk bisnis catering & resort'
    },
    {
      id: 'sk-10',
      domainName: '🌱 Perkebunan & Agribisnis (Sawit, Durian & Holtikultura)',
      iconName: 'Sprout',
      scopeCapabilities: 'Panen TBS Kelapa Sawit, Rendemen CPO PKS %, BJR Rata-rata, Budidaya Durian Musang King/Black Thorn, & Drip Irrigation.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Berapa estimasi tonase panen TBS sawit dan rendemen CPO minggu ini?'
    },
    {
      id: 'sk-11',
      domainName: '💻 Full-Stack Code & DevOps Infrastructure',
      iconName: 'Code',
      scopeCapabilities: 'PostgreSQL Text-to-SQL, Prisma ORM Schema, Next.js 16 App Router, Node/Express API, React Native, Flutter Mobile, MCP Server, Nginx & Ubuntu VPS.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Tuliskan konfigurasi Nginx Reverse Proxy & SSL untuk VPS Ubuntu Next.js'
    },
    {
      id: 'sk-12',
      domainName: '🛡️ ERP Governance & Compliance Audit',
      iconName: 'ShieldCheck',
      scopeCapabilities: 'Aturan Gembok Backdate 🔒, Soft-Delete Governance, Matrix Otorisasi RBAC, & Audit Trail Permanent.',
      status: 'ACTIVE_GUARDED',
      sampleQueries: 'Verifikasi kepatuhan transaksi backdate dan otorisasi Super Admin'
    }
  ]);

  const columns: ColumnDef<SkillDomainItem>[] = [
    {
      key: 'domainName',
      header: 'Domain Keahlian AI',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (s) => s.domainName
    },
    {
      key: 'scopeCapabilities',
      header: 'Lingkup Kapabilitas & Tugas Spesialis',
      className: 'text-slate-600 dark:text-slate-300 text-[11px]',
      render: (s) => s.scopeCapabilities
    },
    {
      key: 'sampleQueries',
      header: 'Contoh Query Terverifikasi',
      className: 'font-mono text-[10px] text-sky-600 dark:text-sky-400 italic',
      render: (s) => `"${s.sampleQueries}"`
    },
    {
      key: 'status',
      header: 'Status Guardrail',
      align: 'center',
      render: (s) => (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>STRICT GUARDED</span>
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* System Persona Guardrail Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-3xl text-white shadow-xl space-y-3 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shrink-0">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>DeepSeek System Persona Guardrail & Boundary Controls</span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] rounded-md font-mono font-bold">
                POLICY: ERP DOMAIN ONLY
              </span>
            </h2>
            <p className="text-[11px] text-slate-300 mt-0.5">
              DeepSeek dikunci secara ketat (*system prompt boundary*) hanya untuk merespon tugas analisis bisnis, budgeting, akuntansi, operasional 5 tenant, dan 10 keahlian spesialis. Query di luar bisnis ERP otomatis ditolak secara sopan.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 font-mono text-[11px] text-amber-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>System Persona Guardrail Prompt Instruction:</span>
          </div>
          <p className="text-slate-300 text-[10px] leading-relaxed">
            "You are DeepSeek ERP Enterprise Assistant. You ONLY respond to ERP business, accounting audit, budgeting, operational analysis (Retail, F&B, Mining, Hotel, Catering), official correspondence, SEO, and Sales/Marketing. If the user asks non-ERP questions (sports, entertainment, fiction), respond with: 'Mohon maaf, saya adalah DeepSeek ERP Assistant yang difokuskan khusus untuk analisis bisnis ERP Anda.'"
          </p>
        </div>
      </div>

      {/* Skills Matrix Table */}
      <DataTable
        headerTitle={`Matriks 10 Keahlian Spesialis ERP DeepSeek (${skills.length} Domain Aktif)`}
        columns={columns}
        data={skills}
        keyExtractor={(s) => s.id}
      />
    </div>
  );
};
