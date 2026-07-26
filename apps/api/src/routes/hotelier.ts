import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_HOTEL_ROOMS = [
  { id: 'room-101', roomNumber: '101', type: 'EXECUTIVE_KING', ratePerNight: 1250000, status: 'OCCUPIED', guestName: 'Bapak Ahmad Subagyo' },
  { id: 'room-102', roomNumber: '102', type: 'DELUXE_SUITE', ratePerNight: 2100000, status: 'VACANT_CLEAN' },
  { id: 'room-103', roomNumber: '103', type: 'STANDARD_TWIN', ratePerNight: 850000, status: 'VACANT_DIRTY' }
];

// GET /api/hotelier/rooms
router.get('/rooms', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_HOTEL_ROOMS });
});

export default router;
