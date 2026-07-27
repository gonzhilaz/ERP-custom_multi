'use client';

import React, { useState } from 'react';
import { Users, Plus, Building2, UserCheck, Phone, Mail, FileText } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { CreateCustomerModal } from '@/components/ui/modals/CreateCustomerModal';

interface CustomerRow {
  customerCode: string;
  companyName: string;
  industry: string;
  npwp: string;
  creditLimit: number;
  paymentTerm: string;
  picName: string;
  picPosition: string;
  phone: string;
  email: string;
  salesPerson: string;
  status: string;
}

export const CrmCustomersView = () => {
  const [activeTab, setActiveTab] = useState<'ACCOUNTS' | 'CONTACTS'>('ACCOUNTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState<CustomerRow[]>([
    { customerCode: 'CUST-2026-0012', companyName: 'PT Freeport Supplier Partner', industry: 'Pertambangan & Energi', npwp: '01.345.678.9-012.000', creditLimit: 500000000, paymentTerm: 'TOP 30 Hari', picName: 'Bpk. Ir. Hendra Wijaya', picPosition: 'Procurement Manager', phone: '+62 812-8890-1122', email: 'hendra.wijaya@freeport.co.id', salesPerson: 'Irfan Aries (Senior Sales)', status: 'ACTIVE' },
    { customerCode: 'CUST-2026-0019', companyName: 'Kementerian ESDM Event Reserve', industry: 'Pemerintahan & BUMN', npwp: '02.998.112.4-045.000', creditLimit: 250000000, paymentTerm: 'TOP 14 Hari', picName: 'Ibu Ratna Saraswati', picPosition: 'Kabag Umum & Protokoler', phone: '+62 813-7711-2299', email: 'ratna.saraswati@esdm.go.id', salesPerson: 'Siti Rahma (Corporate Account)', status: 'ACTIVE' },
    { customerCode: 'CUST-2026-0024', companyName: 'PT Kalimantan Mining Resources', industry: 'Pertambangan & Energi', npwp: '03.114.556.2-088.000', creditLimit: 1000000000, paymentTerm: 'TOP 60 Hari', picName: 'Bpk. H. Bambang Subagyo', picPosition: 'VP Supply Chain', phone: '+62 811-5544-3322', email: 'bambang.subagyo@kaltim-mining.com', salesPerson: 'Irfan Aries (Senior Sales)', status: 'ACTIVE' }
  ]);

  const subTabs: SubTabItem[] = [
    { id: 'ACCOUNTS', label: 'Daftar Perusahaan Client (B2B Accounts)', icon: Building2, count: customers.length },
    { id: 'CONTACTS', label: 'Daftar Person In Charge (Contacts PIC)', icon: UserCheck, count: customers.length }
  ];

  const handleAddCustomer = (newCust: CustomerRow) => {
    setCustomers([newCust, ...customers]);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const accountColumns: ColumnDef<CustomerRow>[] = [
    { key: 'customerCode', header: 'Kode Client', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.customerCode },
    { key: 'companyName', header: 'Nama Perusahaan Client', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.companyName },
    { key: 'industry', header: 'Sektor Industri', render: (i) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded">{i.industry}</span> },
    { key: 'creditLimit', header: 'Limit Kredit (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.creditLimit.toLocaleString('id-ID')}` },
    { key: 'paymentTerm', header: 'Term Bayar', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => i.paymentTerm },
    { key: 'salesPerson', header: 'Account Executive (Sales)', className: 'font-semibold text-slate-700 dark:text-slate-300', render: (i) => i.salesPerson },
    { key: 'status', header: 'Status', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  const contactColumns: ColumnDef<CustomerRow>[] = [
    { key: 'picName', header: 'Nama Lengkap PIC', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.picName },
    { key: 'picPosition', header: 'Jabatan PIC', className: 'font-semibold text-slate-700 dark:text-slate-300', render: (i) => i.picPosition },
    { key: 'companyName', header: 'Perusahaan Client', className: 'font-bold text-sky-600 dark:text-sky-400', render: (i) => i.companyName },
    { key: 'phone', header: 'No. Telp / WhatsApp', className: 'font-mono font-bold text-emerald-600', render: (i) => i.phone },
    { key: 'email', header: 'Email Resmi', className: 'font-mono text-slate-500', render: (i) => i.email }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pelanggan CRM"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Customer Accounts & Contacts"
        glossaryItems={[
          { term: 'B2B Client Account', description: 'Database entitas perusahaan atau institusi yang menjadi pelanggan enterprise.' },
          { term: 'Contact PIC', description: 'Profil person in charge decision maker (Procurement/GM) yang dihubungi oleh Sales.' }
        ]}
        badges={[
          { label: `${customers.length} Client Registered`, variant: 'sky' },
          { label: 'Role Restrict: Sales & Marketing', variant: 'slate' }
        ]}
        actions={
          <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Customer Baru</span>
          </button>
        }
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari perusahaan, nama PIC, atau industri..."
          />
        </div>
      </div>

      {activeTab === 'ACCOUNTS' ? (
        <DataTable
          headerTitle={`Daftar Akun Perusahaan Client B2B (${filteredCustomers.length})`}
          columns={accountColumns}
          data={filteredCustomers}
          keyExtractor={(i) => i.customerCode}
        />
      ) : (
        <DataTable
          headerTitle={`Daftar Person In Charge (PIC Contacts) (${filteredCustomers.length})`}
          columns={contactColumns}
          data={filteredCustomers}
          keyExtractor={(i) => i.customerCode}
        />
      )}

      {/* Modal Add Customer */}
      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
};
