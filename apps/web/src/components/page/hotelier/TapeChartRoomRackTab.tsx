'use client';

import React, { useState } from 'react';
import { Calendar, BedDouble, ChevronLeft, ChevronRight, UserCheck, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

interface RoomRackCell {
  date: string;
  resNumber?: string;
  guestName?: string;
  status: 'VACANT_CLEAN' | 'VACANT_DIRTY' | 'RESERVED' | 'CHECKED_IN' | 'OUT_OF_ORDER';
  segment?: string;
}

interface RoomRow {
  roomNo: string;
  roomType: string;
  floor: number;
  cells: Record<string, RoomRackCell>;
}

export const TapeChartRoomRackTab = () => {
  const dates = [
    '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31', '2026-08-01',
    '2026-08-02', '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07', '2026-08-08'
  ];

  const [roomRows] = useState<RoomRow[]>([
    {
      roomNo: 'RM-101',
      roomType: 'Deluxe King',
      floor: 1,
      cells: {
        '2026-07-26': { date: '2026-07-26', status: 'CHECKED_IN', resNumber: 'RSV-0082', guestName: 'Mr. Johnathan Smith', segment: 'OTA' },
        '2026-07-27': { date: '2026-07-27', status: 'CHECKED_IN', resNumber: 'RSV-0082', guestName: 'Mr. Johnathan Smith', segment: 'OTA' },
        '2026-07-28': { date: '2026-07-28', status: 'VACANT_DIRTY' },
        '2026-07-29': { date: '2026-07-29', status: 'RESERVED', resNumber: 'RSV-0095', guestName: 'Bpk. Ahmad Fauzi', segment: 'CORPORATE' }
      }
    },
    {
      roomNo: 'RM-102',
      roomType: 'Deluxe King',
      floor: 1,
      cells: {
        '2026-07-26': { date: '2026-07-26', status: 'VACANT_CLEAN' },
        '2026-07-27': { date: '2026-07-27', status: 'VACANT_CLEAN' },
        '2026-07-28': { date: '2026-07-28', status: 'RESERVED', resNumber: 'RSV-0099', guestName: 'Ibu Siska Utami', segment: 'GOVERNMENT' }
      }
    },
    {
      roomNo: 'RM-201',
      roomType: 'Executive Suite',
      floor: 2,
      cells: {
        '2026-07-26': { date: '2026-07-26', status: 'CHECKED_IN', resNumber: 'RSV-0091', guestName: 'Ir. Hendra Wijaya', segment: 'CORPORATE' },
        '2026-07-27': { date: '2026-07-27', status: 'CHECKED_IN', resNumber: 'RSV-0091', guestName: 'Ir. Hendra Wijaya', segment: 'CORPORATE' },
        '2026-07-28': { date: '2026-07-28', status: 'CHECKED_IN', resNumber: 'RSV-0091', guestName: 'Ir. Hendra Wijaya', segment: 'CORPORATE' }
      }
    },
    {
      roomNo: 'RM-202',
      roomType: 'Executive Suite',
      floor: 2,
      cells: {
        '2026-07-26': { date: '2026-07-26', status: 'OUT_OF_ORDER' }
      }
    },
    {
      roomNo: 'RM-301',
      roomType: 'Grand Deluxe Twin',
      floor: 3,
      cells: {
        '2026-07-26': { date: '2026-07-26', status: 'RESERVED', resNumber: 'RSV-0088', guestName: 'Ibu Ratna Saraswati', segment: 'GOVERNMENT' },
        '2026-07-27': { date: '2026-07-27', status: 'RESERVED', resNumber: 'RSV-0088', guestName: 'Ibu Ratna Saraswati', segment: 'GOVERNMENT' }
      }
    }
  ]);

  const getStatusStyle = (status: RoomRackCell['status']) => {
    switch (status) {
      case 'CHECKED_IN':
        return 'bg-sky-500 text-white font-bold border-sky-600';
      case 'RESERVED':
        return 'bg-amber-500 text-slate-950 font-bold border-amber-600';
      case 'VACANT_DIRTY':
        return 'bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold border-rose-300 dark:border-rose-800';
      case 'OUT_OF_ORDER':
        return 'bg-slate-300 dark:bg-slate-800 text-slate-500 font-mono text-[9px] border-slate-400';
      default:
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Legend & Filter Control Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Tape Chart Room Rack Grid</h2>
            <p className="text-[11px] text-slate-500">Visualisasi 14 Hari Matriks Alokasi Kamar & Status Tamu PMS</p>
          </div>
        </div>

        {/* Status Legend Badges */}
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold">
          <span className="px-2 py-1 rounded bg-sky-500 text-white">Checked-In</span>
          <span className="px-2 py-1 rounded bg-amber-500 text-slate-950">Reserved</span>
          <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Vacant Clean</span>
          <span className="px-2 py-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">Vacant Dirty</span>
          <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Out of Order (OOO)</span>
        </div>
      </div>

      {/* Tape Chart Calendar Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 min-w-[120px] sticky left-0 bg-slate-100 dark:bg-slate-800 z-10 border-r border-slate-200 dark:border-slate-700">
                  No. Kamar
                </th>
                {dates.map((d) => (
                  <th key={d} className="py-2.5 px-2 text-center min-w-[95px] border-r border-slate-200/60 dark:border-slate-800">
                    <div className="font-mono text-[10px]">{d.slice(8, 10)}/{d.slice(5, 7)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {roomRows.map((row) => (
                <tr key={row.roomNo} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-800">
                    <div>{row.roomNo}</div>
                    <div className="text-[9px] text-slate-400 font-normal">{row.roomType}</div>
                  </td>
                  {dates.map((d) => {
                    const cell = row.cells[d] || { date: d, status: 'VACANT_CLEAN' };
                    return (
                      <td key={d} className="p-1 border-r border-slate-100 dark:border-slate-800/80 text-center">
                        <div
                          className={`p-1.5 rounded-xl border text-[10px] min-h-[46px] flex flex-col justify-center transition-all ${getStatusStyle(
                            cell.status
                          )}`}
                        >
                          {cell.resNumber ? (
                            <>
                              <div className="font-bold line-clamp-1 text-[9px]">{cell.guestName}</div>
                              <div className="text-[8px] opacity-80">{cell.resNumber}</div>
                            </>
                          ) : (
                            <span className="text-[9px] uppercase">{cell.status.replace('_', ' ')}</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
