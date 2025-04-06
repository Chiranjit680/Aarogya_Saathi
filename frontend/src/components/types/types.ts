import React from "react";

export interface Appointment {
    id: string;
    patientName: string;
    age: number;
    condition: string;
    time: string;
    date: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    condition: string;
    lastVisit: string;
}

export interface SidebarItem {
  name: string;
  icon: React.FC<{ className?: string }>; // Changed to React component type
  path: string;
}