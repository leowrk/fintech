import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] font-sans text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      {/* --- NAVBAR --- */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#023047] rounded-tr-lg rounded-bl-lg"></div>
          <span className="text-xl font-bold tracking-tight text-[#023047]">
            Fintech
          </span>
        </div>

        {/* Links Centrales */}
        <div className="hidden md:flex space-x-10">
          <Link
            to="/catalog"
            className="text-sm font-medium text-gray-500 hover:text-[#023047] transition-colors"
          >
            Productos
          </Link>

          <Link
            to="/estudiantes"
            className="text-sm font-medium text-gray-500 hover:text-[#023047] transition-colors"
          >
            Estudiantes
          </Link>
          <Link
            to="/tasas"
            className="text-sm font-medium text-gray-500 hover:text-[#023047] transition-colors"
          >
            Tasas
          </Link>
          <Link
            to="/ayuda"
            className="text-sm font-medium text-gray-500 hover:text-[#023047] transition-colors"
          >
            Ayuda
          </Link>
        </div>

        {/* Botones Derecha */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/mi-postulacion"
                className="text-sm font-bold text-[#2A9D8F] hover:underline"
              >
                Mi Postulación
              </Link>
              <Link
                to="/catalog"
                className="text-sm font-medium text-gray-500 hover:text-[#023047] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver catálogo
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-bold text-[#023047] hover:bg-gray-50 px-5 py-2.5 rounded-lg transition-colors border border-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#2A9D8F] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/10"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="pt-16 pb-20 lg:pt-24 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[#023047] leading-[1.1] mb-6">
              Financia tu <br />
              educación <br />
              sin estrés.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
              La plataforma diseñada para estudiantes. Paga tus cuotas
              fácilmente, gestiona tu presupuesto y enfócate en estudiar.
            </p>

            <div className="flex items-center gap-2 max-w-md mb-12 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
              <input
                type="email"
                placeholder="Tu correo institucional"
                className="w-full px-4 py-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="bg-[#2A9D8F] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#21867a] whitespace-nowrap shadow-md flex items-center gap-2">
                Empezar
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Logos */}
            <div className="flex items-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0">
              <span className="font-extrabold text-xl tracking-tight text-[#023047]">
                SENATI
              </span>
              <span className="font-extrabold text-xl tracking-tight text-[#023047]">
                UPC
              </span>
              <span className="font-extrabold text-xl tracking-tight text-[#023047]">
                CERTUS
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-100/50 rounded-full blur-3xl -z-10"></div>

            {/* CONTENEDOR DE LA UI */}
            <div className="relative w-full max-w-md">
              {/* 1. LA TARJETA DEL FONDO */}
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 relative z-10">
                {/* Header Panel */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    L
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      Leo Student
                    </p>
                    <p className="text-sm text-gray-400">leo@senati.pe</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                    Crédito Aprobado
                  </p>
                  <h3 className="text-4xl font-extrabold text-[#023047]">
                    S/ 2,500.00
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Disponible: 18 Ene, 2026
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-white border-2 border-[#2A9D8F] rounded-xl relative">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-4 border-[#2A9D8F]"></div>
                      <span className="font-bold text-[#023047]">
                        Financiamiento Laptop
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      <span className="font-medium text-gray-500">
                        Préstamo Personal
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#023047] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#034060] transition-colors">
                  Solicitar Ahora
                </button>
              </div>

              {/* 2. LA TARJETA DE CRÉDITO FLOTANTE */}
              <div className="absolute -right-20 -top-0 w-64 h-100 bg-[#2A9D8F] rounded-3xl shadow-2xl p-6 flex flex-col justify-between text-white transform rotate-6 z-20 hover:rotate-0 transition-transform duration-500 ease-out border-t border-white/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-teal-100 font-medium mb-1">
                      Current Balance
                    </p>
                    <p className="text-2xl font-bold">S/ 450.00</p>
                  </div>
                  <div className="font-mono text-lg font-bold italic opacity-80">
                    VISA
                  </div>
                </div>

                <div className="w-10 h-8 rounded bg-yellow-200/20 border border-yellow-200/40 flex items-center justify-center">
                  <div className="w-6 h-[1px] bg-yellow-200/40"></div>
                </div>

                <div>
                  <div className="flex gap-4 mb-4">
                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="font-mono text-lg tracking-widest opacity-90">
                    **** 9821
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- SECCIÓN DE CARACTERÍSTICAS  --- */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto -mt-10 relative z-20 pb-8">
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-gray-50 pb-10">
            <div className="lg:w-1/2">
              <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
                Tu Futuro Financiero
              </span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#023047] leading-tight">
                Una experiencia que <br />
                crece con tus estudios.
              </h2>
            </div>
            <div className="lg:w-1/3">
              <p className="text-gray-500 text-sm leading-relaxed">
                Diseñamos un sistema operativo financiero que trabaja para ti.
                Olvídate de los trámites bancarios lentos y enfócate en aprobar
                el semestre.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2A9D8F] transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-[#2A9D8F] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-[#023047] mb-3">
                Transferencias Rápidas
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Recibe el desembolso de tu crédito directamente en tu cuenta
                bancaria o paga la pensión automáticamente.
              </p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2A9D8F] transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-[#2A9D8F] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-[#023047] mb-3">
                Cuentas Claras
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Gestiona tus cuotas, mira tu calendario de pagos y evita moras
                con nuestro sistema de alertas inteligentes.
              </p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2A9D8F] transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-[#2A9D8F] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-[#023047] mb-3">
                Seguridad Total
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tus datos académicos y financieros están encriptados con
                seguridad de grado bancario. Solo tú tienes el control.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* --- CÓMO FUNCIONA */}
      <div className="py-10 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#2A9D8F]/10 rounded-full blur-3xl transform -translate-x-10"></div>
            <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-xl relative z-10">
              <h3 className="text-xl font-bold text-[#023047] mb-6">
                Requisitos simples
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Ser estudiante activo
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  DNI vigente
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Correo institucional
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Tener cuenta bancaria propia
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-2 block">
              EL PROCESO
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-8">
              Ten tu equipo en <br /> 3 pasos simples
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#023047] text-lg">
                    Elige tu equipo
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Navega por nuestro catálogo y selecciona la laptop ideal
                    para tu carrera.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#023047] text-lg">
                    Evalúate al instante
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Llena tus datos y nuestro sistema te dirá tu línea de
                    crédito aprobada en segundos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#023047] text-lg">
                    Recibe y paga después
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Coordinamos la entrega a tu casa y empiezas a pagar tu
                    primera cuota el próximo mes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- SECCIÓN DE PREGUNTAS FRECUENTES  --- */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto mb-20 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#023047] mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Resolvemos las dudas más comunes para que pidas tu crédito con
              total confianza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pregunta: "¿Cuáles son los requisitos?",
                respuesta:
                  "Ser mayor de edad, tener DNI vigente, estar matriculado en una institución aliada y tener cuenta bancaria propia.",
              },
              {
                pregunta: "¿Cuánto demora la evaluación?",
                respuesta:
                  "Es automática. Recibes respuesta en minutos tras completar el formulario con tus datos personales.",
              },
              {
                pregunta: "¿Puedo adelantar pagos?",
                respuesta:
                  "Sí, puedes pagar cuotas adelantadas o cancelar el total de la deuda cuando quieras sin penalidades.",
              },
              {
                pregunta: "¿Tienen tienda física?",
                respuesta:
                  "Somos 100% digitales para ofrecerte mejores tasas, pero hacemos envíos seguros a todo el Perú.",
              },
              {
                pregunta: "¿Qué pasa si no pago a tiempo?",
                respuesta:
                  "Se aplicará una mora diaria. Te recomendamos contactarnos antes para reprogramar si tienes problemas.",
              },
              {
                pregunta: "¿Dan factura?",
                respuesta:
                  "Sí, todos los equipos se entregan con comprobante de pago electrónico a tu nombre.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-2xl border border-transparent open:border-[#2A9D8F] open:bg-white transition-all duration-300"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-[#023047] hover:text-[#2A9D8F] transition-colors list-none select-none">
                  <span>{item.pregunta}</span>
                  <span className="transition-transform group-open:rotate-180 text-[#2A9D8F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100/50 pt-3">
                  {item.respuesta}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
      {/* --- CTA SECTION --- */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto mb-20 relative z-10">
        <div className="bg-[#023047] rounded-[2.5rem] p-10 lg:p-20 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left shadow-2xl shadow-blue-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="lg:w-1/2 z-10 mb-10 lg:mb-0">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-4 block">
              EMPIEZA AHORA
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              ¿Listo para financiar <br /> tu carrera?
            </h2>
            <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Soporte para estudiantes con financiamiento simple, integraciones
              poderosas y herramientas de gestión de flujo de caja.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 z-10">
            <button className="bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/30 whitespace-nowrap">
              Crear Cuenta Gratis
            </button>
            <button className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Saber más
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-[#023047] rounded-tr-lg rounded-bl-lg"></div>
                <span className="text-xl font-bold tracking-tight text-[#023047]">
                  Fintech
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                La plataforma líder en financiamiento educativo en Perú.
                Comprometidos con tu futuro profesional.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#023047] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#023047] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#023047] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#023047] mb-6">Soluciones</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Para Estudiantes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Para Universidades
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Calculadora de Cuotas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Requisitos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#023047] mb-6">Compañía</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Carreras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Prensa
                  </a>
                </li>
                <li>
                 <Link
                    to="/contact"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#023047] mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Términos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2A9D8F] transition-colors"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Fintech. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
