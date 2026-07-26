# Matriks Akses Modul & Audit Domain Spesifik Per Unit Usaha (ERP Enterprise)

Dokumen ini berisi hasil investigasi mendalam mengenai spesifikasi domain bisnis, visibilitas modul navigasi, dan catatan penting operasional untuk setiap unit usaha di bawah Holding Nusantara Group.

---

## 🏢 1. Parent Company / HO Central (`holding`)
> **Fokus Utama**: Holding Control Tower, Konsolidasi Keuangan, Eliminasi Inter-Company, & Governance.

### 📋 Daftar Modul Yang AKTIF (HO Mode):
- 📊 **Holding Overview**: Consolidated Balance Sheet, Group EBITDA, Profitability Matrix per Subsidiary.
- 💰 **Finance & Accounting**: Group Cash Flow, Standardized COA, General Ledger Audit, Utang Usaha (AP), Piutang Usaha (AR), **Inter-Company Elimination Journal Generator**.
- 📦 **Inventory & Fixed Assets**: Group Valuation, **Aktiva Tetap & Depresiasi** (Alat Berat, Mebel, Bangunan), Multi-Warehouse Status.
- 🤝 **Vendor & Procurement**: Group Vendor Directory, PO Approval $>50$ Juta (ACC Direksi Mandatory).
- 👥 **HRD & Payroll**: HRD Analytics, Group Employees Master, BPJS Regulation 2026 Engine, PPh 21 TER Payroll Run, Performance Scoring KPI.
- 📬 **Persuratan Official**: Surat Masuk, Surat Keluar Resmi, Disposisi Direksi.
- 📊 **Manajerial & Legal DMS**: Budgeting vs Actual Enforcement, Digital Vault IUP Tambang/BPOM/HGB.
- 🛡️ **Pengaturan & Governance**: User Management & RBAC Permissions, Dynamic Tenant Configuration, Workflow Approval Matrix, Document Designer.

### 🚫 Modul Yang TERSEMBUNYI (HIDDEN):
- ❌ POS Touchscreen Cashier (Alat Operasional Kasir Garis Depan)
- ❌ Kitchen Display System / KDS (Dapur Restoran)
- ❌ Hotelier PMS & Housekeeping (Operasional Kamar Hotel)

---

## 🍲 2. Nusantara Culinary & Catering (`tenant-resto-01`)
> **Fokus Utama**: Penjualan Kasir Resto/Catering, KDS Dapur, Stok Cold Storage, & Gaji Borongan Event.

### 📋 Daftar Modul Yang AKTIF:
- 📊 **Resto Unit Overview**: Omset Penjualan Resto & Catering, Fast-moving Food Items.
- 🛒 **POS Touchscreen Cashier**: Kasir Touchscreen (Cash/QRIS/Card), Cetak Receipt Thermal Bluetooth, Auto Stock Cut.
- 🍳 **Kitchen Display System (KDS)**: Antrean Pesanan Dapur Real-time (Cooking/Served Status).
- 📦 **Inventory Resto**: Stok Bahan Baku (Daging, Bumbu, Beras), Cold Storage Warehouse, Peringatan Stok Minimum, Aktiva Tetap Oven Commercial & Mebel Resto.
- 👥 **HRD & Payroll Resto**: Gaji Bulanan Staf & **Skema Borongan/Komisi Event Catering**.
- 📱 **ESS Resto**: Presensi Wajah & GPS Dapur, Pengajuan Cuti.
- 🤝 **Vendor Supplier Resto**: Supplier Daging Import & Sayuran (TOP 30 Hari).
- 💰 **Finance Resto**: General Ledger Operasional Resto, Cash In/Out, Billing Invoice Katering Massal.

### 🚫 Modul Yang TERSEMBUNYI (HIDDEN):
- ❌ Hotelier PMS Mobile & Visual Room Grid (Hotel)
- ❌ Housekeeping Task Sheet (Hotel)
- ❌ Heavy Mining Equipment Inventory (Tambang)
- ❌ IUP Mining Legal Documents (Tambang)
- ❌ Inter-Company Elimination (Khusus HO)

---

## ⛏️ 3. PT Borneo Mining Emas (`tenant-gold-01`)
> **Fokus Utama**: Operasional Site Tambang, Depresiasi Alat Berat, Gaji Harian Shift, & Izin IUP ESDM.

### 📋 Daftar Modul Yang AKTIF:
- 📊 **Mining Site Overview**: Production Yield, Fuel Consumption, Heavy Equipment Uptime %.
- 📦 **Inventory & Heavy Equipment Assets**: Master Spareparts (Filter, BAN CAT 777), **Aktiva Tetap Alat Berat (Excavator CAT 777D)**, Depresiasi Garis Lurus, Multi-Warehouse Site (-0.923, 116.821).
- 👥 **HRD & Payroll Mining**: Master Operasional Site, **Skema Gaji Harian (Daily Shift Rate Rp 450rb/Hari)**, PPh 21 TER, BPJS TK JKK/JK Risk.
- 📑 **Managerial & Legal DMS Mining**: Vault Izin **IUP Operasi ESDM**, Sertifikat AMDAL, Log K3/HSE.
- 🤝 **Vendor Procurement Mining**: Supplier Sparepart Heavy Machinery (Traktor Nusantara), PO Approval $>50$ Juta.
- 💰 **Finance Mining**: General Ledger Site, Utang Vendor Equipment (AP), Operasional Costing.

### 🚫 Modul Yang TERSEMBUNYI (HIDDEN):
- ❌ POS Touchscreen Cashier (Resto/Retail)
- ❌ Kitchen Display System / KDS (Resto)
- ❌ Hotelier PMS & Housekeeping (Hotel)
- ❌ Inter-Company Elimination (Khusus HO)

---

## 🏨 4. Grand Royal Hotel & Resort (`tenant-hotel-01`)
> **Fokus Utama**: Tingkat Keterisian Kamar (Occupancy Rate %), Visual Room Grid, & Housekeeping.

### 📋 Daftar Modul Yang AKTIF:
- 📊 **Hotelier Overview**: Occupancy Rate %, Average Daily Rate (ADR), RevPAR analytics.
- 🏨 **Hotelier PMS Mobile**: Visual Room Grid Status (Vacant Clean, Occupied, Vacant Dirty, Maintenance), Quick Check-In / Check-Out Tamu, Guest Folio.
- 🧹 **Housekeeping Management**: Room Cleaning Task Sheet, Penugasan Housekeeping Staff, Asset Mebel & Linen Hotel.
- 📦 **Inventory & Hotel Assets**: Linen, Amenities, Furniture Mebel Hotel, Aktiva Tetap Gedung/Mebel & Depresiasi.
- 👥 **HRD & Payroll Hotel**: Master Staf Hotel, Receptionist, & Housekeeping Payroll.
- 💰 **Finance Hotel**: Guest Room Billing, Account Receivable (AR) Corporate Reservation, Daily Cash Receipts.

### 🚫 Modul Yang TERSEMBUNYI (HIDDEN):
- ❌ POS Touchscreen Cashier Resto
- ❌ Kitchen Display System / KDS
- ❌ Heavy Mining Equipment Inventory (Tambang)
- ❌ IUP Mining Legal Documents (Tambang)
- ❌ Inter-Company Elimination (Khusus HO)

---

## 🛒 5. Nusa Mart Retail Chain (`tenant-retail-01`)
> **Fokus Utama**: Penjualan Kasir Barcode/Touch, Stok SKU Retail, & Fast Checkout.

### 📋 Daftar Modul Yang AKTIF:
- 📊 **Retail Overview**: Store Sales Volume, Basket Size Analytics.
- 🛒 **POS Touchscreen Cashier**: Barcode Scanner POS, Receipt Printing, Instant Inventory Cut.
- 📦 **Inventory Retail**: Katalog SKU Barang Retail, Re-Order Level Minimum Alerts, Stock Opname.
- 🤝 **Vendor Procurement Retail**: Supplier FMCG, TOP Payment 30 Hari.
- 💰 **Finance Retail**: Daily POS Cash Reconciliation, Sales Revenue.

### 🚫 Modul Yang TERSEMBUNYI (HIDDEN):
- ❌ Hotelier PMS & Housekeeping (Hotel)
- ❌ Heavy Mining Equipment Inventory (Tambang)
- ❌ IUP Mining Legal Documents (Tambang)
- ❌ Kitchen Display System / KDS (Resto)
