'use client';

import { useState } from 'react';
import { MOCK_HOTEL_ROOMS, MOCK_ROOM_TYPES, HotelRoom, RoomTypeCategory } from '@/lib/mock/hotelier';

export function useHotelier() {
  const [rooms, setRooms] = useState<HotelRoom[]>(MOCK_HOTEL_ROOMS);
  const [roomTypes, setRoomTypes] = useState<RoomTypeCategory[]>(MOCK_ROOM_TYPES);
  const [selectedFloor, setSelectedFloor] = useState<number>(0); // 0 = ALL

  const addRoom = (newRoom: Omit<HotelRoom, 'id'>) => {
    const created: HotelRoom = {
      ...newRoom,
      id: `room-${Date.now()}`
    };
    setRooms((prev) => [created, ...prev]);
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const addRoomType = (newType: Omit<RoomTypeCategory, 'id' | 'roomCount'>) => {
    const created: RoomTypeCategory = {
      ...newType,
      id: `rtype-${Date.now()}`,
      roomCount: 0
    };
    setRoomTypes((prev) => [created, ...prev]);
  };

  const updateRoomType = (id: string, updatedType: Partial<RoomTypeCategory>) => {
    setRoomTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedType } : t))
    );
  };

  const deleteRoomType = (id: string) => {
    setRoomTypes((prev) => prev.filter((t) => t.id !== id));
  };

  const checkInGuest = (roomId: string, guestName: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, status: 'OCCUPIED', guestName } : r
      )
    );
  };

  const markClean = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, status: 'VACANT_CLEAN' } : r
      )
    );
  };

  const filteredRooms = rooms.filter((r) => {
    if (selectedFloor !== 0 && r.floor !== selectedFloor) return false;
    return true;
  });

  return {
    rooms: filteredRooms,
    allRooms: rooms,
    roomTypes,
    selectedFloor,
    setSelectedFloor,
    addRoom,
    deleteRoom,
    addRoomType,
    updateRoomType,
    deleteRoomType,
    checkInGuest,
    markClean
  };
}
