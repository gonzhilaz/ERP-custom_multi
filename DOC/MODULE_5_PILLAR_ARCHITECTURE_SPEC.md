# 🏛️ Standard 5-Pillar Module Architecture Specification

Dokumen ini berisi spesifikasi arsitektur acuan resmi **5-Pillar Module Standard** untuk seluruh modul di dalam **Enterprise Multi-Tenant ERP System**. Dokumen ini wajib dijadikan acuan utama oleh agen AI coding dan pengembang.

---

## 📐 PRINSIP UTAMA ARSITEKTUR 5 PILLAR

1. **Pemisahan Peran Operasional vs Administratif (Role Segregation)**:
   - **Staf Operasional (Kasir, Resepsionis, Housekeeper, Admin Gudang)**: Hanya melihat dan mengerjakan **Pekerjaan Harian Operasional** (Pillar 2). Tampilan UI bersih tanpa *tab* pembuatan tipe/kategori master data.
   - **Administrator & Management**: Mengelola **Settings & Parameters** (Pillar 3) untuk penerbitan master data (Tipe Kamar, Kategori Barang, Formula Gaji, Parameter Solar BBM, Tax Tariff).

2. **Hubungan Parameter Management & Dynamic Catalog Filters**:
   - Seluruh pilihan filter pada Halaman Utama Master Katalog (`/catalog`, `/items`, `/employees`, `/suppliers`, dll) **TIDAK BOLEH HARDCODED**.
   - Kategori, Tipe, Klasifikasi, dan Parameter yang tampil pada filter Katalog **WAJIB dikelola secara dinamis di bawah Halaman Aturan & Parameter (`/<module>/parameters/...`)**.

3. **Hirarki Sub-Kategori Modul Utama (Sidebar Grouping Governance)**:
   - Modul besar (seperti **Modul Inventory** & **Modul Logistik**) menaungi beberapa Sub-Kategori Utama.
   - Masing-masing sub-kategori memiliki struktur 5 Pilar Rute tersendiri yang dikelompokkan secara rapi dalam 1 Kategori Sidebar Utama.

4. **Setiap Modul Wajib Memiliki 5 Pilar Utama**:
   ```
   📂 MODUL (E.g. Finance / Inventory / Logistics / POS / HRD / Hotelier / Mining / Vendor / Catering)
     ├── 📊 1. OVERVIEW           (Executive KPI Dashboard & Visual Progress Bars)
     ├── 📋 2. PEKERJAAN HARIAN   (Operational Task Views - Clean, No Master Type Tabs)
     ├── ⚙️ 3. SETTINGS & PARAMS  (Dynamic Master Data, Rule Formulas, Tax Rules - Admin Restricted)
     ├── 📈 4. LAPORAN (REPORTS)  (Operational Reports & Export Summary Center)
     └── 📜 5. AUDIT LOG          (Jejak Audit Activity Log: Timestamp, User, Action, Entity ID, Details)
   ```

---

## 📑 MATRIKS MODUL EXPANSION & SUB-KATEGORI FUTURE-PROOF

### 🚛 1. Modul Logistik & Rental (`/logistics`)
- 📦 **Sub-Kategori A: Jasa Pengiriman & Ekspedisi Cargo (`/logistics/freight`)**
  - Overview: `/logistics/freight/overview` | Operational: `/logistics/freight/catalog` *(Waybill)*
  - Parameters: `/logistics/freight/parameters` (`/logistics/freight/parameters/zones`, `/logistics/freight/parameters/rates`)
  - Reports: `/logistics/freight/reports` | Audit Log: `/logistics/freight/audit-log`
- 🚚 **Sub-Kategori B: Rental Kendaraan Niaga & Penumpang (`/logistics/rentals`)**
  - Overview: `/logistics/rentals/overview` | Operational: `/logistics/rentals/catalog` *(Armada Rental)*
  - Parameters: `/logistics/rentals/parameters` (`/logistics/rentals/parameters/vehicle-type`, `/logistics/rentals/parameters/rates`)
  - Reports: `/logistics/rentals/reports` | Audit Log: `/logistics/rentals/audit-log`

### 🌴 2. Modul Kebun & Perkebunan (`/plantation`)
- Overview: `/plantation/overview` | Operational: `/plantation/harvest` *(Hasil Panen)*, `/plantation/plots` *(Blok Kebun)*
- Parameters: `/plantation/parameters` (`/plantation/parameters/crop-type`, `/plantation/parameters/fertilizer-rules`)
- Reports: `/plantation/reports` | Audit Log: `/plantation/audit-log`

### 💻 3. Modul Jasa IT & Solutions (`/it-services`)
- Overview: `/it-services/overview` | Operational: `/it-services/projects` *(Ticketing SLA & Deliverables)*
- Parameters: `/it-services/parameters` (`/it-services/parameters/sla-rules`, `/it-services/parameters/service-catalog`)
- Reports: `/it-services/reports` | Audit Log: `/it-services/audit-log`

### ⚖️ 4. Modul Jasa Konsultan (`/consulting`)
- Overview: `/consulting/overview` | Operational: `/consulting/projects` *(Client Engagements & Timesheet Billing)*
- Parameters: `/consulting/parameters` (`/consulting/parameters/billing-rates`, `/consulting/parameters/practice-areas`)
- Reports: `/consulting/reports` | Audit Log: `/consulting/audit-log`
