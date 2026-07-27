'use client';

import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Printer, Calendar, User, Building2, Tag, Info } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';

export interface DetailMetadataItem {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  highlight?: boolean;
}

export interface SummaryCardItem {
  label: string;
  value: string | number;
  color?: string;
}

export interface TableColumnSpec {
  header: string;
  accessor: string;
  align?: 'left' | 'center' | 'right';
  mono?: boolean;
  isCurrency?: boolean;
}

export interface FinanceItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  badgeType?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ALERT' | 'NEUTRAL';
  metadata?: DetailMetadataItem[];
  summaryCards?: SummaryCardItem[];
  lineItemsHeader?: string;
  columns?: TableColumnSpec[];
  lineItems?: Record<string, any>[];
  footerNotes?: string;
  actions?: React.ReactNode;
}

export const FinanceItemDetailModal: React.FC<FinanceItemDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badgeLabel,
  badgeType = 'ACTIVE',
  metadata = [],
  summaryCards = [],
  lineItemsHeader = 'Rincian Transaksi & Jurnal',
  columns = [],
  lineItems = [],
  footerNotes,
  actions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-500 shrink-0" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{title}</h3>
              {badgeLabel && <StatusBadge type={badgeType} label={badgeLabel} />}
            </div>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Cards */}
        {summaryCards.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {summaryCards.map((card, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">{card.label}</span>
                <span className={`font-mono font-bold text-sm block mt-0.5 ${card.color || 'text-slate-900 dark:text-white'}`}>
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Metadata Grid */}
        {metadata.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {metadata.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[11px] text-slate-400 font-medium">{item.label}</span>
                <div className={`font-semibold text-slate-800 dark:text-slate-200 ${item.mono ? 'font-mono' : ''} ${item.highlight ? 'text-sky-600 dark:text-sky-400' : ''}`}>
                  {item.value || '-'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table Line Items */}
        {columns.length > 0 && lineItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">{lineItemsHeader}</h4>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx} className={`py-2.5 px-3 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}>
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {lineItems.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      {columns.map((col, cIdx) => {
                        const val = row[col.accessor];
                        return (
                          <td
                            key={cIdx}
                            className={`py-2.5 px-3 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.mono ? 'font-mono font-semibold' : ''}`}
                          >
                            {col.isCurrency && typeof val === 'number'
                              ? val === 0 ? '-' : `Rp ${val.toLocaleString('id-ID')}`
                              : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Notes */}
        {footerNotes && (
          <div className="flex items-center gap-2 p-2.5 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-300 rounded-xl text-[11px] border border-sky-200/50 dark:border-sky-900/50">
            <Info className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
            <span>{footerNotes}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-3">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>TERAUDIT & TERVERIFIKASI SISTEM HO</span>
          </div>
          <div className="flex gap-2">
            {actions}
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-xl cursor-pointer transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
