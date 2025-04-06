import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateInput from '../../components/auth/DateInput';
import { register } from '../../services/authService';
import Select from '../../components/auth/Select';
import Input from '../../components/auth/Input';
import Button from '../../components/auth/Button';
import { useAuth } from '../../context/AuthContext';

const PatientRegister = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    gender: 'PREFER_NOT_TO_SAY' as const,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register({
        ...formData,
        role: 'PATIENT',
        specialty: undefined,
        medicalLicense: undefined
      });
      await auth.login(formData.email, formData.password);

      if (response.success) {
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Patient Registration</h2>
      {error && <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />

        <DateInput
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Registering...' : 'Register as Patient'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Are you a doctor?{' '}
          <button 
            onClick={() => navigate('/register/doctor')}
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default PatientRegister;