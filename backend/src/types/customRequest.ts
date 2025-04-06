import { Doctor, Patient, Admin } from '@prisma/client';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: (Doctor & { role?: 'DOCTOR' }) | 
         (Patient & { role?: 'PATIENT' }) | 
         (Admin & { role?: 'ADMIN' });
}