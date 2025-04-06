import React from 'react';
import { Patient } from '../types/types';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
      <h3 className="font-medium">{patient.name}, {patient.age}</h3>
      <p className="text-gray-600">{patient.condition}</p>
      <p className="text-gray-500 text-sm mt-2">Last visit: {patient.lastVisit}</p>
    </div>
  );
};

export default PatientCard;