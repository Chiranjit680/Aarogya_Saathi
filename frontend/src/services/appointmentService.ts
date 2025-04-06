import api from './apiService';

export const createAppointment = (slotId: number) => {
  return api.post('/appointments', { slotId });
};

export const getAppointments = () => {
  return api.get('/appointments');
};

export const getAppointmentById = (id: number) => {
  return api.get(`/appointments/${id}`);
};

export const updateAppointment = (id: number, status: string) => {
  return api.put(`/appointments/${id}`, { status });
};

export const deleteAppointment = (id: number) => {
  return api.delete(`/appointments/${id}`);
};

export const addPrescription = (id: number, prescriptionData: {
  title: string;
  notes: string;
  tests: string[];
  medications: string[];
}) => {
  return api.post(`/appointments/${id}/prescription`, prescriptionData);
};