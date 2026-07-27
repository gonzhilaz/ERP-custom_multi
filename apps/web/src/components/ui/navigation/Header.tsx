'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, Cpu, User, Building, Store, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTenantContext } from '@/context/TenantContext';
import { ProfileEditModal } from '@/components/ui/modals/ProfileEditModal';
import { BackdateUnblockToggle } from '@/components/ui/toggles/BackdateUnblockToggle';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const { user } = useAuth();
  const { activeUnit, activeBranch, availableUnits, availableBranches, canSwitchUnit, switchUnit, switchBranch } = useTenantContext();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();

  const [notifications, setNotifications] = useState([
    { id: 'n-1', title: 'Re-Order Minimum Stock Alert', message: 'Tepung Terigu Cakra Kembar sisa 18 Karung (min: 50).', href: '/inventory/items', time: '10m lalu', unread: true },
    { id: 'n-2', title: 'Work Order Servis Selesai', message: 'Mesin Oven Deck Rotari 3-Deck telah selesai dipelihara.', href: '/inventory/assets/maintenance', time: '1j lalu', unread: true },
    { id: 'n-3', title: 'Jatuh Tempo Utang AP', message: 'Faktur PT Borneo Mining Emas senilai Rp 45 Jt jatuh tempo.', href: '/finance/ap', time: '3j lalu', unread: false }
  ]);

  const handleNotificationClick = (id: string, href: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    setIsNotifOpen(false);
    router.push(href);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const canSwitchTenants = canSwitchUnit;

  const isMultiBranchUser = canSwitchTenants || availableBranches.length > 1;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Hamburger & Search Bar */}
      <div className="flex items-center gap-2.5 w-full md:w-96">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer shrink-0"
            title="Buka Navigasi Modul"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari transaksi, jurnal, barang, karyawan, atau invoice..."
            className="w-full bg-slate-100 dark:bg-slate-800 text-xs pl-9 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-sky-500 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* OpenClaw AI Active Compact Icon */}
        <div className="relative group">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-400 rounded-xl border border-violet-500/20 flex items-center gap-1.5 cursor-pointer">
            <Cpu className="w-4 h-4" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="absolute right-0 mt-1 hidden group-hover:block bg-slate-950 text-white text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap z-50 shadow-lg font-semibold">
            OpenClaw AI Active (Connected)
          </div>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-sky-500" /> Notifikasi Sistem ({unreadCount} Baru)
                </span>
                {unreadCount > 0 && (
                  <button onClick={() => setNotifications(prev => prev.map(n => ({...n, unread: false})))} className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                    Tandai Dibaca
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.id, n.href)}
                    className={`p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${n.unread ? 'bg-sky-50/50 dark:bg-slate-800/30 font-semibold' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                      <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* User Initials Avatar ONLY in Header (No name text next to it) */}
        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-all"
            title="Profil User"
          >
            {getInitials(user?.fullName)}
          </button>

          {/* User Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-4 space-y-3.5 text-xs">
              {/* User Account Info Block */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {user?.fullName}
                </div>
                <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  {user?.systemRole?.replace('_', ' ')}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {user?.email}
                </div>
              </div>

              {/* 1. Unit Usaha Selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-sky-500" /> Unit Usaha
                </label>
                {canSwitchTenants ? (
                  <select
                    value={activeUnit?.tenantId || 'holding'}
                    onChange={(e) => switchUnit(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    {availableUnits.map((u) => (
                      <option key={u.tenantId} value={u.tenantId}>{u.name} ({u.type})</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                    {activeUnit?.name}
                  </div>
                )}
              </div>

              {/* 2. Cabang Switcher */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-500" /> Cabang
                </label>
                {isMultiBranchUser ? (
                  <select
                    value={activeBranch?.id || ''}
                    onChange={(e) => switchBranch(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:outline-none"
                  >
                    {availableBranches.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                    {activeBranch?.name || 'Cabang Utama'}
                  </div>
                )}
              </div>

              {/* 3. Backdate Governance Toggle inside Profile */}
              <BackdateUnblockToggle />

              {/* 4. Tombol Ubah Profil dan Sandi */}
              <button
                onClick={() => { setIsEditModalOpen(true); setIsProfileOpen(false); }}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-sky-500" />
                <span>Ubah Profil & Sandi</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Standalone Profile Edit Modal using React createPortal to document.body */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialEmail={user?.email}
      />
    </header>
  );
};
