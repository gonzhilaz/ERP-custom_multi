'use client';

import { useState, useEffect, useRef } from 'react';

export interface GpsLocationPoint {
  latitude: number;
  longitude: number;
  accuracyMeter: number;
  speedKmH: number;
  headingDegree: number | null;
  timestamp: number;
}

export function useBrowserGpsTracker(isTrackingActive: boolean = false, updateIntervalSec: number = 10) {
  const [currentLocation, setCurrentLocation] = useState<GpsLocationPoint | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isWakeLockActive, setIsWakeLockActive] = useState<boolean>(false);

  const watchIdRef = useRef<number | null>(null);
  const wakeLockRef = useRef<any>(null);

  // 1. Request Screen Wake Lock (Mencegah layar HP sleep saat tracking aktif)
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        const wakeLock = await (navigator as any).wakeLock.request('screen');
        wakeLockRef.current = wakeLock;
        setIsWakeLockActive(true);
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsWakeLockActive(false);
      } catch (err) {
        console.warn('Wake Lock release error:', err);
      }
    }
  };

  // 2. Start HTML5 Geolocation Watcher (Compatible across iOS Safari & Android Chrome)
  useEffect(() => {
    if (!isTrackingActive) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      releaseWakeLock();
      return;
    }

    if (!('geolocation' in navigator)) {
      setGpsError('Browser HP Anda tidak mendukung HTML5 Geolocation API.');
      return;
    }

    requestWakeLock();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const speed = position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0;
        const point: GpsLocationPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeter: Math.round(position.coords.accuracy * 10) / 10,
          speedKmH: speed,
          headingDegree: position.coords.heading,
          timestamp: position.timestamp
        };
        setCurrentLocation(point);
        setGpsError(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Izin GPS ditolak oleh pengguna pada Browser HP.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('Sinyal GPS HP tidak tersedia / tidak presisi.');
            break;
          case error.TIMEOUT:
            setGpsError('Waktu permintaan sinyal GPS habis (Timeout).');
            break;
          default:
            setGpsError('Terjadi kesalahan GPS Browser.');
        }
      },
      {
        enableHighAccuracy: true, // Pakai Hardware GPS Chips di Android & iPhone
        timeout: 15000,
        maximumAge: 0
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      releaseWakeLock();
    };
  }, [isTrackingActive]);

  return {
    currentLocation,
    gpsError,
    isWakeLockActive
  };
}
