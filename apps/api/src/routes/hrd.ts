import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_EMPLOYEES = [
  {
    id: 'emp-001',
    nik: 'NIK-HOLDING-001',
    fullName: 'Budi Santoso',
    department: 'Executive Board',
    unitUsaha: 'Holding Central',
    role: 'Holding Executive',
    salaryType: 'MONTHLY',
    baseSalary: 35000000,
    bpjsKesehatan: 350000,
    bpjsKetenagakerjaan: 700000,
    pph21Rate: 9.0,
    netSalary: 30800000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-002',
    nik: 'NIK-MINE-088',
    fullName: 'Rudi Hermawan',
    department: 'Mining Operations & Heavy Equip',
    unitUsaha: 'PT Borneo Mining Emas',
    role: 'Operator CAT 777',
    salaryType: 'DAILY',
    baseSalary: 450000,
    bpjsKesehatan: 45000,
    bpjsKetenagakerjaan: 90000,
    pph21Rate: 2.5,
    netSalary: 10800000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-003',
    nik: 'NIK-FNB-014',
    fullName: 'Dewi Lestari',
    department: 'Kitchen & Catering Operations',
    unitUsaha: 'Nusantara Culinary & Catering',
    role: 'Head Catering Chef',
    salaryType: 'PIECEWORK_COMMISSION',
    baseSalary: 8500000,
    bpjsKesehatan: 85000,
    bpjsKetenagakerjaan: 170000,
    pph21Rate: 4.0,
    netSalary: 14200000,
    status: 'ACTIVE'
  }
];

// GET /api/hrd/employees
router.get('/employees', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_EMPLOYEES });
});

export default router;
