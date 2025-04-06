import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/responseHandler';

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(res, 401, 'Authentication required');
    }

    let userRole = '';
    if ('medicalLicense' in req.user) {
      userRole = 'DOCTOR';
    } else if ('dob' in req.user) {
      userRole = 'PATIENT';
    } else {
      userRole = 'ADMIN';
    }

    if (!roles.includes(userRole)) {
      return sendResponse(res, 403, 'Forbidden - Insufficient permissions');
    }

    next();
  };
};