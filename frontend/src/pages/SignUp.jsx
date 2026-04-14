import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] p-4">
      {/* Tarjeta de Registro (Un poco más ancha que el Login) */}
      <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#2A9D8F] rounded-lg mx-auto mb-4 flex items-center justify-center">
            {/* Icono de usuario simple */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-[#023047]">Crea tu cuenta gratis</h2>
          <p className="text-gray-400 text-sm mt-2">Únete a Fintech y financia tu futuro hoy.</p>
        </div>

        <form className="space-y-5">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] transition-colors" placeholder="Ej. Leo Student" />
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Institucional</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] transition-colors" placeholder="leo@senati.pe" />
          </div>
          
          {/* Campo Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F] transition-colors" placeholder="••••••••" />
          </div>

          {/* Checkbox Términos */}
          <div className="flex items-center">
            <input id="terms" type="checkbox" className="h-4 w-4 text-[#2A9D8F] focus:ring-[#2A9D8F] border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-500">
              Acepto los <a href="#" className="text-[#2A9D8F] hover:underline">términos y condiciones</a>
            </label>
          </div>

          <button className="w-full bg-[#2A9D8F] text-white py-3.5 rounded-xl font-bold hover:bg-[#21867a] transition-colors shadow-lg shadow-teal-900/10">
            Registrarme
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
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