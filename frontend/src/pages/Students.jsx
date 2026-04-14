import React from "react";
import { Link } from "react-router-dom";

function Students() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FBF9] to-[#E2F6F3] font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#023047] rounded-tr-lg rounded-bl-lg"></div>
          <span className="text-xl font-bold tracking-tight text-[#023047]">
            Fintech
          </span>
        </Link>

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
            className="text-sm font-medium text-[#023047] border-b-2 border-[#023047]"
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
        <div className="flex items-center gap-4">
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
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="pt-16 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
            PARA ESTUDIANTES
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#023047] mb-6">
            Financia tu <br />
            futuro educativo
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Accede a la tecnología que necesitas para tus estudios sin preocuparte
            por pagos iniciales. Te ofrecemos soluciones de financiamiento
            adaptadas a tus necesidades estudiantiles.
          </p>
        </div>

        {/* --- BENEFICIOS PRINCIPALES --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#2A9D8F]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Pagos Flexibles
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cuotas mensuales adaptadas a tu presupuesto. Paga mientras estudias
              sin afectar tu economía familiar.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#2A9D8F]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Aprobación Rápida
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Proceso de evaluación instantáneo. Recibe respuesta en minutos y
              obtén tu equipo sin trámites complicados.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[#2A9D8F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#2A9D8F]"
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
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Sin Garantías
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              No requerimos fiador ni garantías inmobiliarias. Tu historial
              académico es tu principal respaldo.
            </p>
          </div>
        </div>

        {/* --- REQUISITOS --- */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100 mb-20">
          <div className="text-center mb-12">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
              REQUISITOS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-4">
              ¿Qué necesitas para aplicar?
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Mantenemos nuestros requisitos simples para que puedas acceder a
              nuestro financiamiento sin complicaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Ser mayor de edad</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">DNI vigente</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Correo institucional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Cuenta bancaria propia</span>
            </div>
          </div>
        </div>

        {/* --- INSTITUCIONES ALIADAS --- */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
              INSTITUCIONES ALIADAS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-4">
              Estudias en una de estas instituciones?
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Tenemos convenios con las principales instituciones educativas del
              país para ofrecerte las mejores condiciones.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              "SENATI",
              "UPC",
              "CERTUS",
              "UNI",
              "PUCP",
              "USIL",
              "UNMSM",
              "UTP",
              "TECSUP",
              "IDAT",
              "CIBERTEC",
              "SENDA"
            ].map((institution) => (
              <div
                key={institution}
                className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="font-bold text-lg text-gray-600 hover:text-[#2A9D8F] transition-colors">
                  {institution}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- CÓMO FUNCIONA --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-2 block">
              EL PROCESO
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-8">
              Obtén tu equipo <br /> en 4 pasos simples
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Regístrate",
                  description: "Crea tu cuenta con tu correo institucional y completa tus datos personales."
                },
                {
                  step: "2",
                  title: "Elige tu equipo",
                  description: "Explora nuestro catálogo y selecciona la laptop o dispositivo que necesitas."
                },
                {
                  step: "3",
                  title: "Evaluación instantánea",
                  description: "Nuestro sistema evalúa tu solicitud y te da respuesta en minutos."
                },
                {
                  step: "4",
                  title: "Recibe y paga",
                  description: "Te entregamos el equipo y empiezas a pagar cuotas mensuales."
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#023047] text-lg mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#2A9D8F]/10 rounded-full blur-3xl"></div>
            <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-xl relative z-10">
              <h3 className="text-xl font-bold text-[#023047] mb-6">
                Beneficios exclusivos para estudiantes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Tasa de interés preferencial
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Plazos de pago extendidos
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Sin penalidades por pago adelantado
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Seguro de equipo incluido
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Soporte técnico prioritario
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Acceso a becas y descuentos
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div className="bg-[#023047] rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left shadow-2xl shadow-blue-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="lg:w-1/2 z-10 mb-10 lg:mb-0">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-4 block">
              COMIENZA HOY
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              ¿Listo para obtener <br /> tu equipo?
            </h2>
            <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Únete a miles de estudiantes que ya están financiando su futuro
              educativo con nosotros.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 z-10">
            <Link
              to="/signup"
              className="bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/30 whitespace-nowrap"
            >
              Crear Cuenta
            </Link>
            <Link
              to="/catalog"
              className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Ver Catálogo
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
            </Link>
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

export default Students;