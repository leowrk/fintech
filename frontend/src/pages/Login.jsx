import React from 'react';
import { Link } from 'react-router-dom'; // Importante para navegar

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#023047] rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h2 className="text-2xl font-bold text-[#023047]">Bienvenido de nuevo</h2>
          <p className="text-gray-400 text-sm mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Institucional</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F]" placeholder="leo@senati.pe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2A9D8F]" placeholder="••••••••" />
          </div>

          <button className="w-full bg-[#023047] text-white py-3.5 rounded-xl font-bold hover:bg-[#034060] transition-colors shadow-lg shadow-blue-900/10">
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          {/* Enlace para volver al Home o ir a Registro */}
          <Link to="/" className="text-[#2A9D8F] font-bold hover:underline">
            Volver al Inicio
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;