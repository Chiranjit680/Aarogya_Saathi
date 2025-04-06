import { Router } from 'express';
import { 
  createReview, 
  getDoctorReviews, 
  getReviewById, 
  updateReview, 
  deleteReview 
} from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// POST /api/reviews
router.post('/', authenticate, createReview);

// GET /api/reviews/doctor/:doctorId
router.get('/doctor/:doctorId', getDoctorReviews);

// GET /api/reviews/:id
router.get('/:id', getReviewById);

// PUT /api/reviews/:id
router.put('/:id', authenticate, updateReview);

// DELETE /api/reviews/:id
router.delete('/:id', authenticate, deleteReview);

export default router;