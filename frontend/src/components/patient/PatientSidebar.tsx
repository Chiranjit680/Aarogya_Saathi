import React from 'react';
import Sidebar from '../common/Sidebar';
import { SidebarItem } from '../types/types';

// Reuse the same SVG components from DoctorSidebar
const MediBotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 14h-2v-2h2v2zm0-9h-2v6h2V5zm6-2h-2.8c-.2-.6-.8-1-1.5-1H9.3c-.7 0-1.3.4-1.5 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 15H6V6h1.1c.2.6.8 1 1.5 1h5.8c.7 0 1.3-.4 1.5-1H18v12z"/>
  </svg>
);

const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
  </svg>
);

const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
);

const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const PatientSidebar: React.FC = () => {
  const items: SidebarItem[] = [
    { name: 'MediBot', icon: MediBotIcon, path: '/medi-bot' },
    { name: 'Overview', icon: HomeIcon, path: '/patient' },
    { name: 'Appointments', icon: CalendarIcon, path: '/patient/appointments' },
    { name: 'Video Consultation', icon: VideoIcon, path: '/patient/video' },
    { name: 'Prescription', icon: FileTextIcon, path: '/patient/prescriptions' },
  ];

  return <Sidebar items={items} userType="patient" />;
};

export default PatientSidebar;