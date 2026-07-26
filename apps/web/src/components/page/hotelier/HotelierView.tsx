'use client';

import React, { useState } from 'react';
import { Building, BedDouble, Users, Moon, Calendar, Search, Shirt, Package, KeyRound, Heart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { HotelierReservationsView } from './HotelierReservationsView';
import { HotelierGuestDatabaseView } from './HotelierGuestDatabaseView';
import { HotelierNightAuditView } from './HotelierNightAuditView';
import { HotelierGuestInHouseView } from './HotelierGuestInHouseView';
import { HotelierLaundryView } from './HotelierLaundryView';
import { LostAndFoundTab } from './LostAndFoundTab';
import { SelfCheckinKioskTab } from './SelfCheckinKioskTab';
import { SpaWellnessTab } from './SpaWellnessTab';

export const HotelierView = () => {
  const [activeTab, setActiveTab] = useState<'BOOKING_RESERVATIONS' | 'SELF_CHECKIN' | 'GUEST_IN_HOUSE' | 'GUEST_DATABASE' | 'LAUNDRY' | 'SPA_WELLNESS' | 'LOST_FOUND' | 'NIGHT_AUDIT'>('BOOKING_RESERVATIONS');

  const subTabs: SubTabItem[] = [
    { id: 'BOOKING_RESERVATIONS', label: 'Reservasi Kamar', icon: Calendar },
    { id: 'SELF_CHECKIN', label: 'Self Check-In Kiosk', icon: KeyRound },
    { id: 'GUEST_IN_HOUSE', label: 'Guest In-House', icon: BedDouble },
    { id: 'GUEST_DATABASE', label: 'Database Tamu', icon: Users },
    { id: 'LAUNDRY', label: 'Operasi Laundry', icon: Shirt },
    { id: 'SPA_WELLNESS', label: 'Spa & Wellness', icon: Heart },
    { id: 'LOST_FOUND', label: 'Lost & Found', icon: Package },
    { id: 'NIGHT_AUDIT', label: 'Night Audit', icon: Moon }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasi Hotel & PMS"
        icon={Building}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Hotel PMS Suite"
        glossaryItems={[
          { term: 'Booking Engine', description: 'Mesin pencarian ketersediaan kamar real-time dan reservasi tamu.' },
          { term: 'Guest Segment', description: 'Klasifikasi tipe tamu (Government, Walk-In, OTA, Corporate, Internal, MICE).' },
          { term: 'Night Audit Rollover', description: 'Audit otomatis penutupan hari bisnis perhotelan & posting GL.' }
        ]}
        badges={[
          { label: 'Hotel PMS Active', variant: 'sky' },
          { label: 'Night Audit Ready', variant: 'emerald' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {activeTab === 'BOOKING_RESERVATIONS' && <HotelierReservationsView />}
      {activeTab === 'SELF_CHECKIN' && <SelfCheckinKioskTab />}
      {activeTab === 'GUEST_IN_HOUSE' && <HotelierGuestInHouseView />}
      {activeTab === 'GUEST_DATABASE' && <HotelierGuestDatabaseView />}
      {activeTab === 'LAUNDRY' && <HotelierLaundryView />}
      {activeTab === 'SPA_WELLNESS' && <SpaWellnessTab />}
      {activeTab === 'LOST_FOUND' && <LostAndFoundTab />}
      {activeTab === 'NIGHT_AUDIT' && <HotelierNightAuditView />}
    </div>
  );
};
