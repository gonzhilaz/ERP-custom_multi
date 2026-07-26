import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_ATTENDANCE_LOGS = [
  {
    id: 'att-101',
    date: '2026-07-23',
    clockInTime: '07:54:12',
    method: 'WEBGL_FACE_RECOGNITION',
    faceMatchScore: 99.2,
    gpsLocation: 'HQ Nusantara Group (-6.208, 106.845)',
    status: 'PRESENT'
  },
  {
    id: 'att-102',
    date: '2026-07-23',
    clockInTime: '06:45:00',
    method: 'PHYSICAL_BIOMETRIC_PUSH',
    faceMatchScore: 100,
    gpsLocation: 'Site Tambang Gold-01 (-0.923, 116.821)',
    status: 'PRESENT'
  }
];

// GET /api/ess/attendances
router.get('/attendances', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_ATTENDANCE_LOGS });
});

// POST /api/ess/clock-in
router.post('/clock-in', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { faceVector, gpsCoordinates } = req.body;

  const newLog = {
    id: `att-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    clockInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    method: 'WEBGL_FACE_RECOGNITION',
    faceMatchScore: 98.9,
    gpsLocation: gpsCoordinates || 'Lokasi Validated',
    status: 'PRESENT'
  };

  MOCK_ATTENDANCE_LOGS.unshift(newLog);

  return res.json({
    success: true,
    message: 'Presensi wajah & GPS berhasil diverifikasi',
    data: newLog
  });
});

export default router;
