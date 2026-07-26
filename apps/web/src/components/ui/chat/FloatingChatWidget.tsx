'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, UserCheck, Circle } from 'lucide-react';
import { useTenantContext } from '@/context/TenantContext';

interface ActiveChatUser {
  id: string;
  name: string;
  role: string;
  tenantId: string;
  tenantName: string;
  status: 'ONLINE' | 'AWAY';
}

const MOCK_ONLINE_USERS: ActiveChatUser[] = [
  { id: 'usr-ho-1', name: 'Budi Santoso', role: 'Holding Executive', tenantId: 'holding', tenantName: 'Holding HO Central', status: 'ONLINE' },
  { id: 'usr-ho-2', name: 'Dewi Lestari', role: 'Finance Director HO', tenantId: 'holding', tenantName: 'Holding HO Central', status: 'ONLINE' },
  { id: 'usr-fnb-1', name: 'Siti Aminah', role: 'Resto Unit Manager', tenantId: 'unit-fnb', tenantName: 'Nusantara Culinary & Catering', status: 'ONLINE' },
  { id: 'usr-fnb-2', name: 'Bambang Chef', role: 'Head Catering Chef', tenantId: 'unit-fnb', tenantName: 'Nusantara Culinary & Catering', status: 'ONLINE' },
  { id: 'usr-mine-1', name: 'Rudi Hermawan', role: 'Site Manager Gold-01', tenantId: 'unit-mining', tenantName: 'PT Borneo Mining Emas', status: 'ONLINE' },
  { id: 'usr-hotel-1', name: 'Agus Receptionist', role: 'Front Desk Officer', tenantId: 'unit-hotel', tenantName: 'Grand Royal Hotel & Resort', status: 'ONLINE' }
];

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRecipient, setActiveRecipient] = useState<ActiveChatUser | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Budi Santoso', text: 'Halo tim, mohon verifikasi laporan konsolidasi keuangan Q3.', time: '12:45' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const { activeUnit } = useTenantContext();

  const activeTenantId = activeUnit?.tenantId || 'holding';

  // Strict Scoping Rule:
  // - If HO/holding: see ALL active users
  // - If Subsidiary (e.g. unit-fnb): see ONLY users in same unit + HO users. HIDE other subsidiaries!
  const visibleUsers = MOCK_ONLINE_USERS.filter((user) => {
    if (activeTenantId === 'holding' || activeTenantId === 'all') return true;
    return user.tenantId === 'holding' || user.tenantId === activeTenantId;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'Saya (You)', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-full font-bold text-xs shadow-2xl shadow-sky-600/40 hover:scale-105 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Internal Chat ({visibleUsers.length} Online)</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      )}

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex justify-between items-center">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>Internal Enterprise Chat</span>
              </div>
              <p className="text-[10px] text-sky-100 font-medium">
                Scope: {activeTenantId === 'holding' ? 'Global HO (All Units)' : `${activeUnit?.name || 'Unit'} + HO`}
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/10 text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Users Horizontal Scroll */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto text-xs">
            {visibleUsers.map((usr) => (
              <button
                key={usr.id}
                onClick={() => setActiveRecipient(usr)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold shrink-0 transition-all ${
                  activeRecipient?.id === usr.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[90px]">{usr.name}</span>
              </button>
            ))}
          </div>

          {/* Messages History */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl max-w-[85%] space-y-0.5 ${
                  m.sender.startsWith('Saya')
                    ? 'bg-sky-600 text-white ml-auto rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                }`}
              >
                <div className="text-[9px] font-bold opacity-80">{m.sender} • {m.time}</div>
                <div className="text-[11px] leading-relaxed">{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input
              type="text"
              placeholder={activeRecipient ? `Pesan ke ${activeRecipient.name}...` : 'Ketik pesan internal...'}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
            />
            <button type="submit" className="p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
