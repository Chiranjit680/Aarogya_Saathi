import api from './apiService';

export const createReview = (appointmentId: number, rating: number, comment: string) => {
  return api.post('/reviews', { appointmentId, rating, comment });
};

export const getDoctorReviews = (doctorId: number) => {
  return api.get(`/reviews/doctor/${doctorId}`);
};

export const getReviewById = (id: number) => {
  return api.get(`/reviews/${id}`);
};

export const updateReview = (id: number, rating: number, comment: string) => {
  return api.put(`/reviews/${id}`, { rating, comment });
};

export const deleteReview = (id: number) => {
  return api.delete(`/reviews/${id}`);
};