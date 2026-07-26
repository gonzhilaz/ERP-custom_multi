'use client';

import React, { useState } from 'react';
import { X, Building2, Plus, CheckCircle2, UserCheck, Phone, Mail } from 'lucide-react';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';

export interface CreateCustomerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCustomer: {
    customerCode: string;
    companyName: string;
    industry: string;
    npwp: string;
    creditLimit: number;
    paymentTerm: string; // TOP 30 Hari, TOP 60 Hari
    picName: string;
    picPosition: string;
    phone: string;
    email: string;
    salesPerson: string;
    status: string;
  }) => void;
}

export const CreateCustomerModal: React.FC<CreateCustomerProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [customerCode, setCustomerCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Pertambangan & Energi');
  const [npwp, setNpwp] = useState('');
  const [creditLimit, setCreditLimit] = useState<number>(100000000);
  const [paymentTerm, setPaymentTerm] = useState('TOP 30 Hari');
  const [picName, setPicName] = useState('');
  const [picPosition, setPicPosition] = useState('Procurement Manager');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salesPerson, setSalesPerson] = useState('Irfan Aries (Senior Sales HO)');

  React.useEffect(() => {
    if (isOpen) {
      const rand = Math.floor(Math.random() * 9000 + 1000);
      setCustomerCode(`CUST-2026-${rand}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const industryOptions: SearchSelectOption[] = [
    { id: 'Pertambangan & Energi', label: 'Pertambangan & Energi' },
    { id: 'Perhotelan & Pariwisata', label: 'Perhotelan & Pariwisata' },
    { id: 'F&B & Kuliner Massal', label: 'F&B & Kuliner Massal' },
    { id: 'Retail & Perdagangan', label: 'Retail & Perdagangan' },
    { id: 'Konstruksi & Infrastruktur', label: 'Konstruksi & Infrastruktur' },
    { id: 'Pemerintahan & BUMN', label: 'Pemerintahan & BUMN' }
  ];

  const termOptions: SearchSelectOption[] = [
    { id: 'COD (Cash On Delivery)', label: 'COD (Cash On Delivery)' },
    { id: 'TOP 14 Hari', label: 'TOP 14 Hari' },
    { id: 'TOP 30 Hari', label: 'TOP 30 Hari' },
    { id: 'TOP 60 Hari', label: 'TOP 60 Hari' },
    { id: 'TOP 90 Hari', label: 'TOP 90 Hari' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !picName.trim() || !phone.trim()) {
      alert('Mohon isi Nama Perusahaan, Nama PIC, dan No. Telp/WhatsApp!');
      return;
    }

    onSubmit({
      customerCode,
      companyName,
      industry,
      npwp: npwp || '00.000.000.0-000.000',
      creditLimit,
      paymentTerm,
      picName,
      picPosition,
      phone,
      email,
      salesPerson,
      status: 'ACTIVE'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Registrasi Master Pelanggan (Customer Account)</h3>
              <p className="text-[11px] text-slate-400">Pendaftaran akun perusahaan client B2B & kontak person penanggung jawab</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Customer</label>
              <input type="text" value={customerCode} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs cursor-not-allowed" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Perusahaan Client (B2B Account)</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Contoh: PT Freeport Supplier Partner" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Sektor Industri:</label>
              <SearchableSelect
                options={industryOptions}
                value={industry}
                onChange={setIndustry}
                placeholder="Pilih Industri..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nomor NPWP Perusahaan</label>
              <input type="text" value={npwp} onChange={(e) => setNpwp(e.target.value)} placeholder="01.345.678.9-012.000" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Plafon Limit Kredit (Rp)</label>
              <input type="number" value={creditLimit || ''} onChange={(e) => setCreditLimit(Number(e.target.value))} placeholder="100000000" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600 text-xs" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Term Pembayaran (Payment Term):</label>
              <SearchableSelect
                options={termOptions}
                value={paymentTerm}
                onChange={setPaymentTerm}
                placeholder="Pilih Term Pembayaran..."
              />
            </div>
          </div>

          {/* Section PIC Contact Details */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-sky-500" />
              <span>Data Person In Charge (PIC Decision Maker)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Nama Lengkap PIC</label>
                <input type="text" value={picName} onChange={(e) => setPicName(e.target.value)} placeholder="Contoh: Bpk. Ir. Hendra Wijaya" className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium" required />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Jabatan PIC</label>
                <input type="text" value={picPosition} onChange={(e) => setPicPosition(e.target.value)} placeholder="Contoh: General Manager Procurement" className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">No. Telp / WhatsApp</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62 812-8890-1122" className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Email Resmi PIC</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hendra.wijaya@freeport.co.id" className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Master Customer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
