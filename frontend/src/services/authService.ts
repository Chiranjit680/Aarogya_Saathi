import api from './apiService';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'DOCTOR' | 'PATIENT' | 'ADMIN';
  specialty?: string;
  medicalLicense?: string;
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
}

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post('/auth/register', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    
    if (response.data.success) {
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error(error.message || 'Registration failed');
  }
};

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password }, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getMe = () => {
  return api.get('/auth/me'); 
};
