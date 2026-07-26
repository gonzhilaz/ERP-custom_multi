import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const STANDARDIZED_COA = [
  { code: '100-01-001', name: 'Kas Utama (IDR)', type: 'ASSET', balance: 450000000, currency: 'IDR' },
  { code: '100-01-002', name: 'Kas Operasional USD', type: 'ASSET', balance: 25000, currency: 'USD' },
  { code: '110-01-001', name: 'Bank Mandiri Utama', type: 'ASSET', balance: 1250000000, currency: 'IDR' },
  { code: '120-01-001', name: 'Piutang Usaha (Account Receivable)', type: 'ASSET', balance: 340000000, currency: 'IDR' },
  { code: '130-01-001', name: 'Persediaan Bahan Baku / Barang', type: 'ASSET', balance: 680000000, currency: 'IDR' },
  { code: '200-01-001', name: 'Utang Usaha (Account Payable)', type: 'LIABILITY', balance: 210000000, currency: 'IDR' },
  { code: '210-01-001', name: 'Utang Pajak PPN & PPh 21', type: 'LIABILITY', balance: 45000000, currency: 'IDR' },
  { code: '300-01-001', name: 'Modal Disetor Holding', type: 'EQUITY', balance: 2000000000, currency: 'IDR' },
  { code: '400-01-001', name: 'Pendapatan Penjualan Utama', type: 'REVENUE', balance: 890000000, currency: 'IDR' },
  { code: '410-01-001', name: 'Pendapatan Inter-Company (Holding)', type: 'REVENUE', balance: 120000000, currency: 'IDR' },
  { code: '500-01-001', name: 'Beban Pokok Penjualan (HPP)', type: 'EXPENSE', balance: 380000000, currency: 'IDR' },
  { code: '510-01-001', name: 'Beban Gaji & Payroll Karyawan', type: 'EXPENSE', balance: 195000000, currency: 'IDR' },
];

const MOCK_JOURNALS = [
  {
    id: 'jv-001',
    journalNumber: 'JV/2026/07/0001',
    date: '2026-07-20',
    reference: 'PO-2026-CATERING-88',
    description: 'Pembelian Bahan Makanan Inter-company Catering ke Retail Group',
    status: 'POSTED',
    debitTotal: 45000000,
    creditTotal: 45000000,
    lines: [
      { accountCode: '130-01-001', accountName: 'Persediaan Bahan Baku', debit: 45000000, credit: 0 },
      { accountCode: '200-01-001', accountName: 'Utang Usaha Inter-company', debit: 0, credit: 45000000 }
    ]
  }
];

// GET /api/finance/coa
router.get('/coa', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: STANDARDIZED_COA
  });
});

// GET /api/finance/journals
router.get('/journals', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: MOCK_JOURNALS
  });
});

// POST /api/finance/journals
router.post('/journals', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { date, reference, description, lines } = req.body;

  const newJournal = {
    id: `jv-${Date.now()}`,
    journalNumber: `JV/2026/07/${Math.floor(1000 + Math.random() * 9000)}`,
    date: date || new Date().toISOString().split('T')[0],
    reference,
    description,
    status: 'POSTED',
    debitTotal: lines.reduce((acc: number, l: any) => acc + (Number(l.debit) || 0), 0),
    creditTotal: lines.reduce((acc: number, l: any) => acc + (Number(l.credit) || 0), 0),
    lines
  };

  MOCK_JOURNALS.unshift(newJournal);

  return res.json({
    success: true,
    message: 'Jurnal transaksi berhasil dicatat',
    data: newJournal
  });
});

export default router;
