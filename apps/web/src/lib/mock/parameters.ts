export interface SystemParameterItem {
  id: string;
  moduleGroup: 'INVENTORY_ASSET' | 'VENDOR_PROCUREMENT' | 'HRD_PAYROLL' | 'FINANCE_LEGAL';
  parameterType: string; // e.g. "Kategori Aset", "Tipe Pekerja", "Kategori Vendor", "Kategori Kas"
  code: string;
  name: string;
  description: string;
}

export const MOCK_SYSTEM_PARAMETERS: SystemParameterItem[] = [
  {
    id: 'prm-01',
    moduleGroup: 'INVENTORY_ASSET',
    parameterType: 'Kategori Aset Tetap',
    code: 'AST-HEAVY',
    name: 'Alat Berat & Excavator Mining',
    description: 'Aset mesin tambang bermotor seperti Excavator, Buldozer, & Dump Truck'
  },
  {
    id: 'prm-02',
    moduleGroup: 'INVENTORY_ASSET',
    parameterType: 'Kategori Aset Tetap',
    code: 'AST-IT',
    name: 'Perangkat IT & Server',
    description: 'Laptop kantor, server rack, printer, & jaringan internet'
  },
  {
    id: 'prm-03',
    moduleGroup: 'VENDOR_PROCUREMENT',
    parameterType: 'Kategori Supplier/Vendor',
    code: 'VND-RAW-FOOD',
    name: 'Supplier Bahan Baku Daging & Sayur Resto',
    description: 'Penyedia bahan makanan basah dapur resto & catering'
  },
  {
    id: 'prm-04',
    moduleGroup: 'HRD_PAYROLL',
    parameterType: 'Klasifikasi Pekerja',
    code: 'EMP-PKWT',
    name: 'Kontrak Waktu Tertentu (PKWT)',
    description: 'Karyawan dengan status kontrak periode tertentu'
  },
  {
    id: 'prm-05',
    moduleGroup: 'FINANCE_LEGAL',
    parameterType: 'Kategori Beban Kas Kecil',
    code: 'EXP-ATK',
    name: 'ATK & Perlengkapan Kantor',
    description: 'Pembelian kertas, tinta, & perlengkapan kerja kantor'
  }
];
