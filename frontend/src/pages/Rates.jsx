import React from "react";
import { Link } from "react-router-dom";

function Rates() {
  const [amount, setAmount] = React.useState(2500);
  const [months, setMonths] = React.useState(12);

  const calculateMonthlyPayment = () => {
    const monthlyRate = 0.019; // 1.9% mensual
    const totalWithInterest = amount * (1 + monthlyRate * months);
    return (totalWithInterest / months).toFixed(2);
  };

  const calculateTotalInterest = () => {
    const monthlyRate = 0.019;
    const totalWithInterest = amount * (1 + monthlyRate * months);
    return (totalWithInterest - amount).toFixed(2);
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
            className="text-sm font-medium text-[#023047] border-b-2 border-[#023047]"
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
            TASAS Y TARIFAS
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#023047] mb-6">
            Tasas transparentes <br />
            para estudiantes
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Condiciones competitivas diseñadas especialmente para el financiamiento
            educativo. Sin costos ocultos ni letras pequeñas.
          </p>
        </div>

        {/* --- CALCULADORA --- */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-4">
              Calcula tu cuota
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Simula tu financiamiento y descubre tu cuota mensual
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Monto del préstamo: S/ {amount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>S/ 1,000</span>
                  <span>S/ 10,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Plazo: {months} meses
                </label>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>6 meses</span>
                  <span>36 meses</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setAmount(2000); setMonths(12); }}
                  className="py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Laptop Básica
                </button>
                <button
                  onClick={() => { setAmount(4000); setMonths(18); }}
                  className="py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Laptop Premium
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#023047] to-[#034060] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Resumen de tu financiamiento</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span className="text-blue-100">Monto solicitado:</span>
                  <span className="font-bold">S/ {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span className="text-blue-100">Plazo:</span>
                  <span className="font-bold">{months} meses</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span className="text-blue-100">Tasa mensual (TEA):</span>
                  <span className="font-bold">1.9%</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span className="text-blue-100">Total de intereses:</span>
                  <span className="font-bold">S/ {Number(calculateTotalInterest()).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Total a pagar:</span>
                  <span className="font-bold text-xl">S/ {(Number(amount) + Number(calculateTotalInterest())).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-100 mb-2">Tu cuota mensual:</p>
                <p className="text-3xl font-bold">S/ {Number(calculateMonthlyPayment()).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABLA DE TASAS --- */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-3 block">
              TASAS APLICABLES
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-4">
              Comparación de tasas
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Te ofrecemos las tasas más competitivas del mercado educativo
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#023047] text-white">
                  <tr>
                    <th className="px-8 py-4 text-left font-medium">Tipo de Financiamiento</th>
                    <th className="px-8 py-4 text-center font-medium">Tasa Mensual</th>
                    <th className="px-8 py-4 text-center font-medium">TEA</th>
                    <th className="px-8 py-4 text-center font-medium">Plazo Máximo</th>
                    <th className="px-8 py-4 text-center font-medium">Sin Garantía</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-[#023047]">Laptop Estándar</p>
                        <p className="text-sm text-gray-500">Hasta S/ 3,000</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-[#2A9D8F]">1.5%</td>
                    <td className="px-8 py-6 text-center">19.6%</td>
                    <td className="px-8 py-6 text-center">12 meses</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-[#023047]">Laptop Premium</p>
                        <p className="text-sm text-gray-500">S/ 3,001 - S/ 6,000</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-[#2A9D8F]">1.9%</td>
                    <td className="px-8 py-6 text-center">25.1%</td>
                    <td className="px-8 py-6 text-center">18 meses</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-[#023047]">Equipos de Diseño</p>
                        <p className="text-sm text-gray-500">S/ 6,001 - S/ 10,000</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-[#2A9D8F]">2.2%</td>
                    <td className="px-8 py-6 text-center">29.9%</td>
                    <td className="px-8 py-6 text-center">24 meses</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- COSTOS ADICIONALES --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-[#023047] mb-6">Costos Adicionales</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Comisión de estudio:</span>
                <span className="font-bold">S/ 50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seguro de equipo:</span>
                <span className="font-bold">2% del monto</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mora por pago atrasado:</span>
                <span className="font-bold">S/ 10 + 1% diario</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pago adelantado:</span>
                <span className="font-bold text-[#2A9D8F">Sin costo</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-[#023047] mb-6">Beneficios Estudiantiles</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5">
                  ✓
                </div>
                <span className="text-gray-600">50% descuento en comisión de estudio</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5">
                  ✓
                </div>
                <span className="text-gray-600">Seguro de equipo gratis el primer año</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5">
                  ✓
                </div>
                <span className="text-gray-600">Periodo de gracia de 30 días</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5">
                  ✓
                </div>
                <span className="text-gray-600">Sin costo por cancelación anticipada</span>
              </div>
            </div>
          </div>

          <div className="bg-[#023047] rounded-3xl shadow-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">¿Por qué nuestras tasas?</h3>
            <div className="space-y-4 text-sm text-blue-100">
              <p>
                • Tasa preferencial para estudiantes validados
              </p>
              <p>
                • Sin intermediarios ni costos bancarios
              </p>
              <p>
                • Financiamiento directo y transparente
              </p>
              <p>
                • Flexibilidad en plazos y pagos
              </p>
              <p>
                • Apoyo a la educación como misión social
              </p>
            </div>
          </div>
        </div>

        {/* --- COMPARACIÓN CON BANCOS --- */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl shadow-gray-100/50 border border-gray-100 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#023047] mb-4">
              Fintech vs. Banca Tradicional
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Comparación real de costos para un financiamiento de S/ 3,000 a 12 meses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-[#2A9D8F] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2A9D8F] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#023047]">Fintech</h4>
                  <p className="text-sm text-gray-500">Financiamiento educativo</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasa mensual:</span>
                  <span className="font-bold text-[#2A9D8F]">1.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuota mensual:</span>
                  <span className="font-bold">S/ 289</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total intereses:</span>
                  <span className="font-bold">S/ 468</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requisitos:</span>
                  <span className="text-sm">Sencillos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiempo aprobación:</span>
                  <span className="text-sm">Minutos</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#023047]">Banco Tradicional</h4>
                  <p className="text-sm text-gray-500">Tarjeta de crédito</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasa mensual:</span>
                  <span className="font-bold text-red-500">3.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuota mensual:</span>
                  <span className="font-bold">S/ 325</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total intereses:</span>
                  <span className="font-bold">S/ 900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requisitos:</span>
                  <span className="text-sm">Complejos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiempo aprobación:</span>
                  <span className="text-sm">Semanas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div className="bg-[#023047] rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left shadow-2xl shadow-blue-900/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="lg:w-1/2 z-10 mb-10 lg:mb-0">
            <span className="text-[#2A9D8F] font-bold text-xs tracking-widest uppercase mb-4 block">
              AHORRA DINERO
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Comienza tu financiamiento <br /> con la mejor tasa
            </h2>
            <p className="text-blue-100/80 text-sm lg:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Aprovecha nuestras tasas preferenciales y obtén el equipo que
              necesitas para tus estudios.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 z-10">
            <Link
              to="/signup"
              className="bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#21867a] transition-all shadow-lg shadow-teal-900/30 whitespace-nowrap"
            >
              Solicitar Ahora
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Consultar Asesor
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

export default Rates;