import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginByDni, login } = useAuth();

  const [mode, setMode] = useState('dni'); // 'dni' | 'email'
  const [form, setForm] = useState({ dni: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/catalog';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'dni' && !form.dni) {
      setError('Ingresa tu número de DNI');
      return;
    }
    if (mode === 'email' && !form.email) {
      setError('Ingresa tu correo electrónico');
      return;
    }
    if (!form.password) {
      setError('Ingresa tu contraseña');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'dni') {
        await loginByDni(form.dni, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales incorrectas';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setForm({ dni: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#023047] rounded-tr-lg rounded-bl-lg" />
            <span className="text-xl font-bold text-[#023047]">Fintech</span>
          </Link>
          <h2 className="text-2xl font-bold text-[#023047]">Bienvenido de nuevo</h2>
          <p className="text-gray-400 text-sm mt-1">Ingresa para ver el estado de tu postulación</p>
        </div>

        {/* Mode tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode('dni')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'dni'
                ? 'bg-white text-[#023047] shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🪪 Ingresar con DNI
          </button>
          <button
            type="button"
            onClick={() => switchMode('email')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'email'
                ? 'bg-white text-[#023047] shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            ✉️ Usar correo
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'dni' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Número de DNI
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                autoFocus
                value={form.dni}
                onChange={(e) => setForm((f) => ({ ...f, dni: e.target.value.replace(/\D/g, '') }))}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors text-lg font-mono tracking-widest"
                placeholder="72345678"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                autoFocus
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/10 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#023047] text-white py-3.5 rounded-xl font-bold hover:bg-[#034060] transition-colors shadow-lg shadow-blue-900/10 disabled:opacity-60 text-base"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          <p>
            ¿No tienes cuenta?{' '}
            <Link to="/signup" className="text-[#2A9D8F] font-bold hover:underline">
              Regístrate gratis
            </Link>
          </p>
          <p>
            <Link to="/catalog" className="text-gray-400 hover:text-gray-600">
              ← Ver catálogo sin registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
