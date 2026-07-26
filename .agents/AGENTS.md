# Workspace Rules & Architectural Guidelines

## 1. File Size Limit
- Maximum **400 lines of code** per file. If a file exceeds or approaches this limit, it MUST be broken down into smaller sub-modules or hooks.

## 2. Modular Directory Structure (`apps/web/src/`)
- `/app/`: Next.js App Router pages with Route Group segregation:
  - `/app/login/`: Unauthenticated Login Page (clean layout without Sidebar/Header).
  - `/app/(authenticated)/`: Protected Route Group (enclosed with Sidebar & Header layout):
    - `/app/(authenticated)/page.tsx` (Dashboard Overview)
    - `/app/(authenticated)/finance/`
    - `/app/(authenticated)/inventory/`
    - `/app/(authenticated)/vendor/`
    - `/app/(authenticated)/hrd/`
    - `/app/(authenticated)/ess/`
    - `/app/(authenticated)/managerial/`
    - `/app/(authenticated)/pos/`
    - `/app/(authenticated)/hotelier/`
    - `/app/(authenticated)/chat/`
    - `/app/(authenticated)/ai/`
    - `/app/(authenticated)/system-health/`
- `/components/ui/`: Atomic and reusable UI elements grouped by type:
  - `/components/ui/button/`: Base buttons, icon buttons, animated buttons.
  - `/components/ui/badge/`: Badges and status pills.
  - `/components/ui/cards/`: KPI cards, feature cards, unit performance cards.
  - `/components/ui/loader/`: Loading spinners, skeleton loaders (`/components/ui/loader/skeleton`).
  - `/components/ui/tables/`: Reusable table components.
  - `/components/ui/dropdowns/`: Dropdowns, select boxes, tenant switcher dropdowns.
  - `/components/ui/forms/`: Form inputs, search bars, textareas.
  - `/components/ui/toggles/`: Theme toggles, feature switches.
  - `/components/ui/navigation/`: Navbar, Sidebar navigation components.
- `/components/page/`: Page-specific view components:
  - `/components/page/login/`: Login view components.
  - `/components/page/dashboard/`: Holding dashboard views.
  - `/components/page/finance/`: Financial management views.
  - `/components/page/chat/`: Real-time chat & voice mail views.
  - `/components/page/inventory/`: Inventory & warehouse management views.
  - `/components/page/vendor/`: Vendor & procurement views.
  - `/components/page/hrd/`: HRD & payroll views.
  - `/components/page/pos/`: POS cashier views.
- `/hooks/`: Custom React hooks separated by domain:
  - `/hooks/auth/useAuth.ts`
  - `/hooks/tenant/useTenant.ts`
  - `/hooks/finance/useFinance.ts`
  - `/hooks/inventory/useInventory.ts`
  - `/hooks/chat/useChat.ts`
- `/context/`: Global React Context providers (AuthContext, TenantContext, ThemeContext).
- `/lib/`: Utilities, constants, mock data, route definitions.

## 3. Mandatory Audit Logging & Soft-Delete Governance
- **Activity & CRUD Audit Logging**: All CRUD actions (Create, Edit, Delete) and major system activities MUST generate explicit **Audit Trail Logs** (recording Timestamp, User, Role, Action Type, Target Module/Entity ID, and Details).
- **Soft Delete Governance**: `DELETE` operations must NEVER permanently erase database records. They must set `isDeleted: true` / archived state to preserve historical audit trails and financial integrity.
- **Role-Restricted Edit & Delete**: `EDIT` and `DELETE` actions are strictly restricted to **IT, ADMIN, and TOP LEVEL MANAGEMENT** roles. Regular operational users cannot perform destructive mutations.
- **Zero Hardcoded Master Data**: Classifications (Worker Types, Payroll Formulas, Vendor Categories, Storage Types, Asset Types) must NOT be hardcoded. They must be user-configurable via dynamic CRUD management tables.

## 4. UI Design Rules & Universal Reusable Component Governance
- **Mandatory Universal Reusable UI Components**: ALL pages MUST prioritize standard components from `/components/ui/` (`/components/ui/button/`, `/components/ui/badge/`, `/components/ui/tables/`, `/components/ui/cards/`, etc.). Custom ad-hoc button/table elements are strictly forbidden unless a specialized component doesn't exist.
- **Button & Icon Governance (DILARANG DOUBLE ICON)**:
  - ❌ DILARANG menggunakan icon ganda / double plus pada tombol (contoh: Lucide `<Plus />` digabung dengan teks `+ Tambah` yang menghasilkan `+ + Tambah`).
  - ❌ DILARANG tombol dengan multiple icon berlebih (contoh: icon check circle + emoji roket pada satu button).
  - ✅ Gunakan tombol universal (`PrimaryButton`, `ActionButton`) atau `<span>Tambah</span>` tanpa karakter `+` manual jika tombol sudah ber-icon `<Plus />`.
- **Ultra-Clean & Concise Copywriting**: NO excessively long titles, wordy descriptions, tab headers, or cluttered button labels. Keep labels short and direct (e.g. `Auto-Post` instead of `Auto-Post Jurnal Penyusutan Serentak`).
- **Glossary Popover for Explanations**: Technical details and descriptions MUST be placed inside clean **Glossary Popover / Tooltip (`?` icon)** popups, NEVER inline in headers, tabs, or buttons.

## 5. Mandatory Overview Analytics, Charts, & Unit Business Intelligence
- **Module Overview Standard**: EVERY module's `Overview` page (Dashboard, Inventory Overview, Finance Overview, Procurement Overview, HRD Overview, ESS Overview, Hotelier Overview, Managerial Overview, Storage Overview, Asset Overview) MUST feature **Analytical Charts, Visual Progress Bars, Warning Banners, and Actionable Key Metrics**.
- **Business Unit Specific Intelligence**: The main Dashboard Overview (`/`) MUST dynamically tailor metrics, charts, analytical insights, and operational warnings specifically matched to the active **Unit Usaha / Tenant Domain** (Holding Enterprise, Mining Operations, Hotel PMS, Resto F&B, Retail Store).

## 6. Module & Sidebar Menu Naming Convention & Badge Governance
- **Nama Modul & Tab Harus Ringkas**: Nama modul, tab header, sidebar menu, dan page title wajib **singkat, langsung, dan mudah dipahami** (1-2 kata). Contoh:
  - ❌ SALAH: `Jadwal Kalkulasi & Auto-Post GL (4)` ➔ ✅ BENAR: `Jadwal`
  - ❌ SALAH: `Master Aturan Depresiasi PMK 72/2023 (5)` ➔ ✅ BENAR: `Aturan Pajak`
  - ❌ SALAH: `Catatan Audit & Kertas Kerja Fiskal (2)` ➔ ✅ BENAR: `Audit Log`
- **Sidebar Badge Rule (Hanya Notifikasi Perhatian)**:
  - ❌ DILARANG menampilkan badge label fitur / teknis (seperti `Auto-Post`, `Tax CRUD`, `PB1`, `COA Link`, `DeepSeek`) di sidebar menu.
  - ✅ Badge sidebar HANYA boleh digunakan sebagai **indikator notifikasi perhatian / tindakan user** (berwarna merah / warning dengan angka count).
- **Notifikasi Navigation Directive**: Setiap item notifikasi di header/navbar jika diklik HARUS langsung mengarahkan user ke halaman rute modul yang bersangkutan (`router.push(item.href)`).
- **Konsistensi Lintas Tenant**: Nama modul yang sama harus identik di seluruh 5 domain tenant (Holding, Retail, Resto, Hotel, Mining).

## 7. Strict Header & Title Governance (DILARANG JUDUL PANJANG & DILARANG DESKRIPSI INLINE)
- **Judul Halaman & Section Header Wajib Singkat (1-3 Kata)**:
  - ❌ SALAH: `Master Kategori Barang & Taksonomi Akuntansi (HO COA Mapping)` ➔ ✅ BENAR: `Kategori Barang`
  - ❌ SALAH: `Master Aturan Depresiasi Fiskal PMK 72/2023 & UU PPh` ➔ ✅ BENAR: `Aturan Pajak`
  - ❌ SALAH: `Catatan Audit & Kertas Kerja Fiskal` ➔ ✅ BENAR: `Audit Log`
  - ❌ SALAH: `Pusat Laporan Keuangan & Operasional Konsolidasi` ➔ ✅ BENAR: `Laporan Keuangan`
- **DILARANG Paragraf Deskripsi/Subtitle Inline Under Headers**:
  - ❌ DILARANG menaruh kalimat deskripsi/penjelasan di bawah judul halaman atau section header (contoh: `<p className="text-[11px]">Daftar akun COA disusun resmi oleh HO...</p>`).
  - ✅ WAJIB menggunakan komponen **Glossary Popover (`?` icon)** di sebelah judul jika ingin memberikan keterangan/penjelasan detail.
- **DILARANG Catatan Teknis dalam Kurung di Judul**:
  - ❌ DILARANG menyertakan teks teknis dalam kurung pada judul (seperti `(HO COA Mapping)`, `(PMK 72/2023)`, `(P&L & COGM)`).

## 8. Mandatory 5-Pillar Module Architecture
- **Every Module Must Implement 5 Pillars**:
  1. `Overview` (`/<module>/overview`)
  2. `Operational Tasks` (`/<module>/...`) — *Operational staff task views ONLY*.
  3. `Settings & Parameters` (`/<module>/parameters`) — *Dynamic master data creation, type/category management, tax rules, and formulas*.
  4. `Reports` (`/<module>/reports`) — *Operational & financial report center*.
  5. `Audit Log` (`/<module>/audit-log`) — *Explicit activity & soft delete log*.

## 9. Strict SubTab Operational Role Segregation (DILARANG TAB KATEGORI/TIPE DI HALAMAN OPERASIONAL)
- ❌ **DILARANG** menyertakan tab `Kelola Kategori`, `Tipe Kamar`, `Tipe Storage`, `Tipe Pekerja`, atau tab pembuatan master data di dalam SubTabNav halaman Pekerjaan Harian Staf Operasional.
- ✅ **SubTab Operational Views** HANYA boleh berisi workflow pekerjaan operasional staf (contoh: `Katalog Gudang`, `Tambah Baru`). Pembuatan Tipe/Kategori WAKTU & TEMPATNYA KHUSUS di Halaman `/parameters` (Settings & Parameters). Filter kategori barang/gudang di halaman operasional WAJIB menggunakan `DynamicSearchFilter` dropdown/buttons, BUKAN SubTabNav.

## 10. Mandatory Universal Searchable Select Dropdown Governance (DILARANG NATIVE HTML `<select>`)
- ❌ **DILARANG MENGGUNAKAN NATIVE HTML `<select>`** untuk pilihan master data di seluruh modul ERP (COA Akun, Kelompok Akun, Kategori Barang, Vendor, Tipe Kamar, Karyawan, Departemen, Gudang Storage).
- ✅ **WAJIB MENGGUNAKAN UNIVERSAL `SearchableSelect` / `CoaSearchSelect`**: Seluruh dropdown pilihan master data wajib menggunakan komponen pilihan ber-fitur live quick search input filter (`/components/ui/dropdowns/SearchableSelect.tsx`) agar mampu menangani data hingga ratusan ribu/jutaan baris dengan cepat dan responsif.

## 11. Mandatory Table Format Preference Over Card Grid
- ❌ **DILARANG MENGGUNAKAN CARD GRID / CARDS LIST** untuk menampilkan daftar data operasional di halaman detail/tabel (kecuali pada halaman Overview/Dashboard).
- ✅ **WAJIB MENGGUNAKAN REUSABLE DATA TABLE (`DataTable`)** untuk seluruh daftar transaksi dan master data di semua modul agar padat data, rapi, profesional, dan efisien.

## 12. Mandatory Table Features: Pagination, Quick Search, & Custom Dropdown Filter
- ❌ **DILARANG MENAMPILKAN TABEL POLOS** tanpa fitur pencarian, filter, atau pagination.
- ✅ **WAJIB MENGGUNAKAN DATATABLE LENGKAP**: Seluruh tabel wajib dilengkapi dengan:
  1. Live Search Bar (`UniversalSearchBar` / `DynamicSearchFilter`).
  2. Custom Dropdown Filter (`SearchableSelect` / Dropdown Filter Kategori/Status).
  3. Interactive Pagination (`DataTable` Pagination controls) untuk menangani hingga puluhan ribu baris data.

## 13. Mandatory Skeleton Loader Governance for Heavy Data
- ❌ **DILARANG MENAMPILKAN TAMPILAN KOSONG / BLANK SCREEN** saat data sedang dimuat.
- ✅ **WAJIB MENGGUNAKAN SKELETON LOADER (`/components/ui/loader/skeleton`)**: Seluruh tabel dan komponen data wajib menampilkan animasi Skeleton Loader saat loading state aktif demi kenyamanan UX pengguna enterprise.

