import React from 'react';
import PatientSidebar from '../../components/patient/PatientSidebar';
import AppointmentCard from '../../components/common/AppointmentCard';
import StatsCard from '../../components/common/StatsCard';
import { Appointment } from '../../components/types/types';

const PatientDashboard: React.FC = () => {
  const todayAppointments: Appointment[] = [
    { id: '1', patientName: 'Dr. Smith', age: 45, condition: 'Annual Checkup', time: '10:00 AM', date: '2025-04-05' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      
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
            <h2 className="text-lg font-semibold mb-4">Health Summary</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">85%</span>
              </div>
              <div className="ml-4">
                <p className="font-medium">Good Health</p>
                <p className="text-gray-500 text-sm">Last checkup: March 28, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;