import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { registerByDni } = useAuth();

  const [form, setForm] = useState({
    documentNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { level: 1, label: 'Muy corta', color: 'bg-red-400' };
    if (p.length < 8) return { level: 2, label: 'Débil', color: 'bg-orange-400' };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { level: 4, label: 'Fuerte', color: 'bg-green-500' };
    return { level: 3, label: 'Aceptable', color: 'bg-yellow-400' };
  };

  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.documentNumber || form.documentNumber.length < 7) {
      setError('Ingresa un número de DNI válido');
      return;
    }
    if (!form.email) {
      setError('El correo electrónico es requerido');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!form.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);
    try {
      await registerByDni({
        documentNumber: form.documentNumber,
        email: form.email,
        password: form.password,
      });
      navigate('/catalog', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear la cuenta';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#2A9D8F] rounded-tr-lg rounded-bl-lg" />
            <span className="text-xl font-bold text-[#023047]">Fintech</span>
          </Link>
          <h2 className="text-2xl font-bold text-[#023047]">Crea tu cuenta</h2>
          <p className="text-gray-400 text-sm mt-1">Tu DNI es tu identificador principal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DNI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Número de DNI <span className="text-[#2A9D8F]">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={form.documentNumber}
              onChange={(e) => setForm((f) => ({ ...f, documentNumber: e.target.value.replace(/\D/g, '') }))}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors text-lg font-mono tracking-widest"
              placeholder="72345678"
            />
            <p className="text-xs text-gray-400 mt-1">Con este DNI ingresarás siempre a tu cuenta</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Correo electrónico <span className="text-gray-400 font-normal">(respaldo y notificaciones)</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            {/* Barra de fortaleza */}
            {strength && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= strength.level ? strength.color : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                className={`w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border focus:outline-none focus:ring-2 transition-colors ${
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : form.confirmPassword && form.password === form.confirmPassword
                    ? 'border-green-400 focus:border-green-400 focus:ring-green-100'
                    : 'border-gray-200 focus:border-[#2A9D8F] focus:ring-[#2A9D8F]/10'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              {form.confirmPassword && form.password === form.confirmPassword && (
                <span className="absolute right-12 top-3.5 text-green-500 text-xs">✓</span>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="terms"
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => setForm((f) => ({ ...f, acceptTerms: e.target.checked }))}
              className="mt-0.5 h-4 w-4 text-[#2A9D8F] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-500 leading-snug">
              Acepto los{' '}
              <a href="#" className="text-[#2A9D8F] hover:underline">
                términos y condiciones
              </a>{' '}
              y la política de privacidad
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2A9D8F] text-white py-3.5 rounded-xl font-bold hover:bg-[#21867a] transition-colors shadow-lg shadow-teal-900/10 disabled:opacity-60 text-base"
          >
            {loading ? 'Creando cuenta...' : 'Crear mi cuenta →'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-[#023047] font-bold hover:underline">
            Inicia Sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
