# Enterprise Multi-Tenant ERP System (Holding Company Ecosystem)

Sistem ERP Multi-Tenant Enterprise terintegrasi untuk **Holding Company** yang membawahi unit usaha multisektor: **Restoran & Catering**, **Pertambangan Emas**, **Hotelier & Hospitality**, dan **Retail Chain**.

---

## 🛠️ Tech Stack Utama

- **Frontend ERP Web Dashboard**: Next.js Latest (`v16.2.11` Turbopack), React 19, Tailwind CSS, Lucide Icons.
- **Backend API Server**: Express.js, TypeScript, Socket.io WebSockets, JWT Authentication.
- **Database & ORM**: PostgreSQL dengan Prisma ORM (**Dynamic Database-per-Tenant** + Central Master Holding DB).
- **AI Automation**: OpenClaw + DeepSeek Lite Engine (WhatsApp Executive Bot, Document OCR Invoice Scanner, IT Log Diagnostics).
- **Mobile Front-Line Ecosystem**: POS Touchscreen Cashier (FnB/Retail) & Hotelier Property Management System (PMS).

---

## 📁 Struktur Monorepo (`workspaces`)

```text
ERP-Multi Tenants/
├── apps/
│   ├── web/                    # Next.js 16 Web Dashboard (14 Static Routes)
│   └── api/                    # Express API Backend + Socket.io Server (Port 5000)
├── packages/
│   ├── database/               # Prisma Schemas (master.prisma & tenant.prisma) + Seed Script
│   └── shared-types/           # Shared TypeScript Interfaces & DTOs
├── .agents/                    # Workspace Rules & Architectural Guidelines
├── docker-compose.yml          # Production Docker Container Orchestration
└── .env.example                # Template Environment Variables
```

---

## 🚀 Panduan Memulai (Development Setup)

### 1. Install Dependensi Monorepo
```bash
npm install
```

### 2. Generate Prisma Clients & Build Shared Packages
```bash
npm run db:generate --workspace=packages/database
npm run build --workspace=packages/shared-types
npm run build --workspace=packages/database
```

### 3. Jalankan Database Seeder (Opsional)
```bash
npm run seed --workspace=packages/database
```

### 4. Jalankan Server lokal (API & Web)
- **API Server** (Port 5000):
  ```bash
  npm run dev:api
  ```
- **Next.js Web Dashboard** (Port 3000):
  ```bash
  npm run dev:web
  ```

---

## 🌐 Rute Halaman Dashboard ERP (`apps/web`)

| Rute Halaman | Deskripsi Modul |
| :--- | :--- |
| `/` | **Executive Holding Dashboard** (Omset, Beban, Laba Konsolidasi, Cards Performa Unit) |
| `/finance` | **Finance & Standardized COA** (Multi-Currency IDR/USD & Inter-Company Elimination) |
| `/inventory` | **Multi-Warehouse Inventory** (FIFO/Average, UOM, Re-Order Stok Minimum Warning) |
| `/vendor` | **Tiered Vendor Procurement** (PO Approval Workflow > 50 Juta ACC Direktur) |
| `/hrd` | **HRD & Payroll Engine** (Multi-Gaji: Bulanan, Harian Tambang, Borongan + PPh 21 TER) |
| `/ess` | **Employee Self Service** (Presensi Selfie WebGL Face Vector & GPS Geolocation) |
| `/managerial` | **Manajerial & Budgeting** (Alokasi Budget vs Actual & DMS Legalitas Usaha) |
| `/pos` | **POS Touchscreen Cashier** (FnB/Retail Touchscreen & Receipt Printer Bluetooth) |
| `/hotelier` | **Hotel Property Management System** (Visual Room Grid & Housekeeping Status) |
| `/chat` | **Internal Collaboration Chat** (Real-time WebSockets, Berkas, & Simulator Voice Mail) |
| `/ai` | **OpenClaw + DeepSeek AI Engine** (WhatsApp Executive Bot & Invoice OCR Scanner) |
| `/system-health` | **System Health & Security** (Dynamic DB Pool Latency & Security Audit Logs) |

---

## 🛡️ Lisensi & Hak Cipta
Hak Cipta © 2026 Nusantara Enterprise Holding Group. All Rights Reserved.
