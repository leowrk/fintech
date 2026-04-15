import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { applicationsAPI } from '../services/api';

const STATUS_CONFIG = {
  pending: {
    label: 'Pendiente de revisión',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⏳',
    desc: 'Tu solicitud fue recibida y está en cola para ser revisada por nuestro equipo.',
  },
  under_review: {
    label: 'En revisión',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '🔍',
    desc: 'Nuestro equipo está evaluando tu solicitud. Te contactaremos pronto.',
  },
  approved: {
    label: 'Aprobada',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅',
    desc: '¡Felicitaciones! Tu financiamiento fue aprobado. Nos contactaremos contigo.',
  },
  rejected: {
    label: 'Rechazada',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '❌',
    desc: 'Tu solicitud no fue aprobada en esta oportunidad. Puedes volver a postular.',
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: '🚫',
    desc: 'Esta solicitud fue cancelada.',
  },
  completed: {
    label: 'Completada',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: '🎉',
    desc: '¡Tu financiamiento está completado! Disfruta tu equipo.',
  },
};

const TIMELINE = ['pending', 'under_review', 'approved', 'completed'];

const calcMonthly = (price, rate, term) => {
  const r = parseFloat(rate) || 0.019;
  const n = term || 12;
  const p = parseFloat(price) || 0;
  return Math.round((p * r) / (1 - Math.pow(1 + r, -n)));
};

const MiPostulacion = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/mi-postulacion' } } });
      return;
    }
    applicationsAPI
      .getMy()
      .then((res) => {
        const items = res.data?.items || res.data || [];
        setApplications(Array.isArray(items) ? items : []);
        if (items.length > 0) setSelected(items[0]);
      })
      .catch(() => setError('No se pudieron cargar tus postulaciones'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const statusInfo = (status) => STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const currentStep = (status) => TIMELINE.indexOf(status);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#023047] rounded-tr-lg rounded-bl-lg"></div>
            <span className="text-xl font-bold text-[#023047]">Fintech</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              Hola, <strong>{user?.firstName}</strong>
            </span>
            <Link to="/catalog" className="text-sm text-[#2A9D8F] font-bold hover:underline">
              Ver catálogo
            </Link>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Salir
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#023047] mb-1">Mis Postulaciones</h1>
        <p className="text-gray-500 text-sm mb-8">Seguimiento de tus solicitudes de financiamiento</p>

        {loading && (
          <div className="text-center py-20 text-gray-400">Cargando postulaciones...</div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-6">
            {error}
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-gray-500 font-medium mb-2">Aún no tienes postulaciones</p>
            <p className="text-gray-400 text-sm mb-6">
              Elige un equipo del catálogo y solicita tu financiamiento.
            </p>
            <Link
              to="/catalog"
              className="inline-block bg-[#023047] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#034060] transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de postulaciones */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Mis solicitudes ({applications.length})
              </h2>
              {applications.map((app) => {
                const s = statusInfo(app.status);
                return (
                  <button
                    key={app.id}
                    onClick={() => setSelected(app)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected?.id === app.id
                        ? 'border-[#2A9D8F] bg-[#f0faf9] shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <p className="font-bold text-[#023047] text-sm leading-tight mb-1 truncate">
                      {app.productName}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(app.createdAt).toLocaleDateString('es-PE')}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${s.color}`}>
                      {s.icon} {s.label}
                    </span>
                  </button>
                );
              })}

              <Link
                to="/catalog"
                className="block text-center text-sm text-[#2A9D8F] font-bold py-3 border border-dashed border-[#2A9D8F] rounded-xl hover:bg-[#f0faf9] transition-colors mt-4"
              >
                + Nueva postulación
              </Link>
            </div>

            {/* Detalle de la postulación seleccionada */}
            {selected && (
              <div className="lg:col-span-2 space-y-4">
                {/* Estado actual */}
                {(() => {
                  const s = statusInfo(selected.status);
                  const step = currentStep(selected.status);
                  return (
                    <div className={`p-5 rounded-2xl border ${s.color}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{s.icon}</span>
                        <div>
                          <p className="font-bold text-lg">{s.label}</p>
                          <p className="text-sm opacity-80 mt-0.5">{s.desc}</p>
                          {selected.rejectionReason && (
                            <p className="text-sm mt-2 font-medium">
                              Motivo: {selected.rejectionReason}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Timeline (solo para estados no rechazados/cancelados) */}
                      {!['rejected', 'cancelled'].includes(selected.status) && (
                        <div className="mt-4 flex items-center gap-0">
                          {TIMELINE.map((s, i) => (
                            <React.Fragment key={s}>
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                                  i <= step
                                    ? 'bg-white border-current'
                                    : 'bg-transparent border-current opacity-30'
                                }`}>
                                  {i < step ? '✓' : i + 1}
                                </div>
                                <span className={`text-[9px] mt-1 font-medium text-center w-16 ${i > step ? 'opacity-30' : ''}`}>
                                  {['Recibida', 'Revisión', 'Aprobada', 'Completa'][i]}
                                </span>
                              </div>
                              {i < TIMELINE.length - 1 && (
                                <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < step ? 'bg-current' : 'bg-current opacity-20'}`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Producto */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Producto solicitado
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#023047] text-lg">{selected.productName}</p>
                      <p className="text-gray-500 text-sm">
                        Precio contado: <strong>S/ {Number(selected.productPrice).toLocaleString()}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      {selected.monthlyPayment ? (
                        <div>
                          <p className="text-2xl font-extrabold text-[#2A9D8F]">
                            S/ {Number(selected.monthlyPayment).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            /mes · {selected.paymentTerm} cuotas
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-2xl font-extrabold text-[#2A9D8F]">
                            S/ {calcMonthly(selected.productPrice, 0.019, 12).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">/mes estimado · 12 cuotas</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Datos del solicitante */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Datos de la solicitud
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">DNI</p>
                      <p className="font-medium text-gray-800">{selected.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Celular</p>
                      <p className="font-medium text-gray-800">{selected.cellPhone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Institución</p>
                      <p className="font-medium text-gray-800">
                        {selected.educationalInstitution?.toUpperCase() || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Ciclo</p>
                      <p className="font-medium text-gray-800">{selected.studyCycle || '—'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Carrera</p>
                      <p className="font-medium text-gray-800">
                        {selected.career || selected.otherCareer || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Fecha de solicitud</p>
                      <p className="font-medium text-gray-800">
                        {new Date(selected.createdAt).toLocaleDateString('es-PE', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notas del admin (si existen) */}
                {selected.notes && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                      Mensaje del equipo Fintech
                    </p>
                    <p className="text-sm text-blue-700">{selected.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiPostulacion;
