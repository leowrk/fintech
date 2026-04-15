import React, { useState, useEffect } from 'react';
import { adminSettingsAPI } from '../../services/api';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

// ── Componente de tarjeta de sección ────────────────────────────────────────
const SettingsCard = ({ title, description, icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <h2 className="font-bold text-gray-900 text-base">{title}</h2>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Alerta inline ────────────────────────────────────────────────────────────
const Alert = ({ type, message }) => {
  if (!message) return null;
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-600',
  };
  const icons = { success: '✅', error: '⚠️' };
  return (
    <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm ${styles[type]}`}>
      <span>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
};

// ── Input de contraseña con toggle ───────────────────────────────────────────
const PasswordInput = ({ label, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder || '••••••••'}
          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Componente principal ─────────────────────────────────────────────────────
const AdminSettings = () => {
  const { user, updateToken } = useAdminAuth();

  // ── Estado: Cambiar contraseña ──
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdAlert, setPwdAlert] = useState(null);

  // ── Estado: Cambiar email ──
  const [emailForm, setEmailForm] = useState({ newEmail: '', password: '' });
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailAlert, setEmailAlert] = useState(null);

  // ── Estado: Duración de sesión ──
  const SESSION_OPTIONS = [
    { value: '1', label: '1 hora' },
    { value: '2', label: '2 horas' },
    { value: '4', label: '4 horas' },
    { value: '8', label: '8 horas' },
    { value: '12', label: '12 horas' },
    { value: '24', label: '1 día' },
    { value: '48', label: '2 días' },
    { value: '168', label: '1 semana' },
    { value: '720', label: '30 días' },
  ];
  const [sessionDuration, setSessionDuration] = useState('8');
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Cargar config actual
  useEffect(() => {
    adminSettingsAPI.get()
      .then((res) => {
        setSessionDuration(res.data.adminSessionDuration || '8');
        setSettingsLoaded(true);
      })
      .catch(() => setSettingsLoaded(true));
  }, []);

  // ── Cambiar contraseña ────────────────────────────────────────────────────
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdAlert(null);

    if (pwd.new !== pwd.confirm) {
      setPwdAlert({ type: 'error', message: 'Las contraseñas nuevas no coinciden' });
      return;
    }
    if (pwd.new.length < 6) {
      setPwdAlert({ type: 'error', message: 'La nueva contraseña debe tener al menos 6 caracteres' });
      return;
    }
    if (pwd.new === pwd.current) {
      setPwdAlert({ type: 'error', message: 'La nueva contraseña debe ser diferente a la actual' });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await adminSettingsAPI.changePassword(pwd.current, pwd.new);
      if (res.data.access_token) {
        updateToken(res.data.access_token);
      }
      setPwdAlert({ type: 'success', message: 'Contraseña actualizada correctamente' });
      setPwd({ current: '', new: '', confirm: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al cambiar la contraseña';
      setPwdAlert({ type: 'error', message: Array.isArray(msg) ? msg.join(', ') : msg });
    } finally {
      setPwdLoading(false);
    }
  };

  // ── Cambiar email ─────────────────────────────────────────────────────────
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setEmailAlert(null);

    if (!emailForm.newEmail || !emailForm.password) {
      setEmailAlert({ type: 'error', message: 'Completa todos los campos' });
      return;
    }

    setEmailLoading(true);
    try {
      const res = await adminSettingsAPI.changeEmail(emailForm.password, emailForm.newEmail);
      if (res.data.access_token) {
        updateToken(res.data.access_token, res.data.user);
      }
      setEmailAlert({ type: 'success', message: 'Correo actualizado correctamente' });
      setEmailForm({ newEmail: '', password: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al cambiar el correo';
      setEmailAlert({ type: 'error', message: Array.isArray(msg) ? msg.join(', ') : msg });
    } finally {
      setEmailLoading(false);
    }
  };

  // ── Guardar duración de sesión ─────────────────────────────────────────────
  const handleSaveSession = async () => {
    setSessionLoading(true);
    setSessionAlert(null);
    try {
      await adminSettingsAPI.update({ adminSessionDuration: sessionDuration });
      const label = SESSION_OPTIONS.find((o) => o.value === sessionDuration)?.label || sessionDuration + 'h';
      setSessionAlert({
        type: 'success',
        message: `Sesión configurada en ${label}. Aplica en tu próximo inicio de sesión.`,
      });
    } catch (err) {
      setSessionAlert({ type: 'error', message: 'Error al guardar la configuración' });
    } finally {
      setSessionLoading(false);
    }
  };

  const strengthOf = (p) => {
    if (!p) return null;
    if (p.length < 6) return { bars: 1, color: 'bg-red-400', label: 'Muy corta' };
    if (p.length < 8) return { bars: 2, color: 'bg-orange-400', label: 'Débil' };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { bars: 4, color: 'bg-green-500', label: 'Fuerte' };
    return { bars: 3, color: 'bg-yellow-400', label: 'Aceptable' };
  };
  const pwdStrength = strengthOf(pwd.new);

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona tu cuenta y las preferencias del sistema</p>
      </div>

      {/* Perfil actual */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 text-white flex items-center gap-4">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold">
          {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : 'Administrador'}
          </p>
          <p className="text-slate-300 text-sm truncate">{user?.email}</p>
          {user?.documentNumber && (
            <p className="text-slate-400 text-xs mt-0.5">DNI: {user.documentNumber}</p>
          )}
        </div>
        <div className="bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-medium text-blue-200">
          Admin
        </div>
      </div>

      <div className="space-y-6">

        {/* ── Cambiar contraseña ── */}
        <SettingsCard
          title="Cambiar contraseña"
          description="Actualiza tu contraseña de acceso al panel"
          icon="🔐"
        >
          <form onSubmit={handleChangePassword} className="space-y-4">
            <PasswordInput
              label="Contraseña actual"
              value={pwd.current}
              onChange={(e) => setPwd((f) => ({ ...f, current: e.target.value }))}
            />

            <div className="border-t border-gray-50 pt-4">
              <PasswordInput
                label="Nueva contraseña"
                value={pwd.new}
                onChange={(e) => setPwd((f) => ({ ...f, new: e.target.value }))}
                placeholder="Mínimo 6 caracteres"
              />
              {pwdStrength && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= pwdStrength.bars ? pwdStrength.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{pwdStrength.label}</span>
                </div>
              )}
            </div>

            <PasswordInput
              label="Confirmar nueva contraseña"
              value={pwd.confirm}
              onChange={(e) => setPwd((f) => ({ ...f, confirm: e.target.value }))}
            />

            {pwdAlert && <Alert type={pwdAlert.type} message={pwdAlert.message} />}

            <button
              type="submit"
              disabled={pwdLoading || !pwd.current || !pwd.new || !pwd.confirm}
              className="w-full bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              {pwdLoading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        </SettingsCard>

        {/* ── Cambiar correo ── */}
        <SettingsCard
          title="Cambiar correo electrónico"
          description="Actualiza el correo con el que ingresas al panel"
          icon="✉️"
        >
          <form onSubmit={handleChangeEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo actual
              </label>
              <div className="px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-500">
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nuevo correo electrónico
              </label>
              <input
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value }))}
                placeholder="nuevo@fintech.edu.pe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
              />
            </div>

            <PasswordInput
              label="Confirma con tu contraseña actual"
              value={emailForm.password}
              onChange={(e) => setEmailForm((f) => ({ ...f, password: e.target.value }))}
            />

            {emailAlert && <Alert type={emailAlert.type} message={emailAlert.message} />}

            <button
              type="submit"
              disabled={emailLoading || !emailForm.newEmail || !emailForm.password}
              className="w-full bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              {emailLoading ? 'Actualizando...' : 'Actualizar correo'}
            </button>
          </form>
        </SettingsCard>

        {/* ── Duración de sesión ── */}
        <SettingsCard
          title="Duración de la sesión"
          description="Tiempo que permaneces conectado antes de que el sistema te pida ingresar nuevamente"
          icon="⏱️"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {SESSION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSessionDuration(opt.value)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                    sessionDuration === opt.value
                      ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <p className="text-xs text-amber-700">
                ⚡ El cambio aplica en tu <strong>próximo inicio de sesión</strong>.
                Tu sesión actual no se ve afectada.
              </p>
            </div>

            {sessionAlert && <Alert type={sessionAlert.type} message={sessionAlert.message} />}

            <button
              type="button"
              onClick={handleSaveSession}
              disabled={sessionLoading || !settingsLoaded}
              className="w-full bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              {sessionLoading ? 'Guardando...' : 'Guardar configuración'}
            </button>
          </div>
        </SettingsCard>

      </div>
    </div>
  );
};

export default AdminSettings;
