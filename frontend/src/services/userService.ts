import api from './apiService';

export const getAllUsers = () => {
  return api.get('/users');
};

export const getAllDoctors = () => {
  return api.get('/users/doctors');
};

export const getAllPatients = () => {
  return api.get('/users/patients');
};

export const getUserById = (id: number) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id: number, userData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialty?: string;
  dob?: string;
  medicalHistory?: string;
  gender?: string;
}) => {
  return api.put(`/users/${id}`, userData);
};