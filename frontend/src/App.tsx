import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DoctorRegister from './page/auth/doctorRegister';
import PatientRegister from './page/auth/patientRegister';
import SignIn from './page/auth/signin';
import Home from './page/home';
import DoctorDashboard from './page/doctor/dashboard';
import PatientDashboard from './page/patient/dashboard';
import './App.css';
import Prescription from './page/doctor/Prescription';
import Community from './page/doctor/Community';
import Appointments from './page/doctor/Appointments';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: 'DOCTOR' | 'PATIENT' | 'ADMIN' }) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (auth.user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

function AppContent() {
    const auth = useAuth();

    if (auth.loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="App">
            <Routes>
                {/* Public routes */}
                <Route 
                    path="/" 
                    element={!auth.user ? <Home /> : <Navigate to={`/${auth.user?.role.toLowerCase()}/dashboard`} replace />} 
                />
                
                <Route 
                    path="/login" 
                    element={!auth.user ? <SignIn /> : <Navigate to={`/${auth.user?.role.toLowerCase()}/dashboard`} replace />} 
                />
                
                {/* Doctor Registration */}
                <Route 
                    path="/register/doctor" 
                    element={!auth.user ? <DoctorRegister /> : <Navigate to="/doctor/dashboard" replace />} 
                />
                
                {/* Patient Registration */}
                <Route 
                    path="/register/patient" 
                    element={!auth.user ? <PatientRegister /> : <Navigate to="/patient/dashboard" replace />} 
                />

                {/* Protected routes using wrapper */}
                <Route 
                    path="/doctor/dashboard" 
                    element={
                        <ProtectedRoute requiredRole="DOCTOR">
                            <DoctorDashboard />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/patient/dashboard" 
                    element={
                        <ProtectedRoute requiredRole="PATIENT">
                            <PatientDashboard />
                        </ProtectedRoute>
                    } 
                />

                {/* Admin route example */}
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <div>Admin Dashboard</div>
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/doctor/prescriptions" 
                    element={
                        <ProtectedRoute requiredRole="DOCTOR">
                            <Prescription />
                        </ProtectedRoute>
                    }
                />

                <Route 
                path="/doctor/community" 
                element={
                    <ProtectedRoute requiredRole="DOCTOR">
                        <Community />
                    </ProtectedRoute>
                }
                />

                <Route path="/doctor/appointments" element={<Appointments />} />
                


                {/* 404 route */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </div>
    );
}

export default App;