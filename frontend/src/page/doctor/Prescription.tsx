import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import DoctorSidebar from '../../components/doctor/DoctorSidebar'; // adjust path if needed

interface DoctorPrescription {
  id: number;
  patient: { firstName: string; lastName: string };
  issuedAt: string;
  medications: string;
  notes: string;
  title: string;
  tests: string;
}

const Prescription: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<DoctorPrescription[]>([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorId = auth.user?.id;
        const res = await axios.get(`http://localhost:5000/api/prescriptions/${doctorId}`);
        setPrescriptions(res.data);
      } catch (err) {
        console.error('Failed to fetch prescriptions:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <DoctorSidebar />

    {/* Main Content */}
    <div className="flex-1 p-8 overflow-auto ml-64"> {/* <- add ml-64 here */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Prescriptions</h1>

        {prescriptions.length === 0 ? (
        <p className="text-gray-500">No prescriptions found.</p>
        ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
            {/* Header Row */}
            <div className="grid grid-cols-6 bg-blue-100 text-sm font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0 z-10">
            <div className="p-4 border-r border-gray-300">Patient</div>
            <div className="p-4 border-r border-gray-300">Title</div>
            <div className="p-4 border-r border-gray-300">Medications</div>
            <div className="p-4 border-r border-gray-300">Tests</div>
            <div className="p-4 border-r border-gray-300">Notes</div>
            <div className="p-4">Date</div>
            </div>

            {/* Data Rows */}
            {prescriptions.map((p) => (
            <div
                key={p.id}
                className="grid grid-cols-6 text-sm text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition"
            >
                <div className="p-4 border-r border-gray-100">{p.patient.firstName} {p.patient.lastName}</div>
                <div className="p-4 border-r border-gray-100 whitespace-pre-wrap">{p.title}</div>
                <div className="p-4 border-r border-gray-100 whitespace-pre-wrap">{p.medications}</div>
                <div className="p-4 border-r border-gray-100 whitespace-pre-wrap">{p.tests}</div>
                <div className="p-4 border-r border-gray-100 whitespace-pre-wrap">{p.notes}</div>
                <div className="p-4 whitespace-nowrap">{new Date(p.issuedAt).toLocaleDateString()}</div>
            </div>
            ))}
        </div>
        )}
    </div>
    </div>
  );
};

export default Prescription;
