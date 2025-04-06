import { Router } from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getAppointmentById, 
  updateAppointment, 
  deleteAppointment, 
  addPrescription,
  getAppointmentsByDoctorId
} from '../controllers/appointment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// POST /api/appointments
router.post('/', authenticate, createAppointment);

// GET /api/appointments
router.get('/', authenticate, getAppointments);


// GET /api/appointments/doctor/:doctorId
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);


// GET /api/appointments/:id
router.get('/:id', authenticate, getAppointmentById);

// PUT /api/appointments/:id
router.put('/:id', authenticate, updateAppointment);

// DELETE /api/appointments/:id
router.delete('/:id', authenticate, deleteAppointment);

// // POST /api/appointments/:id/prescription
// router.post('/:id/prescription', authenticate, addPrescription);

export default router;