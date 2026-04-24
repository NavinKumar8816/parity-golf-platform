import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin" />
      </div>
    );
  }

  // Ensure case-insensitive check and explicit 'admin' match
  if (role !== 'admin') {
    console.warn(`[AdminGuard] Access denied. Current role: ${role}`);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
