import { Router } from 'express';
import { 
  getAllUsers, 
  getAllDoctors, 
  getAllPatients, 
  getUserById, 
  updateUser 
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

// GET /api/users
router.get('/', authenticate, requireRole(['ADMIN']), getAllUsers);

// GET /api/users/doctors
router.get('/doctors', getAllDoctors);

// GET /api/users/patients
router.get('/patients', authenticate, requireRole(['DOCTOR']), getAllPatients);

// GET /api/users/:id
router.get('/:id', authenticate, getUserById);

// PUT /api/users/:id
router.put('/:id', authenticate, updateUser);

export default router;