import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all prescriptions for a doctor
router.get('/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { doctorId: parseInt(doctorId) },
      include: { patient: true }
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

export default router;
