import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../utils/responseHandler';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        specialty: true,
        medicalLicense: true
      }
    });

    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        dob: true
      }
    });

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });

    return sendResponse(res, 200, 'Users retrieved', {
      doctors,
      patients,
      admins
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        specialty: true,
        medicalLicense: true
      }
    });

    return sendResponse(res, 200, 'Doctors retrieved', doctors);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        dob: true
      }
    });

    return sendResponse(res, 200, 'Patients retrieved', patients);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Define a union type for user
    type User = 
      | { id: number; firstName: string; lastName: string; email: string; specialty: string; medicalLicense: string }
      | { id: number; firstName: string; lastName: string; email: string; dob: Date | null }
      | { id: number; firstName: string; lastName: string; email: string };

    // Check all user types
    let user: User | null = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        specialty: true,
        medicalLicense: true
      }
    });

    if (!user) {
      user = await prisma.patient.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dob: true
        }
      });
    }

    if (!user) {
      user = await prisma.admin.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      });
    }

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, 'User retrieved', user);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, specialty, dob, mdeicalHistory, gender } = req.body;

    // Check if user exists and determine type
    let user = await prisma.doctor.findUnique({ where: { id: parseInt(id) } }) || 
               await prisma.patient.findUnique({ where: { id: parseInt(id) } }) || 
               await prisma.admin.findUnique({ where: { id: parseInt(id) } });

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    let updatedUser;
    if ('medicalLicense' in user) {
      // Doctor
      updatedUser = await prisma.doctor.update({
        where: { id: parseInt(id) },
        data: {
          firstName,
          lastName,
          email,
          specialty,
          gender,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          specialty: true,
          gender: true,
        }
      });
    } else if ('dob' in user) {
      // Patient
      updatedUser = await prisma.patient.update({
        where: { id: parseInt(id) },
        data: {
          firstName,
          lastName,
          email,
          dob: dob ? new Date(dob) : undefined,
          gender,
          mdeicalHistory,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dob: true,
          gender: true,
          mdeicalHistory: true,
        }
      });
    } else {
      // Admin
      updatedUser = await prisma.admin.update({
        where: { id: parseInt(id) },
        data: {
          firstName,
          lastName,
          email
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      });
    }

    return sendResponse(res, 200, 'User updated', updatedUser);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};