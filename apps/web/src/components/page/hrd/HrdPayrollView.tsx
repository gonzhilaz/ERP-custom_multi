'use client';

import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Users, ShieldCheck, X, HelpCircle, Plus, FileSpreadsheet, Calendar, Sliders } from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_WORKER_TYPES, WorkerTypeItem, EmployeeItem } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { HrdPayrollTableTab } from './payroll/HrdPayrollTableTab';
import { HrdPayrollMassImportTab } from './payroll/HrdPayrollMassImportTab';
import { HrdPayrollProrataTab } from './payroll/HrdPayrollProrataTab';
import { HrdPayrollWorkerTypesTab } from './payroll/HrdPayrollWorkerTypesTab';

export const HrdPayrollView = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'PAYROLL' | 'MASS_IMPORT' | 'CUTOFF_PRORATA' | 'WORKER_TYPES'>('PAYROLL');
  const [workerTypes, setWorkerTypes] = useState<WorkerTypeItem[]>(MOCK_WORKER_TYPES);
  const [employees, setEmployees] = useState<EmployeeItem[]>(MOCK_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayrollProcessed, setIsPayrollProcessed] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  // Historical Period Selector State
  const [selectedPeriod, setSelectedPeriod] = useState('JULI_2026');

  // Selected Employee for Salary Component Breakdown Modal
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeItem | null>(null);
  const [salaryComponents, setSalaryComponents] = useState({
    baseSalary: 0,
    allowance: 3500000,
    overtime: 1250000,
    bonus: 1000000
  });

  // Prorata Resign Settlement Form State
  const [cutoffDay, setCutoffDay] = useState(25);
  const [paymentDay, setPaymentDay] = useState(1);
  const [prorataForm, setProrataForm] = useState({
    employeeName: 'Budi Santoso (Holding Central)',
    baseSalary: 35000000,
    resignationDate: '2026-08-01',
    unpaidDays: 6,
    workingDaysInMonth: 22
  });
  const [prorataResult, setProrataResult] = useState<number | null>(null);

  // Mass Import File State
  const [importFileName, setImportFileName] = useState<string | null>(null);
  const [isImportValidated, setIsImportValidated] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'KONTRAK' as WorkerTypeItem['category'],
    expression: '',
    salaryCoa: '5-20100 - Beban Gaji Karyawan Tetap (PKWTT)'
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const subTabs: SubTabItem[] = [
    { id: 'PAYROLL', label: 'Payroll', icon: DollarSign, count: employees.length },
    { id: 'MASS_IMPORT', label: 'Template & Mass Upload', icon: FileSpreadsheet, count: 1248 },
    { id: 'CUTOFF_PRORATA', label: 'Cut-off & Prorata Resign', icon: Calendar },
    { id: 'WORKER_TYPES', label: 'Tipe Pekerja & Rumus', icon: Users, count: workerTypes.length }
  ];

  const handleCalculateProrata = (e: React.FormEvent) => {
    e.preventDefault();
    const dailyRate = prorataForm.baseSalary / prorataForm.workingDaysInMonth;
    const unpaidAmount = Math.round(dailyRate * prorataForm.unpaidDays);
    setProrataResult(unpaidAmount);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFileName(file.name);
      setIsImportValidated(true);
    }
  };

  const handleProcessMassImport = () => {
    alert(`Import Batch [${importFileName}] Berhasil! 1,248 Data Karyawan Telah Dimuat Ke Payroll Run.`);
    setImportFileName(null);
    setIsImportValidated(false);
    setActiveTab('PAYROLL');
  };

  const handleOpenDetailModal = (emp: EmployeeItem) => {
    setSelectedEmployee(emp);
    setSalaryComponents({
      baseSalary: emp.baseSalary,
      allowance: Math.round(emp.baseSalary * 0.15),
      overtime: emp.workerTypeId === 'wt-03' ? 0 : 1250000,
      bonus: emp.workerTypeId === 'wt-01' ? 2000000 : 500000
    });
  };

  const handleSaveSalaryAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    const newGross = salaryComponents.baseSalary + salaryComponents.allowance + salaryComponents.overtime + salaryComponents.bonus;
    setEmployees((prev) =>
      prev.map((e) => (e.id === selectedEmployee.id ? { ...e, baseSalary: newGross } : e))
    );
    alert(`Rincian Komponen Gaji Karyawan [${selectedEmployee.fullName}] Berhasil Diperbarui!`);
    setSelectedEmployee(null);
  };

  const handleCreateWorkerType = (e: React.FormEvent) => {
    e.preventDefault();
    const newType: WorkerTypeItem = {
      id: `wt-${Date.now()}`,
      code: formData.code || `WT-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      expression: formData.expression || '(Gaji Pokok + Tunjangan) - PPh21',
      salaryCoa: formData.salaryCoa
    };
    setWorkerTypes([...workerTypes, newType]);
    alert(`Tipe Pekerja & Rumus Gaji [${formData.name}] Berhasil Didaftarkan!`);
    setIsModalOpen(false);
  };

  const handleSoftDeleteWorkerType = (id: string, name: string) => {
    if (!canMutate) {
      alert('Akses Ditolak: Edit & Delete hanya untuk IT, Admin, dan Top Level Manajemen!');
      return;
    }
    if (confirm(`Hapus (Soft-Delete) Tipe Pekerja [${name}]?`)) {
      setWorkerTypes((prev) => prev.filter((wt) => wt.id !== id));
    }
  };

  const handleProcessPayroll = () => {
    setIsPayrollProcessed(true);
    alert(`Payroll Run Periode [${selectedPeriod}] Berhasil Diproses & Jurnal Otomatis Terposting ke Finance (/finance/journals)!`);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Payroll</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Sistem Payroll"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-96 p-4 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-bold text-sky-400">
                  <span>Asal Usul & Aturan Penggajian Enterprise</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 text-[11px] text-slate-300">
                  <p>⚡ <strong>Auto-Fill Active Employees</strong>: Karyawan aktif di-fill otomatis dari Master Karyawan (/hrd/employees).</p>
                  <p>📅 <strong>Cut-off Date & Terhutang</strong>: Cut off setiap tanggal 25. Karyawan resign berhak prorata gaji terhutang.</p>
                  <p>📊 <strong>Mass Template (1000+ Karyawan)</strong>: Penggajian massal via Batch Excel/CSV Upload.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'PAYROLL' && (
            <button
              onClick={handleProcessPayroll}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                isPayrollProcessed ? 'bg-emerald-700 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isPayrollProcessed ? 'Payroll Processed & Synced' : 'Proses & Post Jurnal'}</span>
            </button>
          )}

          {activeTab === 'WORKER_TYPES' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tipe Pekerja</span>
            </button>
          )}
        </div>
      </div>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Tab Views */}
      {activeTab === 'PAYROLL' && (
        <HrdPayrollTableTab
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          employees={employees}
          isPayrollProcessed={isPayrollProcessed}
          onOpenDetailModal={handleOpenDetailModal}
        />
      )}

      {activeTab === 'MASS_IMPORT' && (
        <HrdPayrollMassImportTab
          importFileName={importFileName}
          isImportValidated={isImportValidated}
          onFileUpload={handleFileUpload}
          onProcessMassImport={handleProcessMassImport}
        />
      )}

      {activeTab === 'CUTOFF_PRORATA' && (
        <HrdPayrollProrataTab
          cutoffDay={cutoffDay}
          setCutoffDay={setCutoffDay}
          paymentDay={paymentDay}
          setPaymentDay={setPaymentDay}
          prorataForm={prorataForm}
          setProrataForm={setProrataForm}
          prorataResult={prorataResult}
          onCalculateProrata={handleCalculateProrata}
        />
      )}

      {activeTab === 'WORKER_TYPES' && (
        <HrdPayrollWorkerTypesTab
          workerTypes={workerTypes}
          canMutate={canMutate}
          onSoftDeleteWorkerType={handleSoftDeleteWorkerType}
        />
      )}

      {/* Modal Adjust Komponen Gaji */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Adjust Komponen Gaji</h3>
                <p className="text-[11px] text-slate-400 font-mono">{selectedEmployee.fullName} ({selectedEmployee.nik})</p>
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSalaryAdjustment} className="space-y-3">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Gaji Pokok (Rp)</label>
                <input
                  type="number"
                  value={salaryComponents.baseSalary}
                  onChange={(e) => setSalaryComponents({ ...salaryComponents, baseSalary: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Tunjangan Operasional (Rp)</label>
                <input
                  type="number"
                  value={salaryComponents.allowance}
                  onChange={(e) => setSalaryComponents({ ...salaryComponents, allowance: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-emerald-600"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Uang Lembur (Rp)</label>
                <input
                  type="number"
                  value={salaryComponents.overtime}
                  onChange={(e) => setSalaryComponents({ ...salaryComponents, overtime: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setSelectedEmployee(null)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold">
                  Batal
                </button>
                <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white rounded-xl font-bold shadow-sm hover:bg-sky-500">
                  Simpan Komponen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create Worker Type */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tambah Tipe Pekerja Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkerType} className="space-y-3">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Nama Tipe Pekerja</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pekerja Harian / Casual Staff"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Formula Matematika</label>
                <input
                  type="text"
                  placeholder="(Rate Harian * Jam Kerja) + Insentif"
                  value={formData.expression}
                  onChange={(e) => setFormData({ ...formData, expression: e.target.value })}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold">
                  Batal
                </button>
                <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white rounded-xl font-bold shadow-sm hover:bg-sky-500">
                  Simpan Tipe Pekerja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
