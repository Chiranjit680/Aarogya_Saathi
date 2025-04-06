import { Doctor, Patient, Admin } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Doctor | Patient | Admin;
    }
  }
}