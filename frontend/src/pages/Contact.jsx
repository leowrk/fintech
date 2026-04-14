import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado. Nos pondremos en contacto pronto.");
  };

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

      {/* --- HEADER --- */}
      <div className="pt-16 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
            CONTACTO
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#023047] mb-6">
            Estamos aquí para <br /> ayudarte
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes preguntas sobre nuestros productos, necesitas soporte técnico
            o quieres conocer más sobre nuestras soluciones educativas? Nuestro
            equipo está listo para asistirte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* --- FORMULARIO --- */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-[#023047] mb-8">
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                    placeholder="juan@universidad.edu.pe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                    placeholder="+51 987 654 321"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo de contacto *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="consulta">Consulta general</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="credito">Información sobre créditos</option>
                    <option value="queja">Queja o reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                  placeholder="Describe tu consulta o solicitud..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-[#2A9D8F] border-gray-300 rounded focus:ring-[#2A9D8F]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto que mis datos sean tratados según la política de
                  privacidad y que reciba comunicaciones sobre los servicios.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2A9D8F] text-white py-4 rounded-xl font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/20"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* --- INFORMACIÓN DE CONTACTO --- */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-[#023047] mb-8">
                Otras formas de contactarnos
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#2A9D8F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#023047] mb-2">Llámanos</h3>
                    <p className="text-gray-600 text-sm mb-1">
                      Central telefónica
                    </p>
                    <p className="text-[#2A9D8F] font-bold">+51 (1) 123 4567</p>
                    <p className="text-gray-600 text-sm mt-3 mb-1">
                      WhatsApp
                    </p>
                    <p className="text-[#2A9D8F] font-bold">+51 987 654 321</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#2A9D8F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#023047] mb-2">Escríbenos</h3>
                    <p className="text-gray-600 text-sm mb-1">
                      Correo general
                    </p>
                    <p className="text-[#2A9D8F] font-bold">info@fintech.edu.pe</p>
                    <p className="text-gray-600 text-sm mt-3 mb-1">
                      Soporte técnico
                    </p>
                    <p className="text-[#2A9D8F] font-bold">soporte@fintech.edu.pe</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#2A9D8F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#2A9D8F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#023047] mb-2">Visítanos</h3>
                    <p className="text-gray-600 text-sm">
                      Av. Javier Prado Este 1234, Oficina 502<br />
                      San Borja, Lima, Perú<br />
                      Lunes a viernes: 9:00 am - 6:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- HORARIOS DE ATENCIÓN --- */}
            <div className="bg-[#023047] rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Horarios de atención</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-100">Lunes a Viernes</span>
                  <span className="font-medium">9:00 am - 6:00 pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Sábados</span>
                  <span className="font-medium">9:00 am - 1:00 pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Domingos y Feriados</span>
                  <span className="font-medium">Cerrado</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <p className="text-sm text-blue-100">
                  <strong>Emergencias:</strong> WhatsApp disponible 24/7 para
                  casos urgentes de soporte técnico.
                </p>
              </div>
            </div>
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

export default Contact;