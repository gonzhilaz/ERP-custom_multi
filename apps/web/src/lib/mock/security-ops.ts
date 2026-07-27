export interface SecurityGateLog {
  id: string;
  passCode: string;
  vehiclePlate: string;
  driverName: string;
  visitorName?: string;
  purpose: string;
  passType: 'INBOUND_SUPPLIER' | 'OUTBOUND_HAULING' | 'VISITOR' | 'STAFF';
  branchLocation: string;
  gateOfficerName: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'INSIDE' | 'CHECKED_OUT';
  isDeleted?: boolean;
}

export interface SecurityIncidentReport {
  id: string;
  incidentCode: string;
  title: string;
  description: string;
  location: string;
  branchLocation: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  patrolOfficerName: string;
  status: 'REPORTED' | 'ESCALATED_TO_TICKET' | 'RESOLVED';
  linkedTicketCode?: string;
  createdAt: string;
  isDeleted?: boolean;
}

export const MOCK_SECURITY_GATE_LOGS: SecurityGateLog[] = [
  {
    id: 'gt-01',
    passCode: 'GATE-202607-089',
    vehiclePlate: 'B 9812 CTR',
    driverName: 'Sulaeman Delivery',
    visitorName: 'Tim Logistik Catering Freeport',
    purpose: 'Loading 1,500 Pax Catering Box Mess Karyawan Shift Pagi',
    passType: 'INBOUND_SUPPLIER',
    branchLocation: 'Head Office Jakarta & Central Kitchen',
    gateOfficerName: 'Danru Satpam Agus',
    checkInTime: '2026-07-27 05:30',
    checkOutTime: '2026-07-27 06:15',
    status: 'CHECKED_OUT'
  },
  {
    id: 'gt-02',
    passCode: 'GATE-202607-090',
    vehiclePlate: 'KT 8821 MIN',
    driverName: 'Agus Setiawan (Dump Truck Volvo FMX)',
    purpose: 'Outbound Hauling Ore Emas ke Stockpile Yard 2',
    passType: 'OUTBOUND_HAULING',
    branchLocation: 'Site East Borneo Facility (Berau)',
    gateOfficerName: 'Satpam Joko Guard Pos 1',
    checkInTime: '2026-07-27 08:10',
    status: 'INSIDE'
  },
  {
    id: 'gt-03',
    passCode: 'GATE-202607-091',
    vehiclePlate: 'B 1234 BKN',
    driverName: 'Bpk. Hendra Wijaya',
    visitorName: 'Tamu Check-In Kamar 101 Executive Suite',
    purpose: 'Menginap & Valet Parking Hotel',
    passType: 'VISITOR',
    branchLocation: 'Hotel Alam Pakuan (Bogor)',
    gateOfficerName: 'Satpam Rahmat Valet',
    checkInTime: '2026-07-26 14:00',
    status: 'INSIDE'
  }
];

export const MOCK_SECURITY_INCIDENTS: SecurityIncidentReport[] = [
  {
    id: 'inc-01',
    incidentCode: 'INC-202607-004',
    title: 'Kerusakan Kawat Pagar Pembatas Barat Site Pit Berau',
    description: 'Ditemukan kawat duri pagar pembatas patok 45 robek sepanjang 2 meter saat patroli shift malam pukul 03:00. Berpotensi dimasuki hewan liar atau warga tanpa izin.',
    location: 'Patok 45 Pagar Barat Pit Site',
    branchLocation: 'Site East Borneo Facility (Berau)',
    severity: 'HIGH',
    patrolOfficerName: 'Danru Patroli Joko',
    status: 'ESCALATED_TO_TICKET',
    linkedTicketCode: 'TCK-202607-004',
    createdAt: '2026-07-27 03:30'
  },
  {
    id: 'inc-02',
    incidentCode: 'INC-202607-005',
    title: 'Lampu Penerangan Pos 3 Mati Total (Sekering Short)',
    description: 'Lampu sorot LED 100W Pos 3 mati akibat korsleting saat hujan lebat. Membutuhkan penggantian sekering & bohlam baru.',
    location: 'Pos 3 Gate Loading Catering',
    branchLocation: 'Head Office Jakarta & Central Kitchen',
    severity: 'MEDIUM',
    patrolOfficerName: 'Satpam Herman Patroli',
    status: 'REPORTED',
    createdAt: '2026-07-27 07:15'
  }
];
