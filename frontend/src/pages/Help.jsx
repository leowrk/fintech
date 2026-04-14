import React from "react";
import { Link } from "react-router-dom";

function Help() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const faqData = [
    {
      category: "general",
      pregunta: "¿Qué es Fintech y cómo funciona?",
      respuesta: "Fintech es una plataforma de financiamiento educativo que te permite adquirir equipos tecnológicos como laptops, tablets y herramientas especializadas para tus estudios sin necesidad de pagar el monto total por adelantado. Funciona mediante un sistema de cuotas mensuales adaptadas a tu presupuesto estudiantil."
    },
    {
      category: "general",
      pregunta: "¿Quiénes pueden solicitar un financiamiento?",
      respuesta: "Pueden solicitar financiamiento estudiantes mayores de 18 años, con DNI vigente, correo institucional de una universidad o centro de estudios aliado, y cuenta bancaria propia. También evaluamos tu historial académico como parte del proceso de aprobación."
    },
    {
      category: "solicitud",
      pregunta: "¿Cómo empiezo mi solicitud?",
      respuesta: "El proceso es simple: 1) Regístrate en nuestra plataforma con tu correo institucional, 2) Completa tus datos personales y académicos, 3) Elige el equipo de nuestro catálogo, 4) Espera la aprobación automática que toma minutos, 5) Firma el contrato digital y recibe tu equipo."
    },
    {
      category: "solicitud",
      pregunta: "¿Qué documentos necesito?",
      respuesta: "Necesitas: DNI vigente (escaneo o foto clara), constancia de matrícula o carnet universitario actual, comprobante de domicilio (recibo de servicios), y número de cuenta bancaria (CCI o número interbancario). Todos los documentos se suben digitalmente."
    },
    {
      category: "pagos",
      pregunta: "¿Cuáles son las formas de pago?",
      respuesta: "Puedes pagar tus cuotas mensuales mediante: Transferencia bancaria, Yape/Plin, agentes de pago (Banco de la Nación, Western Union), débito automático configurado desde tu cuenta bancaria, o tarjetas de crédito/débito a través de nuestra plataforma online."
    },
    {
      category: "pagos",
      pregunta: "¿Qué pasa si no puedo pagar una cuota a tiempo?",
      respuesta: "Si tienes dificultades para pagar, te recomendamos contactarnos inmediatamente. Podemos ofrecerte opciones como: reprogramación de pago, extensión de plazo sin penalidad, o planes alternativos temporales. La mora por atraso es de S/ 10 + 1% diario sobre el monto vencido."
    },
    {
      category: "equipos",
      pregunta: "¿Puedo elegir cualquier equipo del catálogo?",
      respuesta: "Sí, puedes elegir cualquier equipo del catálogo disponible, siempre que el monto se encuentre dentro de tu línea de crédito aprobada. Ofrecemos laptops básicas, premium, equipos para diseño, tablets, y accesorios tecnológicos adaptados a diferentes carreras."
    },
    {
      category: "equipos",
      pregunta: "¿El equipo incluye garantía?",
      respuesta: "Todos los equipos incluyen garantía oficial del fabricante (generalmente 1 año). Además, ofrecemos seguro contra robo y daños accidentales con cobertura del 80% del valor durante el primer año. El mantenimiento técnico es gratuito durante el período de financiamiento."
    },
    {
      category: "tasas",
      pregunta: "¿Cuáles son las tasas de interés?",
      respuesta: "Nuestras tasas son preferenciales para estudiantes: Laptop estándar (hasta S/ 3,000): 1.5% mensual (TEA 19.6%), Laptop premium (S/ 3,001-6,000): 1.9% mensual (TEA 25.1%), Equipos especializados (S/ 6,001-10,000): 2.2% mensual (TEA 29.9%). Sin costos ocultos ni comisiones ocultas."
    },
    {
      category: "tasas",
      pregunta: "¿Puedo pagar el financiamiento antes de tiempo?",
      respuesta: "Sí, puedes cancelar tu financiamiento en cualquier momento sin penalidad. Debes pagar el saldo pendiente más los intereses generados hasta la fecha de cancelación. No cobramos comisiones por pago anticipado."
    },
    {
      category: "beneficios",
      pregunta: "¿Qué beneficios adicionales ofrecen?",
      respuesta: "Ofrecemos beneficios exclusivos: 50% descuento en comisión de estudio, seguro de equipo gratis el primer año, periodos de gracia de 30 días en casos especiales, acceso a becas y descuentos educativos, soporte técnico prioritario 24/7, y capacitaciones tecnológicas gratuitas."
    },
    {
      category: "beneficios",
      pregunta: "¿Tienen programas de referidos?",
      respuesta: "Sí, nuestro programa de referidos te permite ganar descuentos adicionales: Por cada amigo que refieras y complete su financiamiento, ambos reciben S/ 100 de descuento en sus próximas cuotas. El descuento se aplica automáticamente en el siguiente pago programado."
    }
  ];

  const categories = [
    { id: "all", name: "Todas las categorías" },
    { id: "general", name: "Información General" },
    { id: "solicitud", name: "Proceso de Solicitud" },
    { id: "pagos", name: "Pagos y Cuotas" },
    { id: "equipos", name: "Equipos y Garantías" },
    { id: "tasas", name: "Tasas y Costos" },
    { id: "beneficios", name: "Beneficios y Promociones" }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.respuesta.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            className="text-sm font-medium text-[#023047] border-b-2 border-[#023047]"
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
            CENTRO DE AYUDA
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#023047] mb-6">
            ¿Cómo podemos <br />
            ayudarte hoy?
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Encuentra respuestas rápidas a tus preguntas sobre financiamiento,
            pagos, equipos y más. Si no encuentras lo que buscas, nuestro equipo
            está disponible para ayudarte.
          </p>
        </div>

        {/* --- BÚSQUEDA Y FILTROS --- */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100 mb-20">
          <div className="mb-8">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar tu pregunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#2A9D8F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* --- FAQ LIST --- */}
          <div className="space-y-4">
            {filteredFAQ.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No se encontraron preguntas que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              filteredFAQ.map((item, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-transparent open:border-[#2A9D8F] open:bg-white transition-all duration-300"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-[#023047] hover:text-[#2A9D8F] transition-colors list-none select-none">
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
                  <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-100/50 pt-4">
                    {item.respuesta}
                  </div>
                </details>
              ))
            )}
          </div>
        </div>

        {/* --- QUICK HELP --- */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Chat en vivo
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Habla con un asesor especializado en tiempo real de lunes a viernes
              de 9am a 6pm.
            </p>
            <button className="bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#21867a] transition-colors w-full">
              Iniciar chat
            </button>
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Llámanos
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Centro de atención telefónica disponible para consultas generales
              y soporte técnico.
            </p>
            <div className="space-y-2">
              <p className="font-bold text-[#023047]">+51 (1) 123 4567</p>
              <p className="text-sm text-gray-500">Lunes a viernes 9am-6pm</p>
            </div>
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#023047] mb-4">
              Email de soporte
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Envíanos un correo electrónico y responderemos en menos de 24
              horas hábiles.
            </p>
            <div className="space-y-2">
              <p className="font-bold text-[#023047]">soporte@fintech.edu.pe</p>
              <p className="text-sm text-gray-500">Respuesta: 24 horas</p>
            </div>
          </div>
        </div>

        {/* --- EMERGENCIAS --- */}
        <div className="bg-[#023047] rounded-[2.5rem] p-10 lg:p-16 text-white mb-20">
          <div className="text-center mb-8">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
              EMERGENCIAS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Soporte prioritario 24/7
            </h2>
            <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
              Para casos urgentes relacionados con el funcionamiento de tu equipo
              o problemas críticos de pago, nuestro equipo de emergencias está
              disponible 24 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-blue-100 mb-2">WhatsApp Emergencia</p>
              <p className="text-xl font-bold">+51 987 654 321</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Línea Directa</p>
              <p className="text-xl font-bold">+51 (1) 999 888</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Email Urgente</p>
              <p className="text-xl font-bold">urgente@fintech.edu.pe</p>
            </div>
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div className="bg-[#023047] rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left shadow-2xl shadow-blue-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="lg:w-1/2 z-10 mb-10 lg:mb-0">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-4 block">
              ¿NO ENCONTRASTE LO QUE BUSCAS?
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Nuestro equipo está <br /> aquí para ayudarte
            </h2>
            <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              No dudes en contactarnos si tienes preguntas adicionales o necesitas
              asistencia personalizada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 z-10">
            <Link
              to="/contact"
              className="bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/30 whitespace-nowrap"
            >
              Contactar Soporte
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              Crear Cuenta
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

export default Help;