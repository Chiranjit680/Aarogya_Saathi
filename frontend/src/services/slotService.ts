import api from './apiService';

export const createSlot = (slotData: {
  startTime: string;
  endTime: string;
  maxPatients: number;
}) => {
  return api.post('/slots', slotData);
};

export const getAvailableSlots = (date?: string, specialty?: string) => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (specialty) params.append('specialty', specialty);
  
  return api.get(`/slots?${params.toString()}`);
};

export const getDoctorSlots = (doctorId: number, availableOnly?: boolean) => {
  const params = new URLSearchParams();
  if (availableOnly) params.append('availableOnly', 'true');
  
  return api.get(`/slots/doctor/${doctorId}?${params.toString()}`);
};

export const updateSlot = (id: number, slotData: {
  startTime?: string;
  endTime?: string;
  maxPatients?: number;
  isAvailable?: boolean;
}) => {
  return api.put(`/slots/${id}`, slotData);
};

export const deleteSlot = (id: number) => {
  return api.delete(`/slots/${id}`);
};