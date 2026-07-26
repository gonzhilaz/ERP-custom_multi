'use client';

import { useState, useEffect } from 'react';
import {
  MOCK_ATTENDANCES,
  MOCK_LEAVES,
  MOCK_REIMBURSEMENTS,
  MOCK_PAYSLIP,
  AttendanceRecord,
  LeaveRequest,
  ReimbursementClaim,
  EmployeePayslip
} from '@/lib/mock/ess';

export function useEss() {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [reimbursements, setReimbursements] = useState<ReimbursementClaim[]>(MOCK_REIMBURSEMENTS);
  const [payslip] = useState<EmployeePayslip>(MOCK_PAYSLIP);
  const [loading, setLoading] = useState(true);
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAttendances(MOCK_ATTENDANCES);
      setLeaves(MOCK_LEAVES);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const simulateFaceRecognitionClockIn = () => {
    setIsFaceScanning(true);
    setLastScanResult(null);

    setTimeout(() => {
      setIsFaceScanning(false);
      const matchScore = 98.8;
      setLastScanResult(`Presensi Wajah Berhasil! (Match Score: ${matchScore}%) — GPS Valid`);

      const newAtt: AttendanceRecord = {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        clockInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        method: 'WEBGL_FACE_RECOGNITION',
        faceMatchScore: matchScore,
        gpsLocation: 'Lokasi Anda (Validated)',
        status: 'PRESENT'
      };

      setAttendances((prev) => [newAtt, ...prev]);
    }, 2000);
  };

  const addLeaveRequest = (newLeave: Omit<LeaveRequest, 'id' | 'status'>) => {
    const item: LeaveRequest = {
      ...newLeave,
      id: `lv-${Date.now()}`,
      status: 'PENDING_SUPERVISOR'
    };
    setLeaves((prev) => [item, ...prev]);
  };

  const addReimbursementClaim = (newClaim: Omit<ReimbursementClaim, 'id' | 'claimCode' | 'status'>) => {
    const item: ReimbursementClaim = {
      ...newClaim,
      id: `rmb-${Date.now()}`,
      claimCode: `RMB-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING_SUPERVISOR'
    };
    setReimbursements((prev) => [item, ...prev]);
  };

  const approveLeaveBySupervisor = (id: string) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: 'PENDING_HRD', supervisorApprovalDate: new Date().toLocaleString() }
          : l
      )
    );
  };

  const approveLeaveByHrd = (id: string) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: 'APPROVED', hrdApprovalDate: new Date().toLocaleString() }
          : l
      )
    );
  };

  const rejectLeave = (id: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'REJECTED' } : l))
    );
  };

  const approveClaimBySupervisor = (id: string) => {
    setReimbursements((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'PENDING_HRD', supervisorApprovalDate: new Date().toLocaleString() }
          : c
      )
    );
  };

  const approveClaimByHrd = (id: string) => {
    setReimbursements((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'APPROVED', hrdApprovalDate: new Date().toLocaleString() }
          : c
      )
    );
  };

  const rejectClaim = (id: string) => {
    setReimbursements((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'REJECTED' } : c))
    );
  };

  return {
    attendances,
    leaves,
    reimbursements,
    payslip,
    loading,
    isFaceScanning,
    lastScanResult,
    simulateFaceRecognitionClockIn,
    addLeaveRequest,
    addReimbursementClaim,
    approveLeaveBySupervisor,
    approveLeaveByHrd,
    rejectLeave,
    approveClaimBySupervisor,
    approveClaimByHrd,
    rejectClaim
  };
}
