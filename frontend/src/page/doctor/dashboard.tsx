import React from 'react';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import AppointmentCard from '../../components/common/AppointmentCard';
import StatsCard from '../../components/common/StatsCard';
import PatientCard from '../../components/common/PatientCard';
import { Appointment, Patient } from '../../components/types/types';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard: React.FC = () => {
    const auth = useAuth();
  const todayAppointments: Appointment[] = [
    { id: '1', patientName: 'John Doe', age: 45, condition: 'Chest pain', time: '10:00 AM', date: '2025-04-05' },
    { id: '2', patientName: 'Jane Smith', age: 32, condition: 'Skin rash', time: '11:30 AM', date: '2025-04-05' },
  ];

  const recentPatients: Patient[] = [
    { id: '1', name: 'Emily Wilson', age: 29, condition: 'Migraine', lastVisit: 'March 28, 2025' },
    { id: '2', name: 'Michael Brown', age: 52, condition: 'Hypertension', lastVisit: 'March 27, 2025' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
            <p className="text-gray-500 text-sm mb-4">Your scheduled appointments for today</p>
            
            <div className="space-y-4">
              {todayAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Earnings</h2>
            <div className="flex items-end">
              <span className="text-3xl font-bold">$1,240</span>
              <span className="ml-2 text-green-500">(4% from last week)</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
            <p className="text-gray-500 text-sm mb-4">Patients you've seen recently</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPatients.map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;