import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../utils/responseHandler';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation (minimum 8 chars, at least one letter and one number)
const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role, specialty, medicalLicense, dob, gender } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return sendResponse(res, 400, 'All fields are required');
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return sendResponse(res, 400, 'Invalid email format');
    }

    // Validate password strength
    if (!passwordRegex.test(password)) {
      return sendResponse(res, 400, 'Password must be at least 8 characters long and contain at least one letter and one number');
    }

    // Check if user already exists
    const existingUser = await prisma.doctor.findUnique({ where: { email } }) || 
                         await prisma.patient.findUnique({ where: { email } }) || 
                         await prisma.admin.findUnique({ where: { email } });

    if (existingUser) {
      return sendResponse(res, 400, 'Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security

    let user;
    if (role === 'DOCTOR') {
      if (!specialty || !medicalLicense) {
        return sendResponse(res, 400, 'Specialty and medical license are required for doctors');
      }
      user = await prisma.doctor.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          specialty,
          medicalLicense,
          gender,
        }
      });
    } else if (role === 'PATIENT') {
      // Validate date format if dob is provided
      if (dob && isNaN(Date.parse(dob))) {
        return sendResponse(res, 400, 'Invalid date format for date of birth');
      }

      user = await prisma.patient.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          dob: dob ? new Date(dob) : null,
          gender,
        }
      });
    } else if (role === 'ADMIN') {
      return sendResponse(res, 400, 'Admin registration is not allowed');
    } else {
      return sendResponse(res, 400, 'Invalid role');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return sendResponse(res, 201, 'Registration successful', {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role
    });
  } catch (error) {
    console.error('Registration error:', error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check in all user types
    let user = await prisma.doctor.findUnique({ where: { email } }) || 
               await prisma.patient.findUnique({ where: { email } }) || 
               await prisma.admin.findUnique({ where: { email } });

    if (!user) {
      return sendResponse(res, 401, 'Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, 'Invalid credentials');
    }

    // Determine role
    let role = '';
    if ('medicalLicense' in user) {
      role = 'DOCTOR';
    } else if ('dob' in user) {
      role = 'PATIENT';
    } else {
      role = 'ADMIN';
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return sendResponse(res, 200, 'Login successful', {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return sendResponse(res, 200, 'Logout successful');
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, 'Not authenticated');
    }

    let role = '';
    if ('medicalLicense' in req.user) {
      role = 'DOCTOR';
    } else if ('dob' in req.user) {
      role = 'PATIENT';
    } else {
      role = 'ADMIN';
    }

    return sendResponse(res, 200, 'User retrieved', {
      ...req.user,
      password: undefined,
      role
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};