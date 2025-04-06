import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
  };
  slot: {
    startTime: string;
    endTime: string;
  };
  date: string;
  status: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = 10; // Replace this with actual context if needed
        const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
        console.log('Fetched appointments:', response.data);
        setAppointments(response.data.data); // <== important: use .data.data
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
          <th className="py-3 px-6 text-left">Patient</th>
          <th className="py-3 px-6 text-left">Date</th>
          <th className="py-3 px-6 text-left">Time</th>
          <th className="py-3 px-6 text-left">Status</th>
        </tr>
      </thead>

        <tbody>
  {appointments.map((appt, index) => (
    <tr
      key={appt.id}
      className={`border-t text-sm ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      } hover:bg-gray-100 transition-colors`}
    >
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="font-medium text-gray-900">
          {`${appt.patient.firstName} ${appt.patient.lastName}`}
        </div>
        <div className="text-gray-500 text-xs">{appt.patient.email}</div>
      </td>
      <td className="py-4 px-6 whitespace-nowrap">{formatDate(appt.slot.startTime)}</td>
      <td className="py-4 px-6 whitespace-nowrap">
        {`${formatTime(appt.slot.startTime)} - ${formatTime(appt.slot.endTime)}`}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            appt.status === 'Confirmed'
              ? 'bg-green-100 text-green-800'
              : appt.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {appt.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Appointments;
