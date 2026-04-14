import React, { useState, useEffect, useCallback } from 'react';
import { adminApplicationsAPI } from '../../services/api';

const STATUS_LABELS = {
  pending: 'Pendiente',
  under_review: 'En revisión',
  approved: 'Aprobado',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
  completed: 'Completado',
};

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-600',
  completed: 'bg-emerald-100 text-emerald-800',
};

const NEXT_STATUS = {
  pending: [
    { value: 'under_review', label: 'Marcar en revisión' },
    { value: 'approved', label: 'Aprobar' },
    { value: 'rejected', label: 'Rechazar' },
  ],
  under_review: [
    { value: 'approved', label: 'Aprobar' },
    { value: 'rejected', label: 'Rechazar' },
  ],
  approved: [{ value: 'completed', label: 'Completar' }],
  rejected: [{ value: 'pending', label: 'Reactivar' }],
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminApplicationsAPI.getAll({
        page,
        limit: 10,
        status: filterStatus || undefined,
        search: searchTerm || undefined,
      });
      const data = res.data;
      setApplications(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, filterStatus, searchTerm]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === 'rejected' && !rejectionReason.trim()) {
      alert('Por favor ingresa el motivo de rechazo');
      return;
    }
    setActionLoading(true);
    try {
      await adminApplicationsAPI.updateStatus(id, {
        status: newStatus,
        rejectionReason: newStatus === 'rejected' ? rejectionReason : undefined,
      });
      setRejectionReason('');
      setShowModal(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al actualizar estado');
    } finally {
      setActionLoading(false);
    }
  };

  const openDetail = async (app) => {
    try {
      const res = await adminApplicationsAPI.getOne(app.id);
      setSelectedApp(res.data);
    } catch {
      setSelectedApp(app);
    }
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Postulaciones</h1>
          <p className="text-sm text-gray-500">{total} solicitudes en total</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre, DNI, email..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Cargando solicitudes...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No se encontraron solicitudes</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Solicitante</th>
                <th className="px-6 py-3 text-left">Producto</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{app.email}</p>
                    <p className="text-xs text-gray-400">DNI: {app.documentNumber}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{app.productName}</td>
                  <td className="px-6 py-4 font-medium">S/ {Number(app.productPrice).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[app.status] || 'bg-gray-100'}`}>
                      {STATUS_LABELS[app.status] || app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(app.createdAt).toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openDetail(app)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40"
            >
              ← Anterior
            </button>
            <span className="text-sm text-gray-500">Página {page} de {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>

      {/* Modal detalle */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">Detalle de Solicitud</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Estado actual */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedApp.status]}`}>
                  {STATUS_LABELS[selectedApp.status]}
                </span>
                <span className="text-xs text-gray-400">
                  Creado: {new Date(selectedApp.createdAt).toLocaleString('es-PE')}
                </span>
              </div>

              {/* Info básica */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Producto</p>
                  <p className="font-medium">{selectedApp.productName}</p>
                  <p className="text-gray-500">S/ {Number(selectedApp.productPrice).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Contacto</p>
                  <p>{selectedApp.email}</p>
                  <p className="text-gray-500">{selectedApp.cellPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Documento</p>
                  <p>{selectedApp.documentType}: {selectedApp.documentNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Institución</p>
                  <p>{selectedApp.educationalInstitution?.toUpperCase() || '—'}</p>
                  <p className="text-gray-500">Ciclo: {selectedApp.studyCycle || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Carrera</p>
                  <p>{selectedApp.career || selectedApp.otherCareer || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium mb-1">Fuente de ingresos</p>
                  <p>{selectedApp.incomeSource || '—'}</p>
                </div>
              </div>

              {selectedApp.rejectionReason && (
                <div className="p-3 bg-red-50 rounded-lg text-sm text-red-700 border border-red-100">
                  <strong>Motivo de rechazo:</strong> {selectedApp.rejectionReason}
                </div>
              )}

              {selectedApp.notes && (
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
                  <strong>Notas:</strong> {selectedApp.notes}
                </div>
              )}

              {/* Acciones de estado */}
              {NEXT_STATUS[selectedApp.status] && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 uppercase font-medium mb-3">Cambiar estado</p>

                  {/* Campo de motivo para rechazo */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Motivo de rechazo (requerido si rechazas)"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {NEXT_STATUS[selectedApp.status].map((action) => (
                      <button
                        key={action.value}
                        disabled={actionLoading}
                        onClick={() => handleStatusChange(selectedApp.id, action.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                          action.value === 'approved'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : action.value === 'rejected'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {actionLoading ? '...' : action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
