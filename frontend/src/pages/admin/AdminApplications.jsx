import React, { useState, useEffect, useCallback } from 'react';
import { adminApplicationsAPI } from '../../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

const FILE_TYPE_LABELS = {
  dni: 'DNI / Documento de identidad',
  enrollment: 'Constancia de matrícula',
  payment_proof: 'Soporte de pago',
  other: 'Otro documento',
};

const INCOME_SOURCE_LABELS = {
  employee: 'Empleado',
  business: 'Negocio propio',
  independent: 'Trabajador independiente',
  family: 'Apoyo familiar',
};

const HOUSING_TYPE_LABELS = {
  own: 'Propio',
  rent: 'Alquiler',
  family: 'Familiar',
};

const PAYMENT_METHOD_LABELS = {
  'bank-account': 'Cuenta bancaria',
  'yape-plin': 'Yape/Plin',
  cash: 'Efectivo',
};

const PENSION_METHOD_LABELS = {
  parent: 'Mis padres pagan',
  myself: 'Pago yo mismo',
  loan: 'Con préstamo',
  scholarship: 'Beca',
};

const REJECTION_REASONS = [
  'Documentación incompleta',
  'Información no verificable',
  'Historial crediticio desfavorable',
  'Ingresos insuficientes',
  'No cumple con los requisitos académicos',
  'Datos inconsistentes',
  'DNI no coincide con la información proporcionada',
  'Solicitud duplicada',
  'Otro motivo',
];

// ─── Subcomponente: Modal de rechazo ───────────────────────────────────────
const RejectModal = ({ onConfirm, onCancel, loading }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const finalReason = selectedReason === 'Otro motivo' ? customReason : selectedReason;

  const handleConfirm = () => {
    if (!finalReason.trim()) {
      alert('Por favor selecciona o escribe el motivo de rechazo');
      return;
    }
    onConfirm(finalReason.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Rechazar solicitud</h3>
            <p className="text-xs text-gray-400">Esta acción notificará al solicitante</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo de rechazo *
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
            >
              <option value="">Selecciona un motivo...</option>
              {REJECTION_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {selectedReason === 'Otro motivo' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especifica el motivo *
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
                placeholder="Describe el motivo de rechazo en detalle..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-400 resize-none"
              />
            </div>
          )}

          {selectedReason && selectedReason !== 'Otro motivo' && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-sm text-red-700">
                <strong>Motivo seleccionado:</strong> {selectedReason}
              </p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !finalReason.trim()}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors"
          >
            {loading ? 'Procesando...' : 'Confirmar rechazo'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Componente principal ────────────────────────────────────────────────────
const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleStatusChange = async (id, newStatus, rejectionReason) => {
    setActionLoading(true);
    try {
      await adminApplicationsAPI.updateStatus(id, {
        status: newStatus,
        rejectionReason: newStatus === 'rejected' ? rejectionReason : undefined,
      });
      setShowRejectModal(false);
      setShowModal(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al actualizar estado');
    } finally {
      setActionLoading(false);
    }
  };

  const openDetail = async (app) => {
    setActiveTab('personal');
    try {
      const res = await adminApplicationsAPI.getOne(app.id);
      setSelectedApp(res.data);
    } catch {
      setSelectedApp(app);
    }
    setShowModal(true);
  };

  const getFileUrl = (file) => {
    if (file.url) return file.url;
    return `${API_URL}/uploads/${file.filename}`;
  };

  const InfoRow = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-400 uppercase font-medium mb-0.5">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300 font-normal">—</span>}</p>
    </div>
  );

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'academic', label: 'Académico' },
    { id: 'financial', label: 'Financiero' },
    { id: 'files', label: 'Archivos' },
  ];

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

      {/* ── Modal de rechazo ── */}
      {showRejectModal && selectedApp && (
        <RejectModal
          loading={actionLoading}
          onConfirm={(reason) => handleStatusChange(selectedApp.id, 'rejected', reason)}
          onCancel={() => setShowRejectModal(false)}
        />
      )}

      {/* ── Modal de detalle ── */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">

            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Detalle de Solicitud</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[selectedApp.status]}`}>
                    {STATUS_LABELS[selectedApp.status]}
                  </span>
                  <span className="text-xs text-gray-400">
                    Creado: {new Date(selectedApp.createdAt).toLocaleString('es-PE')}
                  </span>
                  {selectedApp.updatedAt !== selectedApp.createdAt && (
                    <span className="text-xs text-gray-400">
                      · Actualizado: {new Date(selectedApp.updatedAt).toLocaleString('es-PE')}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl ml-4"
              >
                ✕
              </button>
            </div>

            {/* Producto */}
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-blue-900">{selectedApp.productName}</p>
                <p className="text-xs text-blue-600">Precio: S/ {Number(selectedApp.productPrice).toLocaleString()}</p>
              </div>
              {selectedApp.rejectionReason && (
                <div className="flex-1 px-3 py-2 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-xs text-red-700"><strong>Motivo de rechazo:</strong> {selectedApp.rejectionReason}</p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 flex-shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'files' && selectedApp.files?.length > 0 && (
                    <span className="ml-1.5 bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">
                      {selectedApp.files.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">

              {/* ── TAB: DATOS PERSONALES ── */}
              {activeTab === 'personal' && (
                <>
                  <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Contacto e Identificación
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <InfoRow label="Correo electrónico" value={selectedApp.email} />
                      <InfoRow label="Celular" value={selectedApp.cellPhone} />
                      <InfoRow
                        label="Documento"
                        value={`${selectedApp.documentType}: ${selectedApp.documentNumber}`}
                      />
                    </div>
                  </section>

                  <section className="border-t border-gray-50 pt-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Dirección
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="col-span-2 md:col-span-3">
                        <InfoRow label="Dirección de domicilio" value={selectedApp.homeAddress} />
                      </div>
                      <InfoRow label="Departamento" value={selectedApp.department} />
                      <InfoRow label="Provincia" value={selectedApp.province} />
                      <InfoRow label="Distrito" value={selectedApp.district} />
                      <InfoRow
                        label="Tipo de vivienda"
                        value={HOUSING_TYPE_LABELS[selectedApp.housingType] || selectedApp.housingType}
                      />
                      {selectedApp.housingType === 'rent' && (
                        <InfoRow
                          label="Monto de alquiler"
                          value={selectedApp.rentAmount ? `S/ ${Number(selectedApp.rentAmount).toLocaleString()}` : null}
                        />
                      )}
                    </div>
                  </section>

                  {/* DNI Verification */}
                  <section className="border-t border-gray-50 pt-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Verificación de DNI
                    </h3>
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <div>
                        <p className="text-sm text-gray-700">
                          DNI: <strong>{selectedApp.documentNumber}</strong>
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                            selectedApp.personalData?.dniVerified
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {selectedApp.personalData?.dniVerified ? '✅ Verificado' : '⏳ Pendiente'}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Tipo: {selectedApp.documentType}</p>
                      </div>
                      {!selectedApp.personalData?.dniVerified && (
                        <button
                          disabled={actionLoading}
                          onClick={async () => {
                            setActionLoading(true);
                            try {
                              await adminApplicationsAPI.updateStatus(selectedApp.id, {
                                status: selectedApp.status,
                                notes: (selectedApp.notes || '') + ' | DNI verificado por admin.',
                              });
                              const res = await adminApplicationsAPI.getOne(selectedApp.id);
                              setSelectedApp({ ...res.data, personalData: { ...(res.data.personalData || {}), dniVerified: true } });
                              load();
                            } catch {
                              alert('Error al verificar DNI');
                            } finally {
                              setActionLoading(false);
                            }
                          }}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {actionLoading ? '...' : 'Marcar DNI verificado'}
                        </button>
                      )}
                    </div>
                  </section>

                  {selectedApp.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
                      <strong>Notas:</strong> {selectedApp.notes}
                    </div>
                  )}
                </>
              )}

              {/* ── TAB: INFORMACIÓN ACADÉMICA ── */}
              {activeTab === 'academic' && (
                <>
                  <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Datos Académicos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <InfoRow
                        label="Institución"
                        value={selectedApp.educationalInstitution?.toUpperCase()}
                      />
                      <InfoRow label="Ciclo" value={selectedApp.studyCycle ? `${selectedApp.studyCycle}° Ciclo` : null} />
                      <InfoRow
                        label="Pensión mensual"
                        value={selectedApp.pension ? `S/ ${Number(selectedApp.pension).toLocaleString()}` : null}
                      />
                      <InfoRow
                        label="Carrera"
                        value={selectedApp.career === 'other' ? selectedApp.otherCareer : selectedApp.career}
                      />
                      <InfoRow label="Código de alumno" value={selectedApp.studentCode} />
                      <InfoRow
                        label="¿Cómo paga la pensión?"
                        value={PENSION_METHOD_LABELS[selectedApp.pensionPaymentMethod] || selectedApp.pensionPaymentMethod}
                      />
                    </div>
                  </section>
                </>
              )}

              {/* ── TAB: FINANCIERO ── */}
              {activeTab === 'financial' && (
                <>
                  <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Fuente de Ingresos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <InfoRow
                        label="Fuente de ingresos"
                        value={INCOME_SOURCE_LABELS[selectedApp.incomeSource] || selectedApp.incomeSource}
                      />
                      <InfoRow
                        label="Método de pago preferido"
                        value={PAYMENT_METHOD_LABELS[selectedApp.paymentMethod] || selectedApp.paymentMethod}
                      />
                    </div>
                  </section>

                  {selectedApp.financialData && Object.keys(selectedApp.financialData).length > 0 && (
                    <section className="border-t border-gray-50 pt-5">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Datos Laborales / Negocio
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedApp.financialData.jobTitle && (
                          <InfoRow label="Cargo" value={selectedApp.financialData.jobTitle} />
                        )}
                        {selectedApp.financialData.employerName && (
                          <InfoRow label="Empresa / Empleador" value={selectedApp.financialData.employerName} />
                        )}
                        {selectedApp.financialData.monthlyIncome && (
                          <InfoRow
                            label="Ingreso mensual"
                            value={`S/ ${Number(selectedApp.financialData.monthlyIncome).toLocaleString()}`}
                          />
                        )}
                        {selectedApp.financialData.hasRUC && (
                          <InfoRow
                            label="¿Tiene RUC?"
                            value={selectedApp.financialData.hasRUC === 'si' ? 'Sí' : 'No'}
                          />
                        )}
                        {selectedApp.financialData.rucNumber && (
                          <InfoRow label="Número de RUC" value={selectedApp.financialData.rucNumber} />
                        )}
                        {selectedApp.financialData.businessType && (
                          <InfoRow label="Rubro del negocio" value={selectedApp.financialData.businessType} />
                        )}
                        {selectedApp.financialData.moneyReceivingMethod && (
                          <InfoRow label="Cómo recibe el dinero" value={selectedApp.financialData.moneyReceivingMethod} />
                        )}
                      </div>
                    </section>
                  )}

                  <section className="border-t border-gray-50 pt-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Confirmación de Solicitud
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <InfoRow label="¿Cómo nos conoció?" value={selectedApp.howYouFoundUs} />
                      {selectedApp.discountCoupon && (
                        <InfoRow label="Cupón de descuento" value={selectedApp.discountCoupon} />
                      )}
                    </div>
                  </section>

                  {/* Datos de aprobación si existen */}
                  {(selectedApp.approvedAmount || selectedApp.monthlyPayment) && (
                    <section className="border-t border-gray-50 pt-5">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Datos de Aprobación
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedApp.approvedAmount && (
                          <InfoRow label="Monto aprobado" value={`S/ ${Number(selectedApp.approvedAmount).toLocaleString()}`} />
                        )}
                        {selectedApp.monthlyPayment && (
                          <InfoRow label="Cuota mensual" value={`S/ ${Number(selectedApp.monthlyPayment).toLocaleString()}`} />
                        )}
                        {selectedApp.paymentTerm && (
                          <InfoRow label="Plazo" value={`${selectedApp.paymentTerm} meses`} />
                        )}
                        {selectedApp.interestRate && (
                          <InfoRow label="Tasa mensual" value={`${(Number(selectedApp.interestRate) * 100).toFixed(2)}%`} />
                        )}
                      </div>
                    </section>
                  )}
                </>
              )}

              {/* ── TAB: ARCHIVOS ── */}
              {activeTab === 'files' && (
                <>
                  {(!selectedApp.files || selectedApp.files.length === 0) ? (
                    <div className="py-12 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-sm">No se han adjuntado archivos</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedApp.files.map((file) => {
                        const url = getFileUrl(file);
                        const isImage = file.mimeType?.startsWith('image/');
                        const isPDF = file.mimeType === 'application/pdf';
                        return (
                          <div key={file.id} className="border border-gray-100 rounded-xl p-4 flex items-center gap-4">
                            {/* Icono */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isImage ? 'bg-purple-100' : isPDF ? 'bg-red-100' : 'bg-gray-100'
                            }`}>
                              {isImage ? (
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                              <p className="text-xs text-gray-400">
                                {FILE_TYPE_LABELS[file.fileType] || file.fileType}
                                {file.size && ` · ${(file.size / 1024).toFixed(0)} KB`}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-shrink-0">
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                Ver
                              </a>
                              <a
                                href={url}
                                download={file.originalName}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Descargar
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Acciones de estado ── */}
            {NEXT_STATUS[selectedApp.status] && (
              <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
                <p className="text-xs text-gray-400 uppercase font-medium mb-3">Cambiar estado</p>
                <div className="flex flex-wrap gap-2">
                  {NEXT_STATUS[selectedApp.status].map((action) => (
                    <button
                      key={action.value}
                      disabled={actionLoading}
                      onClick={() => {
                        if (action.value === 'rejected') {
                          setShowRejectModal(true);
                        } else {
                          handleStatusChange(selectedApp.id, action.value);
                        }
                      }}
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
      )}
    </div>
  );
};

export default AdminApplications;
