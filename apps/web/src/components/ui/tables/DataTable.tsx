'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Download, Printer } from 'lucide-react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  sortValue?: (item: T) => any;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectRow?: (id: string, checked: boolean) => void;
  emptyText?: string;
  headerRightContent?: React.ReactNode;
  headerTitle?: string;
  enablePagination?: boolean;
  defaultPageSize?: number;
  enableExport?: boolean;
  isLoading?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  emptyText = 'Tidak ada data ditemukan',
  headerRightContent,
  headerTitle,
  enablePagination = true,
  defaultPageSize = 10,
  enableExport = true,
  isLoading = false
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const col = columns.find((c) => c.key === sortConfig.key);

    return [...data].sort((a, b) => {
      let aVal = col?.sortValue ? col.sortValue(a) : (a as any)[sortConfig.key!];
      let bVal = col?.sortValue ? col.sortValue(b) : (b as any)[sortConfig.key!];

      if (aVal === undefined || aVal === null) aVal = '';
      if (bVal === undefined || bVal === null) bVal = '';

      if (typeof aVal === 'string') {
        const comp = aVal.localeCompare(String(bVal));
        return sortConfig.direction === 'asc' ? comp : -comp;
      }

      if (typeof aVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - Number(bVal) : Number(bVal) - aVal;
      }

      return 0;
    });
  }, [data, sortConfig, columns]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = enablePagination ? sortedData.slice(startIndex, endIndex) : sortedData;
  const allSelected = paginatedData.length > 0 && selectedIds.length === paginatedData.length;

  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const headers = columns.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(',');
    const rows = sortedData.map((item) =>
      columns
        .map((c) => {
          const val = (item as any)[c.key];
          return `"${String(val ?? '').replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `export_table_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm text-xs space-y-0">
      {(headerTitle || headerRightContent || enableExport) && (
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          {headerTitle && <span className="font-bold text-slate-900 dark:text-white text-xs">{headerTitle}</span>}
          <div className="flex items-center gap-2">
            {headerRightContent && <div>{headerRightContent}</div>}
            {enableExport && (
              <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-700 pl-2">
                <button
                  onClick={handleExportCSV}
                  title="Ekspor Data CSV"
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-sky-500" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handlePrint}
                  title="Cetak Halaman"
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors text-[11px]"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cetak</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800 select-none">
              {selectable && (
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                    className="rounded cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSortable = col.sortable !== false;
                const isSorted = sortConfig.key === col.key;

                return (
                  <th
                    key={col.key}
                    onClick={() => isSortable && handleSort(col.key)}
                    className={`py-3 px-4 ${col.headerClassName || ''} ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    } ${isSortable ? 'cursor-pointer hover:bg-slate-200/60 dark:hover:bg-slate-700/60 group transition-colors' : ''}`}
                  >
                    <div className={`inline-flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{col.header}</span>
                      {isSortable && (
                        <span>
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 font-bold inline" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 font-bold inline" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-40 group-hover:opacity-100 inline transition-opacity" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {isLoading ? (
              // Skeleton Loader Rows
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  {selectable && <td className="py-3 px-4"><div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div></td>}
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-8 text-center text-slate-400 italic">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const key = keyExtractor(item, index);
                const isSelected = selectedIds.includes(key);

                return (
                  <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {selectable && (
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => onSelectRow && onSelectRow(key, e.target.checked)}
                          className="rounded cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-3 px-4 ${col.className || ''} ${
                          col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {col.render ? col.render(item, index) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Built-in Interactive Pagination Footer */}
      {enablePagination && totalItems > 0 && !isLoading && (
        <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3 text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span>
              Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} data
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400">Baris:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white">
              {safeCurrentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safeCurrentPage === totalPages}
              className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
