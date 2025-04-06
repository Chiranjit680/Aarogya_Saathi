import React from 'react';
import { Appointment } from '../types/types';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{appointment.patientName}, {appointment.age}</h3>
          <p className="text-gray-600">{appointment.condition}</p>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
          <span>{appointment.time}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;