# 🚀 ERP Multi-Tenant Enterprise — Development Roadmap & Module Status

Dokumen ini merupakan peta jalan pengembangan dan status modul aktual untuk **ERP Multi-Tenant Enterprise SaaS**.
Dokumen ini selalu diperbarui secara berkala sebagai acuan utama fitur yang telah selesai (`[x]`) dan prioritas pengembangan selanjutnya (`[ ]`).

---

## 🏗️ PETA JALAN PENGEMBANGAN BERTAHAP (PHASED ROADMAP)

### 🥖 FASE 1: Hospitality, Food Service & Retail Chain Core (Pengembangan Hotel & F&B Mendalam)
- [x] **Catering Massal (`/catering`)**: Porti Besar (1.000+ porsi), Contract Event, & Delivery Schedule.
- [x] **Dapur Restoran & Kitchen KDS (`/pos/kds`, `/pos/tables`)**: Visual Floor Plan, Table Layout, Split Bill, & KDS Timers.
- [x] **Hotel PMS (`/hotelier`)**: Guest Folio Billing, Night Audit Engine, Room Reservation, & Status Kamar Realtime.
- [x] **Retail Toko Roti & Minimarket Barcode POS (`/pos/cashier`)**: POS Barcode Scanner, Multi-Harga Eceran/Grosir, & Fast Checkout.
- [x] **Cold Storage FEFO & Expiry Tracking (`/inventory/warehouses`)**: Pelacakan batch & tanggal kadaluarsa bahan makanan basah di Cold Storage (-20°C).
- [x] **POS Blind Cash Audit Shift Closing (`/pos/cashier`)**: Penutupan shift kasir tanpa intip acuan sistem untuk cegah kebocoran kas.
- [x] **Sales & Marketing MICE Revenue Estimator (`/hotelier`, `/pos`)**: Rancangan Paket Menu Event/Banquet & Kalkulator Estimasi Revenue MICE.
- [x] **Housekeeping Laundry & Linen Management (`/hotelier`)**: Pelacakan Linen Sprei/Handuk, Seragam Uniform, & Nota Laundry Subcontract Eksternal.
- [x] **Driver Hotel & Airport Shuttle Dispatcher (`/hotelier`)**: Penugasan Driver Shuttle Bandara, Purchasing Support, & Pengantaran Laundry Eksternal.
- [x] **Daily Worker (DW) / Casual Staff Payroll (`/hrd`, `/catering`)**: Manajemen Pekerja Harian Lepas Banquet & Penggajian Harian Casual (`Daily Rate × Shift Hours`).
- [x] **Logistik Peralatan Banquet & Chafing Dish (`/catering`, `/inventory`)**: Surat Jalan Pengiriman Peralatan Piring, Sendok, Stove, & Chafing Dish dari Dapur Central.

### 🚚 FASE 2: Supply Chain, Remote Site Catering & Mining Camp Boss Management
- [x] **Supply Chain Logistics & Waybill**: Surat Jalan Pengiriman Bahan Baku dari Central Kitchen ke Site & Outlet.
- [x] **Field Kitchen / Mess Hall Supply**: Suplai makanan Catering Massal ke Mess Hall Pekerja Tambang.
- [x] **Mining Operations & Hauling Log (`/mining`)**: Tonnase Ore/Emas, Log Ritase Hauling Dump Truck, & Stripping Ratio.
- [x] **Heavy Fleet Fuel & KIR Maintenance (`/inventory/assets/maintenance`)**: Konsumsi BBM Solar HSD, Uji Berkala KIR Dishub, & QR Asset Tagging.
- [x] **Pelatihan & Lisensi SIO K3 (`/hrd/certifications`)**: Pelacakan Sertifikat POP/POM Mining & Hygiene Pangan Resto.
- [x] **Camp Boss Management & Kantin Karyawan (EDR) (`/catering`, `/mining`, `/hotelier`)**: Kantin Karyawan Hotel (EDR) & Mess Hall Tambang dengan Scan NIK Headcount Billing.

### 🏛️ FASE 3: Administrasi, General Affairs (GA) & Strategic Governance
- [x] **Super Admin Supreme Authority & Holding Creation (`/settings/organization-hierarchy`)**: Otoritas khusus Super Admin untuk menerbitkan Holding Enterprise & Holding Admin.
- [x] **Multi-Tenant Organizational Hierarchy (`/settings/organization-hierarchy`)**: Pengaturan hirarki `Holding ➔ Tenant ➔ Cabang/Site ➔ Departemen`.
- [x] **Matriks Kontrol Akses Tergranulasi & Template Role (`/settings/access-control`)**: Penetapan izin modul/widget berbasis Template Akses & Custom Rules per User.
- [x] **Pengaturan Parameter Dinamis (Zero Hardcode) (`/settings/parameters`)**: Manajemen Kategori & Tipe 100% dinamis tanpa hardcode.
- [x] **Universal `DynamicSearchFilter` UI Component (`DynamicSearchFilter.tsx`)**: Reusable UI Component Search Bar + Dropdown Kategori Dinamis.
- [x] **Executive HR-Finance Analytics (`/managerial/hr-finance-analytics`)**: Rasio Payroll-to-Revenue (%) & Revenue Per Employee.
- [x] **Finance Bank Reconciliation Auto-Match (`/finance/reconciliation`)**: Auto-matching mutasi CSV Internet Banking dengan GL Cashbook.
- [x] **HRD Mass Payroll Bank Transfer & WA Slip (`/hrd/payroll-disbursement`)**: Generator export BCA/Mandiri & distribusi slip gaji WA OpenClaw.
- [x] **Perjalanan Dinas & Per Diem Allowance (`/hrd/travel`)**: Penerbitan SPD, kalkulator uang saku harian, & settlement AP.
- [x] **Pajak e-SPT PPh 21 Coretax DJP (`/finance/tax-reports`)**: Export CSV Coretax & Form 1721-A1 massal.
- [x] **Kas Kecil Operasional Imprest System (`/finance/petty-cash`)**: Pencatatan kas kecil GA & replenishment ke GL.
- [x] **Administrasi Surat & Disposisi Digital (`/mail-management`)**: Registrasi Surat Masuk/Keluar & Disposisi Direksi.
- [x] **Legal DMS & Expiry Alert (`/managerial/dms`)**: Digital Vault Izin IUP, Halal BPOM, & STNK armada.
- [x] **Corporate Budgeting vs Actual (`/managerial/budgeting`)**: Alokasi anggaran per departemen vs realisasi kas.
- [x] **Auto-Numbering Matrix & Template Surat Resmi GA (`/mail-management`)**: Penomoran Surat Otomatis & Template SK/SPK/MOU 1-Klik.
- [x] **Permintaan ATK & Stok Opname GA Supplies (`/mail-management`)**: Requisition Form ATK & Stok Opname Lemari GA.
- [x] **Car Pool Booking & Log BBM/Tol Kendaraan Dinas GA (`/mail-management`, `/inventory/assets`)**: Booking Car Pool, Voucher BBM/Tol, & Penugasan Driver.
- [x] **Facility Management & Tracking APAR Expired GA (`/mail-management`)**: Servis AC Kantor, Log PLN/PDAM, & Alert Expired APAR/P3K.
- [x] **OpenClaw WA Interactive Approval Bot (`/ai`, `/chat`)**: Approval 1-Klik Cuti, PO Purchasing > 50jt, & Alert Kasir Variance via WA.
- [x] **Executive Boardroom Canvas & AI Advisor (`/managerial`)**: Dashboard Canvas Direksi Holding dengan Analisis Naratif AI Otomatis.
- [x] **QR Code Visitor Badge Gate Control (`/mail-management`, `/mining`)**: Gate Control QR Code Visitor Pass untuk Kontraktor & Tamu VIP.
- [x] **Generator e-Faktur PPN & e-Bupot PPh DJP Coretax (`/finance/tax-reports`)**: Export XML/CSV e-Faktur PPN & e-Bupot Coretax.

---

### 🏛️ FASE 4: Standard 5-Pillar Module Architecture Rollout (Arsitektur Modul Terstandarisasi)
> **Acuan Spesifikasi**: Read [`DOC/MODULE_5_PILLAR_ARCHITECTURE_SPEC.md`](file:///d:/DEVELOPMENT/ERP-Multi%20Tenants/DOC/MODULE_5_PILLAR_ARCHITECTURE_SPEC.md)

Setiap modul wajib memiliki 5 sub-modul terpisah: **1. Overview**, **2. Pekerjaan Harian (Operational Tasks)**, **3. Settings & Parameters**, **4. Laporan (Reports)**, **5. Audit Log**.

- [x] **Hotelier PMS (`/hotelier`)**: Refactor `HotelierRoomsView.tsx` (dibersihkan dari tab master tipe kamar) & buat `/hotelier/parameters`, `/hotelier/reports`, `/hotelier/audit-log`.
- [x] **Inventory & Logistics (`/inventory`)**: Buat `/inventory/parameters`, `/inventory/reports`, `/inventory/audit-log`.
- [x] **Procurement & Vendor (`/vendor`)**: Buat `/vendor/parameters`, `/vendor/reports`, `/vendor/audit-log`.
- [x] **Kasir & POS (`/pos`)**: Buat `/pos/parameters`, `/pos/reports`, `/pos/audit-log`.
- [x] **Operasional Tambang (`/mining`)**: Buat `/mining/parameters`, `/mining/reports`, `/mining/audit-log`.
- [x] **Catering Massal (`/catering`)**: Buat `/catering/parameters`, `/catering/reports`, `/catering/audit-log`.
- [x] **Manufaktur & Produksi (`/manufacturing`)**: Buat `/manufacturing/parameters`, `/manufacturing/reports`, `/manufacturing/audit-log`.
- [x] **HRD & Payroll (`/hrd`)**: Standarisasi `/hrd/parameters`, `/hrd/payroll` (Reports), `/hrd/audit-log`.
- [x] **Persuratan & GA (`/mail-management`)**: Buat `/mail-management/parameters`, `/mail-management/reports`, `/mail-management/audit-log`.
- [x] **CRM & Sales Pipeline (`/crm`)**: Buat `/crm/parameters`, `/crm/reports`, `/crm/audit-log`.
- [x] **Finance & Akuntansi (`/finance`)**: Standarisasi `/finance/overview`, `/finance/coa`, `/finance/reports`, `/finance/audit-log`.
- [x] **Pengaturan & Governance (`/settings`)**: Standarisasi `/settings/parameters`, `/settings/reports`, `/settings/audit-log`.
