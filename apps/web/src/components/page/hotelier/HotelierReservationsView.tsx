'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Search, BedDouble, UserCheck, CheckCircle2, Building2, Plus, ArrowRight, ShieldCheck, Tag, Star, DollarSign, Filter, Globe, Grid, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { TapeChartRoomRackTab } from './TapeChartRoomRackTab';
import { RatePlansManagementTab } from './RatePlansManagementTab';
import { StayPackagesTab } from './StayPackagesTab';
import { HotelRoomDetailModal } from './HotelRoomDetailModal';
import { HotelCheckInModal, CheckInDetails } from './HotelCheckInModal';
import { HotelCheckOutModal, CheckOutSettlement } from './HotelCheckOutModal';
import { HotelRoom } from '@/lib/mock/hotelier';

// Types
export type GuestSegmentType = 'GOVERNMENT' | 'WALK_IN' | 'OTA' | 'CORPORATE' | 'INTERNAL' | 'MICE';

export interface HotelReservationItem {
  resNumber: string;
  guestName: string;
  guestSegment: GuestSegmentType;
  linkedCrmCompany?: string; // Links to CRM B2B Account if Corporate/Govt/MICE
  roomType: string;
  assignedRoomNo?: string;
  checkInDate: string;
  checkOutDate: string;
  numNights: number;
  totalAmount: number;
  depositPaid: number;
  bookingChannel: string;
  status: 'RESERVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
}

export const HotelierReservationsView = () => {
  const [activeTab, setActiveTab] = useState<'BOOKING_ENGINE' | 'TAPE_CHART' | 'RESERVATIONS' | 'RATE_PLANS' | 'STAY_PACKAGES' | 'GUEST_SEGMENTS'>('BOOKING_ENGINE');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [selectedRes, setSelectedRes] = useState<HotelReservationItem | null>(null);
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<HotelRoom | null>(null);

  // Booking Engine Form State (Traveloka/Booking.com Style)
  const [checkInInput, setCheckInInput] = useState('2026-07-26');
  const [checkOutInput, setCheckOutInput] = useState('2026-07-28');
  const [selectedSegment, setSelectedSegment] = useState<GuestSegmentType>('CORPORATE');
  const [linkedCrmAccount, setLinkedCrmAccount] = useState('PT Freeport Supplier Partner');
  const [selectedPackage, setSelectedPackage] = useState('NONE');

  const packageOptions: SearchSelectOption[] = [
    { id: 'NONE', label: 'Tanpa Paket (Tarif Standar BAR)' },
    { id: 'PKG-HONEYMOON-VIP', label: 'Honeymoon Romantic Package (Rp 2.500.000/m)', subLabel: 'Inklusi: Dinner 2 Pax + Spa 60m + Shuttle', badge: 'VIP' },
    { id: 'PKG-MEET-STAY-B2B', label: 'Corporate Meeting & Stay (Rp 1.850.000/m)', subLabel: 'Inklusi: Fullboard Meals + Meeting Room 4h', badge: 'Corporate' },
    { id: 'PKG-FAMILY-WEEKEND', label: 'Weekend Family Fun Staycation (Rp 1.950.000/m)', subLabel: 'Inklusi: Breakfast 4 Pax + Kids Spa + Minibar', badge: 'Family' }
  ];

  const handleBookWithPackage = (roomType: string, basePrice: number) => {
    let finalPrice = basePrice * 2; // 2 nights
    let pkgName = 'Tarif Standar BAR';
    if (selectedPackage === 'PKG-HONEYMOON-VIP') {
      finalPrice = 2500000 * 2;
      pkgName = 'Honeymoon Romantic Package (Auto-Split COA: Kamar+F&B+Spa+Transport)';
    } else if (selectedPackage === 'PKG-MEET-STAY-B2B') {
      finalPrice = 1850000 * 2;
      pkgName = 'Corporate Meeting & Stay Package';
    } else if (selectedPackage === 'PKG-FAMILY-WEEKEND') {
      finalPrice = 1950000 * 2;
      pkgName = 'Weekend Family Fun Staycation';
    }

    const newResNumber = `RSV-2026-07-0${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: HotelReservationItem = {
      resNumber: newResNumber,
      guestName: selectedPackage !== 'NONE' ? 'Bpk. Dr. Syaiful Bahri (Paket VIP)' : 'Tamu Baru Booking Engine',
      guestSegment: selectedSegment,
      linkedCrmCompany: linkedCrmAccount,
      roomType: roomType,
      assignedRoomNo: 'RM-305',
      checkInDate: checkInInput,
      checkOutDate: checkOutInput,
      numNights: 2,
      totalAmount: finalPrice,
      depositPaid: finalPrice,
      bookingChannel: selectedPackage !== 'NONE' ? `Package: ${selectedPackage}` : 'Direct Booking Engine',
      status: 'RESERVED'
    };

    setReservations([newBooking, ...reservations]);
    alert(`Reservasi Berhasil Dibuat dengan Kode ${newResNumber}!\nPaket: ${pkgName}\nTotal Tagihan: Rp ${finalPrice.toLocaleString('id-ID')}\n(Revenue Breakdown Split Otomatis Terjadwal ke Finance COA Kamar, Resto, & Spa)`);
  };

  const [reservations, setReservations] = useState<HotelReservationItem[]>([
    { resNumber: 'RSV-2026-07-0091', guestName: 'Bpk. Ir. Hendra Wijaya', guestSegment: 'CORPORATE', linkedCrmCompany: 'PT Freeport Supplier Partner', roomType: 'Executive Suite', assignedRoomNo: 'RM-301', checkInDate: '2026-07-26', checkOutDate: '2026-07-29', numNights: 3, totalAmount: 3600000, depositPaid: 3600000, bookingChannel: 'Direct Corporate Sales', status: 'RESERVED' },
    { resNumber: 'RSV-2026-07-0088', guestName: 'Ibu Ratna Saraswati', guestSegment: 'GOVERNMENT', linkedCrmCompany: 'Kementerian ESDM RI', roomType: 'Grand Deluxe Twin', assignedRoomNo: 'RM-205', checkInDate: '2026-07-27', checkOutDate: '2026-07-30', numNights: 3, totalAmount: 2850000, depositPaid: 1500000, bookingChannel: 'Government Travel Order', status: 'RESERVED' },
    { resNumber: 'RSV-2026-07-0082', guestName: 'Mr. Johnathan Smith', guestSegment: 'OTA', roomType: 'Deluxe King Room', assignedRoomNo: 'RM-104', checkInDate: '2026-07-25', checkOutDate: '2026-07-27', numNights: 2, totalAmount: 1700000, depositPaid: 1700000, bookingChannel: 'Traveloka OTA API', status: 'CHECKED_IN' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const subTabs: SubTabItem[] = [
    { id: 'BOOKING_ENGINE', label: 'Pencarian Kamar', icon: Search },
    { id: 'RESERVATIONS', label: 'Daftar Reservasi', icon: Calendar, count: reservations.filter(r => r.status === 'RESERVED').length },
    { id: 'GUEST_SEGMENTS', label: 'Segmentasi Tamu', icon: Building2 }
  ];

  const segmentOptions: SearchSelectOption[] = [
    { id: 'ALL', label: 'Semua Segmentasi Tamu' },
    { id: 'GOVERNMENT', label: 'Government (Dinas / Instansi)' },
    { id: 'WALK_IN', label: 'Walk-In Guest (Tamu Front Desk)' },
    { id: 'OTA', label: 'OTA Channel' },
    { id: 'CORPORATE', label: 'Corporate B2B' },
    { id: 'INTERNAL', label: 'Internal Holding Group' },
    { id: 'MICE', label: 'MICE Event Group' }
  ];

  const crmAccountOptions: SearchSelectOption[] = [
    { id: 'PT Freeport Supplier Partner', label: 'PT Freeport Supplier Partner', subLabel: 'CRM B2B Account - Contract Rate 30%', badge: 'Corporate' },
    { id: 'Kementerian ESDM RI', label: 'Kementerian ESDM RI', subLabel: 'CRM Govt Account - DIPA Tax Exempt', badge: 'Government' },
    { id: 'PT Kalimantan Mining Resources', label: 'PT Kalimantan Mining Resources', subLabel: 'CRM B2B Account - TOP 60 Hari', badge: 'Corporate' },
    { id: 'Holding Enterprise Management', label: 'Holding Enterprise Management', subLabel: 'Internal Group Account', badge: 'Internal' }
  ];

  const [checkInRes, setCheckInRes] = useState<HotelReservationItem | null>(null);
  const [checkOutRes, setCheckOutRes] = useState<HotelReservationItem | null>(null);

  const handleConfirmCheckIn = (res: HotelReservationItem, details: CheckInDetails) => {
    setReservations(
      reservations.map((r) =>
        r.resNumber === res.resNumber
          ? { ...r, status: 'CHECKED_IN', assignedRoomNo: details.assignedRoomNo }
          : r
      )
    );
    alert(`Proses Check-In Resmi Sukses!\n\nTamu: ${res.guestName}\nKamar: ${details.assignedRoomNo}\nKTP/Paspor: ${details.idCardNumber}\nDeposit Jaminan: Rp ${details.securityDepositAmount.toLocaleString('id-ID')}\nStatus RFID: ${details.isKeycardRfidEncoded ? 'ENCODED' : 'NOT_ENCODED'}\n\nKamar Terisi & Folio Tagihan Aktif!`);
    setCheckInRes(null);
  };

  const handleConfirmCheckOut = (res: HotelReservationItem, settlement: CheckOutSettlement) => {
    setReservations(
      reservations.map((r) =>
        r.resNumber === res.resNumber ? { ...r, status: 'CHECKED_OUT' } : r
      )
    );
    alert(`Proses Express Checkout Sukses!\n\nTamu: ${res.guestName}\nKamar: ${res.assignedRoomNo || 'RM-101'}\nTotal Lunas: Rp ${settlement.grandTotalPaid.toLocaleString('id-ID')}\nRefund Deposit: Rp ${settlement.securityDepositRefund.toLocaleString('id-ID')}\n\nStatus Kamar di-set ke VACANT DIRTY (Petugas Housekeeping Di-Notifikasi)!`);
    setCheckOutRes(null);
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.resNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roomType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === 'ALL' || r.guestSegment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const reservationColumns: ColumnDef<HotelReservationItem>[] = [
    { key: 'resNumber', header: 'No. Kode Reservasi', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.resNumber },
    { key: 'guestName', header: 'Nama Lengkap Tamu', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.guestName },
    {
      key: 'guestSegment',
      header: 'Kategori Segmentasi',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.guestSegment === 'CORPORATE' ? 'bg-sky-500/10 text-sky-600 border border-sky-500/20' :
          i.guestSegment === 'GOVERNMENT' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
          i.guestSegment === 'OTA' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' : 'bg-slate-100 text-slate-600'
        }`}>
          {i.guestSegment}
        </span>
      )
    },
    { key: 'linkedCrmCompany', header: 'Perusahaan Sponsor CRM Sales', className: 'font-bold text-slate-700 dark:text-slate-300', render: (i) => i.linkedCrmCompany || 'Personal / Non-B2B' },
    { key: 'roomType', header: 'Tipe Kamar', render: (i) => i.roomType },
    { key: 'checkInDate', header: 'Periode Menginap', className: 'font-mono text-slate-500', render: (i) => `${i.checkInDate} s.d ${i.checkOutDate} (${i.numNights}m)` },
    { key: 'totalAmount', header: 'Total Tagihan (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.totalAmount.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status Reservasi',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'CHECKED_IN' ? 'bg-emerald-500/10 text-emerald-600' : i.status === 'RESERVED' ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-100 text-slate-600'
        }`}>
          {i.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi Check-In / Checkout',
      align: 'center',
      render: (i) => (
        i.status === 'RESERVED' ? (
          <button onClick={() => setCheckInRes(i)} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1 mx-auto cursor-pointer text-[10px] shadow-sm">
            <UserCheck className="w-3 h-3" />
            <span>Check-In</span>
          </button>
        ) : i.status === 'CHECKED_IN' ? (
          <button onClick={() => setCheckOutRes(i)} className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg flex items-center gap-1 mx-auto cursor-pointer text-[10px] shadow-sm">
            <UserCheck className="w-3 h-3" />
            <span>Checkout</span>
          </button>
        ) : (
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[10px] rounded font-bold">Checked-Out</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Reservasi Kamar"
        icon={BedDouble}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Reservasi Kamar & Tamu"
        glossaryItems={[
          { term: 'Segmentasi Tamu', description: 'Pengelompokan tipe tamu (Government, Walk-In, OTA, Corporate, Internal, MICE) untuk penentuan tarif spesial & termin tagihan.' },
          { term: 'CRM Sales Linkage', description: 'Menghubungkan reservasi tamu korporat/pemerintah dengan Master B2B Account di modul CRM Sales untuk billing AR perusahaan.' }
        ]}
        badges={[
          { label: `${reservations.length} Bookings`, variant: 'sky' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* SUBTAB 1: PENCARIAN KAMAR */}
      {activeTab === 'BOOKING_ENGINE' && (
        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl space-y-4 border border-sky-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-800/80 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <span>Pencarian Ketersediaan Kamar</span>
                </h3>
              </div>
              <span className="px-3 py-1 bg-sky-500/20 text-sky-300 font-mono font-bold text-xs rounded-xl border border-sky-500/30">
                Live Search
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-slate-900 dark:text-white">
              <div>
                <label className="block text-[10px] font-bold text-sky-300 mb-1">Tanggal Check-In</label>
                <input type="date" value={checkInInput} onChange={(e) => setCheckInInput(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-sky-300 mb-1">Tanggal Check-Out</label>
                <input type="date" value={checkOutInput} onChange={(e) => setCheckOutInput(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-sky-300 mb-1">Segmentasi Tamu Pemesan</label>
                <SearchableSelect
                  options={segmentOptions.filter(o => o.id !== 'ALL')}
                  value={selectedSegment}
                  onChange={(v) => setSelectedSegment(v as any)}
                  placeholder="Pilih Segmentasi..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-sky-300 mb-1">Link Sponsor CRM Sales</label>
                <SearchableSelect
                  options={crmAccountOptions}
                  value={linkedCrmAccount}
                  onChange={setLinkedCrmAccount}
                  placeholder="Pilih Customer CRM..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-purple-300 mb-1">Pilih Paket Menginap (Optional)</label>
                <SearchableSelect
                  options={packageOptions}
                  value={selectedPackage}
                  onChange={setSelectedPackage}
                  placeholder="Pilih Paket Menginap..."
                />
              </div>
            </div>
          </div>

          {/* Cards Catalogue Kamar Tersedia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-sky-500 transition-all overflow-hidden group">
              <div
                onClick={() => setSelectedRoomForModal({
                  id: 'rm-101',
                  roomNumber: '101',
                  type: 'Deluxe King Suite',
                  typeName: 'Deluxe King Suite (Kasur 1 King Bed)',
                  floor: 1,
                  status: 'VACANT_CLEAN',
                  ratePerNight: 850000,
                  imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
                  amenities: ['King Bed 180x200', 'Smart TV 55 Inch', 'WiFi 100Mbps', 'Espresso Machine', 'City View Balcony']
                })}
                className="h-36 rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80"
                  alt="Deluxe King Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm text-emerald-400 font-bold font-mono text-[10px] rounded-lg flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview Detail
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    onClick={() => setSelectedRoomForModal({
                      id: 'rm-101',
                      roomNumber: '101',
                      type: 'Deluxe King Suite',
                      typeName: 'Deluxe King Suite (Kasur 1 King Bed)',
                      floor: 1,
                      status: 'VACANT_CLEAN',
                      ratePerNight: 850000,
                      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
                      amenities: ['King Bed 180x200', 'Smart TV 55 Inch', 'WiFi 100Mbps', 'Espresso Machine', 'City View Balcony']
                    })}
                    className="font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:text-sky-600 transition-colors"
                  >
                    Deluxe King Room
                  </h4>
                  <p className="text-[10px] text-slate-400">Kasur King Bed, WiFi 100Mbps, City View</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 line-through">Rp 1.100.000</p>
                  <p className="font-mono font-extrabold text-sky-600 text-sm">
                    {selectedPackage !== 'NONE' ? (
                      selectedPackage === 'PKG-HONEYMOON-VIP' ? 'Rp 2.500.000 (Paket)' :
                      selectedPackage === 'PKG-MEET-STAY-B2B' ? 'Rp 1.850.000 (Paket)' : 'Rp 1.950.000 (Paket)'
                    ) : 'Rp 850.000'} <span className="text-[10px] text-slate-400 font-normal">/malam</span>
                  </p>
                </div>
                <button onClick={() => handleBookWithPackage('Deluxe King Room', 850000)} className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1">
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-sky-500 transition-all overflow-hidden group">
              <div
                onClick={() => setSelectedRoomForModal({
                  id: 'rm-201',
                  roomNumber: '201',
                  type: 'Executive Suite',
                  typeName: 'Executive Suite (BathTub & Living Room)',
                  floor: 2,
                  status: 'VACANT_CLEAN',
                  ratePerNight: 1200000,
                  imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
                  amenities: ['Jacuzzi Bathtub', 'Living Room Suite', 'Smart TV 65 Inch', 'Free Breakfast 2 Pax', 'Mini Bar']
                })}
                className="h-36 rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
                  alt="Executive Suite"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm text-emerald-400 font-bold font-mono text-[10px] rounded-lg flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview Detail
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    onClick={() => setSelectedRoomForModal({
                      id: 'rm-201',
                      roomNumber: '201',
                      type: 'Executive Suite',
                      typeName: 'Executive Suite (BathTub & Living Room)',
                      floor: 2,
                      status: 'VACANT_CLEAN',
                      ratePerNight: 1200000,
                      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
                      amenities: ['Jacuzzi Bathtub', 'Living Room Suite', 'Smart TV 65 Inch', 'Free Breakfast 2 Pax', 'Mini Bar']
                    })}
                    className="font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:text-sky-600 transition-colors"
                  >
                    Executive Suite
                  </h4>
                  <p className="text-[10px] text-slate-400">Living Room, Bathtub, Free Breakfast 2 Pax</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 line-through">Rp 1.500.000</p>
                  <p className="font-mono font-extrabold text-sky-600 text-sm">
                    {selectedPackage !== 'NONE' ? (
                      selectedPackage === 'PKG-HONEYMOON-VIP' ? 'Rp 2.500.000 (Paket)' :
                      selectedPackage === 'PKG-MEET-STAY-B2B' ? 'Rp 1.850.000 (Paket)' : 'Rp 1.950.000 (Paket)'
                    ) : 'Rp 1.200.000'} <span className="text-[10px] text-slate-400 font-normal">/malam</span>
                  </p>
                </div>
                <button onClick={() => handleBookWithPackage('Executive Suite', 1200000)} className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1">
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-sky-500 transition-all overflow-hidden group">
              <div
                onClick={() => setSelectedRoomForModal({
                  id: 'rm-104',
                  roomNumber: '104',
                  type: 'Grand Deluxe Twin',
                  typeName: 'Grand Deluxe Twin (Kasur 2 Single Beds)',
                  floor: 1,
                  status: 'VACANT_CLEAN',
                  ratePerNight: 950000,
                  imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
                  amenities: ['2 Single Beds 120x200', 'Smart TV 50 Inch', 'Mountain View', 'Work Desk']
                })}
                className="h-36 rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
                  alt="Grand Deluxe Twin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm text-emerald-400 font-bold font-mono text-[10px] rounded-lg flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview Detail
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    onClick={() => setSelectedRoomForModal({
                      id: 'rm-104',
                      roomNumber: '104',
                      type: 'Grand Deluxe Twin',
                      typeName: 'Grand Deluxe Twin (Kasur 2 Single Beds)',
                      floor: 1,
                      status: 'VACANT_CLEAN',
                      ratePerNight: 950000,
                      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
                      amenities: ['2 Single Beds 120x200', 'Smart TV 50 Inch', 'Mountain View', 'Work Desk']
                    })}
                    className="font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:text-sky-600 transition-colors"
                  >
                    Grand Deluxe Twin
                  </h4>
                  <p className="text-[10px] text-slate-400">2 Single Beds, Smart TV, Mountain View</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 line-through">Rp 1.250.000</p>
                  <p className="font-mono font-extrabold text-sky-600 text-sm">Rp 950.000 <span className="text-[10px] text-slate-400 font-normal">/malam</span></p>
                </div>
                <button onClick={() => handleBookWithPackage('Grand Deluxe Twin', 950000)} className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1">
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: RESERVATION REGISTER & CHECK-IN WORKFLOW */}
      {activeTab === 'RESERVATIONS' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-80">
              <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Filter Segmentasi Tamu:</label>
              <SearchableSelect
                options={segmentOptions}
                value={segmentFilter}
                onChange={setSegmentFilter}
                placeholder="Filter Segmentasi..."
              />
            </div>

            <div className="w-full md:w-96">
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Pencarian Universal Reservasi</label>
              <UniversalSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cari kode reservasi, nama tamu, atau tipe..."
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : (
            <DataTable
              headerTitle={`Register Reservasi & Pelanjutan Check-In (${filteredReservations.length})`}
              columns={reservationColumns}
              data={filteredReservations}
              keyExtractor={(i) => i.resNumber}
            />
          )}
        </div>
      )}

      {/* SUBTAB: TAPE CHART */}
      {activeTab === 'TAPE_CHART' && <TapeChartRoomRackTab />}

      {/* SUBTAB: RATE PLANS */}
      {activeTab === 'RATE_PLANS' && <RatePlansManagementTab />}

      {/* SUBTAB: STAY PACKAGES */}
      {activeTab === 'STAY_PACKAGES' && <StayPackagesTab />}

      {/* SUBTAB 3: GUEST SEGMENTS & CRM B2B LINKAGE */}
      {activeTab === 'GUEST_SEGMENTS' && (
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-500" />
              <span>Integrasi Arsitektur: CRM Sales B2B Account ➔ Hotel PMS Guest Profile</span>
            </h3>
            <p className="text-[11px] text-slate-400">Konstruksi relasi 1:N (One Customer B2B Account to Many Individual Guests)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-1">
              <span className="font-bold text-sky-700 dark:text-sky-300">1. Corporate & Government Contract Rate</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Sales Person menetapkan harga promo khusus korporat di CRM Sales, yang otomatis terbaca di Booking Engine Hotel.</p>
            </div>
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-300">2. Centralized Billing & Corporate Guarantee</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Tagihan menginap staf instansi langsung dialokasikan ke Piutang Dagang (AR Corporate Account) milik instansi sponsor.</p>
            </div>
            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-1">
              <span className="font-bold text-purple-700 dark:text-purple-300">3. Unified Loyalty & Stay History</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Rekam jejak menginap individual tamu tersimpan di Guest Database sekaligus memperkaya skor value B2B Client di CRM Sales.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation Check-In */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-500" />
                <span>Pelanjutan Registrasi Check-In Tamu</span>
              </h3>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Kode Reservasi:</span>
                <span className="font-mono font-bold text-sky-600">{selectedRes.resNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Tamu:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedRes.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kategori Segmentasi:</span>
                <span className="font-bold text-amber-600 font-mono">{selectedRes.guestSegment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sponsor CRM Sales:</span>
                <span className="font-bold text-sky-600">{selectedRes.linkedCrmCompany || 'Personal'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alokasi Kamar Fisik:</span>
                <span className="font-mono font-extrabold text-emerald-600 text-sm">{selectedRes.assignedRoomNo || 'RM-301'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setSelectedRes(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">
                Batal
              </button>
              <button onClick={() => { setCheckInRes(selectedRes); setSelectedRes(null); }} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Konfirmasi Check-In & Aktifkan Folio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Detail Modal Preview */}
      <HotelRoomDetailModal
        room={selectedRoomForModal}
        onClose={() => setSelectedRoomForModal(null)}
        onBookOrCheckin={(rm) => handleBookWithPackage(rm.typeName, rm.ratePerNight)}
      />

      {/* Front Desk Check-in Modal */}
      <HotelCheckInModal
        reservation={checkInRes}
        onClose={() => setCheckInRes(null)}
        onConfirmCheckIn={handleConfirmCheckIn}
      />

      {/* Front Desk Check-out Modal */}
      <HotelCheckOutModal
        reservation={checkOutRes}
        onClose={() => setCheckOutRes(null)}
        onConfirmCheckOut={handleConfirmCheckOut}
      />
    </div>
  );
};
