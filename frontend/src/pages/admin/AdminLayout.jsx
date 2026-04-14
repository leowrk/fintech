import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) =>
    location.pathname.includes(path)
      ? 'bg-slate-700 text-white'
      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-center">
            FINTECH <span className="text-blue-400">OPS</span>
          </h1>
          {user && (
            <p className="text-xs text-slate-400 text-center mt-1 truncate">
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('dashboard')}`}
          >
            <span>📊</span> Dashboard
          </Link>
          <Link
            to="/admin/applications"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('applications')}`}
          >
            <span>📄</span> Postulaciones
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('products')}`}
          >
            <span>📦</span> Productos
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            🌐 Ver sitio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── CONTENIDO ── */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
