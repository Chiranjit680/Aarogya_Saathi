import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../utils/responseHandler';

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response) => {
  try {
    const { appointmentId, rating, comment } = req.body;
    const patientId = req.user?.id;

    if (!patientId) {
      return sendResponse(res, 401, 'Authentication required');
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return sendResponse(res, 400, 'Rating must be between 1 and 5');
    }

    // Check if appointment exists and belongs to the patient
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(appointmentId) }
    });

    if (!appointment) {
      return sendResponse(res, 404, 'Appointment not found');
    }

    if (appointment.patientId !== patientId) {
      return sendResponse(res, 403, 'Forbidden - Not your appointment');
    }

    // Check if appointment is completed
    if (appointment.status !== 'COMPLETED') {
      return sendResponse(res, 400, 'You can only review completed appointments');
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { appointmentId: appointment.id }
    });

    if (existingReview) {
      return sendResponse(res, 400, 'Review already exists for this appointment');
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        patientId,
        doctorId: appointment.doctorId,
        appointmentId: appointment.id,
        rating,
        comment
      },
      include: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        appointment: {
          select: {
            id: true,
            date: true
          }
        }
      }
    });

    return sendResponse(res, 201, 'Review created', review);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getDoctorReviews = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { doctorId: parseInt(doctorId) },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        appointment: {
          select: {
            id: true,
            date: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return sendResponse(res, 200, 'Doctor reviews retrieved', reviews);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        appointment: {
          select: {
            id: true,
            date: true
          }
        }
      }
    });

    if (!review) {
      return sendResponse(res, 404, 'Review not found');
    }

    return sendResponse(res, 200, 'Review retrieved', review);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const patientId = req.user?.id;

    if (!patientId) {
      return sendResponse(res, 401, 'Authentication required');
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return sendResponse(res, 400, 'Rating must be between 1 and 5');
    }

    // Check if review exists and belongs to the patient
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return sendResponse(res, 404, 'Review not found');
    }

    if (review.patientId !== patientId) {
      return sendResponse(res, 403, 'Forbidden - Not your review');
    }

    // Update review
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        rating,
        comment
      },
      include: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        appointment: {
          select: {
            id: true,
            date: true
          }
        }
      }
    });

    return sendResponse(res, 200, 'Review updated', updatedReview);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patientId = req.user?.id;

    if (!patientId) {
      return sendResponse(res, 401, 'Authentication required');
    }

    // Check if review exists and belongs to the patient
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return sendResponse(res, 404, 'Review not found');
    }

    if (review.patientId !== patientId) {
      return sendResponse(res, 403, 'Forbidden - Not your review');
    }

    // Delete review
    await prisma.review.delete({
      where: { id: parseInt(id) }
    });

    return sendResponse(res, 200, 'Review deleted');
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, 'Internal server error');
  }
};