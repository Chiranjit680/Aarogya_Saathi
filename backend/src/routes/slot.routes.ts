import { Router } from 'express';
import { 
  createSlot, 
  getAvailableSlots, 
  getDoctorSlots, 
  updateSlot, 
  deleteSlot 
} from '../controllers/slot.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

// POST /api/slots
router.post('/', authenticate, requireRole(['DOCTOR']), createSlot);

// GET /api/slots
router.get('/', getAvailableSlots);

// GET /api/slots/doctor/:doctorId
router.get('/doctor/:doctorId', getDoctorSlots);

// PUT /api/slots/:id
router.put('/:id', authenticate, requireRole(['DOCTOR']), updateSlot);

// DELETE /api/slots/:id
router.delete('/:id', authenticate, requireRole(['DOCTOR']), deleteSlot);

export default router;