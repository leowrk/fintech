import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export default function AdminPrivateRoute({ children }) {
  const { user, initializing } = useAdminAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
