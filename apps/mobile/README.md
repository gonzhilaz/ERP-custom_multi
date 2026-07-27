# Mobile Application Blueprint (`apps/mobile/`) - React Native (Expo / Bare)

Dokumen arsitektur dan struktur monorepo untuk aplikasi mobile Android & iOS khusus karyawan **Holding Multi-Tenant ERP System**.

---

## 1. Lingkup Modul Utama Mobile App

1. **ESS Mobile (Employee Self-Service)**:
   - **Absensi Dynamic QR Scanner**: Pemindaian QR Code dari layar Tablet HRD (Rotasi 15 Detik).
   - **In-House Face Recognition Selfie**: Pengambilan foto swafoto dengan verifikasi biometrik internal tanpa SDK pihak ketiga.
   - **Strict Geofencing <= 5.0m**: Penguncian lokasi presisi tinggi berbasis GPS Haversine.
   - **Pengajuan & Approval SPPD**: Permohonan & persetujuan Surat Perintah Perjalanan Dinas (SPPD) keluar cabang.

2. **POS Mobile (Point of Sale Kasir)**:
   - Kasir portabel untuk Restoran, Bakery, Hotel, dan Retail Store.
   - Pencetakan Struk Thermal via **Bluetooth Thermal Printer**.
   - Mode Transaksi Offline-First dengan Auto-Sync saat koneksi internet pulih.

3. **CRM Field Sales Mobile**:
   - Check-in lokasi kunjungan prospek/klien enterprise.
   - Log hasil meeting, foto bukti kunjungan site, & pembaruan status pipeline deals.

4. **Driver & Sales Tracking Service**:
   - **Background Location Engine**: Perekaman koordinat GPS secara berkala saat pengiriman armada barang/catering & rute sales.

---

## 2. Struktur Direktori Kode (`apps/mobile/src/`)

```
apps/mobile/
├── package.json
├── app.json (Expo Config)
├── tsconfig.json
├── src/
│   ├── api/
│   │   ├── client.ts           # Axios / Fetch client ke API Gateway Next.js/Express
│   │   └── endpoints/
│   ├── components/
│   │   ├── ui/                 # Reusable React Native UI Components (Button, Card, Input)
│   │   ├── camera/             # Camera & Face Frame Overlay
│   │   └── qr/                 # QR Code Scanner Component
│   ├── modules/
│   │   ├── ess/
│   │   │   ├── screens/        # AttendanceScreen, SppdListScreen, SppdDetailScreen
│   │   │   └── hooks/
│   │   ├── pos/
│   │   │   ├── screens/        # CashierScreen, ReceiptPrintScreen
│   │   │   └── services/       # BluetoothPrinterService.ts
│   │   ├── crm/
│   │   │   └── screens/        # ClientCheckinScreen, PipelineScreen
│   │   └── tracking/
│   │       └── services/       # BackgroundGeofenceTask.ts
│   ├── store/                  # Zustand / Redux Toolkit global state
│   └── utils/
│       ├── geofence.ts         # Distance calculation <= 5.0 meters
│       └── dynamicQr.ts        # TOTP QR verification helper
```

---

## 3. Library & Dependencies yang Digunakan
- **Core Framework**: React Native 0.76+ dengan Expo SDK 52
- **Navigation**: `@react-navigation/native` & `@react-navigation/bottom-tabs`
- **Camera & Scanner**: `expo-camera` & `expo-barcode-scanner`
- **Location & Geofencing**: `expo-location` & `expo-task-manager`
- **Hardware Integration**: `react-native-bluetooth-escpos-printer` (Printer Struk Kasir)
