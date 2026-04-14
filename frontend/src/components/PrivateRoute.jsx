import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Protege rutas que requieren autenticación admin.
 * Redirige a /admin/login si no hay sesión o no es admin.
 */
export default function PrivateRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-sm">Verificando sesión...</div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
