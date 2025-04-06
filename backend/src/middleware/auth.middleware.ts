import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../utils/responseHandler';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return sendResponse(res, 401, 'Authentication required');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

    let user;
    if (decoded.role === 'DOCTOR') {
      user = await prisma.doctor.findUnique({ where: { id: decoded.id } });
    } else if (decoded.role === 'PATIENT') {
      user = await prisma.patient.findUnique({ where: { id: decoded.id } });
    } else if (decoded.role === 'ADMIN') {
      user = await prisma.admin.findUnique({ where: { id: decoded.id } });
    }

    if (!user) {
      return sendResponse(res, 401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, 401, 'Invalid token');
  }
};