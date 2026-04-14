import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApplicationsAPI } from '../../services/api';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
  pending: 'Pendiente',
  under_review: 'En revisión',
  approved: 'Aprobado',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, appsRes] = await Promise.all([
          adminApplicationsAPI.getStats(),
          adminApplicationsAPI.getAll({ limit: 5, sortBy: 'createdAt', order: 'DESC' }),
        ]);
        setStats(statsRes.data);
        setRecent(appsRes.data.items || []);
      } catch {
        setError('Error al cargar estadísticas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = stats
    ? [
        { title: 'Total Solicitudes', value: stats.total, color: 'bg-blue-500', icon: '📄' },
        { title: 'Pendientes', value: stats.pending, color: 'bg-yellow-500', icon: '⏳' },
        { title: 'En revisión', value: stats.underReview, color: 'bg-indigo-500', icon: '🔍' },
        { title: 'Aprobadas', value: stats.approved, color: 'bg-green-500', icon: '✅' },
        { title: 'Rechazadas', value: stats.rejected, color: 'bg-red-500', icon: '❌' },
      ]
    : [];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-gray-500">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de actividad del sistema</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`inline-flex w-10 h-10 ${s.color} rounded-lg items-center justify-center text-xl mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.title}</p>
          </div>
        ))}
      </div>

      {/* Solicitudes recientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Solicitudes Recientes</h2>
          <Link
            to="/admin/applications"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todas →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No hay solicitudes aún</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((app) => (
              <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{app.productName}</p>
                  <p className="text-xs text-gray-400">
                    {app.email} · DNI: {app.documentNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className="text-sm font-bold text-gray-700">
                    S/ {Number(app.productPrice).toLocaleString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-gray-100 text-gray-600'}`}>
                    {statusLabels[app.status] || app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
