'use client';

import React, { useState } from 'react';
import { BedDouble, Plus } from 'lucide-react';
import { useHotelier } from '@/hooks/hotelier/useHotelier';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { RoomCatalogTab } from './rooms/RoomCatalogTab';
import { CreateRoomTab } from './rooms/CreateRoomTab';

export const HotelierRoomsView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    rooms,
    allRooms,
    roomTypes,
    addRoom,
    deleteRoom
  } = useHotelier();

  const occupiedCount = allRooms.filter((r) => r.status === 'OCCUPIED').length;
  const occupancyPct = allRooms.length > 0 ? Math.round((occupiedCount / allRooms.length) * 100) : 0;

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog', icon: BedDouble },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Kamar Hotel"
        icon={BedDouble}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Kamar Hotel"
        glossaryItems={[
          { term: 'Room Directory', description: 'Pengelolaan unit kamar hotel operasional harian.' }
        ]}
        badges={[
          { label: `${allRooms.length} Unit Kamar`, variant: 'slate' },
          { label: `Okupansi: ${occupancyPct}%`, variant: 'amber' }
        ]}
      />

      {/* SubTabNav Component */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="amber"
      />

      {/* Sub-Tab Content Rendering */}
      {activeTab === 'CATALOG' && (
        <RoomCatalogTab
          rooms={rooms}
          roomTypes={roomTypes}
          deleteRoom={deleteRoom}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateRoomTab
          roomTypes={roomTypes}
          addRoom={addRoom}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
