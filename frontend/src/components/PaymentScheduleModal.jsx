import React, { useState } from 'react';

const PaymentScheduleModal = ({ isOpen, onClose, product }) => {
  const [months, setMonths] = useState(12);
  const [interestRate, setInterestRate] = useState(1.9); // 1.9% mensual
  const [downPayment, setDownPayment] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateMonthlyPayment = () => {
    const financedAmount = product.price - downPayment;
    const monthlyRate = interestRate / 100;
    const totalAmount = financedAmount * (1 + monthlyRate * months);
    return totalAmount / months;
  };

  const generateAmortizationSchedule = () => {
    const schedule = [];
    const financedAmount = product.price - downPayment;
    const monthlyRate = interestRate / 100;
    const monthlyPayment = calculateMonthlyPayment();
    let remainingBalance = financedAmount;

    for (let i = 1; i <= months; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, remainingBalance).toFixed(2)
      });
    }

    return schedule;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalInterest = (monthlyPayment * months - (product.price - downPayment)).toFixed(2);
  const totalAmount = (product.price - downPayment + parseFloat(totalInterest)).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div 
          className="relative inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cronograma de Pagos</h3>
                <p className="text-sm text-gray-600">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuración */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plazo (meses)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="6"
                      max="36"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{months}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[6, 12, 18, 24, 36].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          months === m
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuota inicial (S/)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={product.price}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tasa mensual (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Resumen del Financiamiento</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Valor del producto:</span>
                      <span className="font-medium">S/ {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Cuota inicial:</span>
                      <span className="font-medium">S/ {downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Monto financiado:</span>
                      <span className="font-medium">S/ {(product.price - downPayment).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="text-blue-700">Cuota mensual:</span>
                      <span className="font-bold text-lg">S/ {monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total intereses:</span>
                      <span className="font-medium">S/ {totalInterest}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="text-blue-700">Total a pagar:</span>
                      <span className="font-bold text-lg">S/ {totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de amortización */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Tabla de Amortización</h4>
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showAmortization ? 'Ocultar' : 'Mostrar'} detalles
                  </button>
                </div>

                {showAmortization && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuota</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capital</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interés</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {generateAmortizationSchedule().map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium text-gray-900">{row.month}</td>
                            <td className="px-3 py-2 text-gray-900">S/ {row.payment}</td>
                            <td className="px-3 py-2 text-gray-600">S/ {row.principal}</td>
                            <td className="px-3 py-2 text-gray-600">S/ {row.interest}</td>
                            <td className="px-3 py-2 text-gray-900 font-medium">S/ {row.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Información Importante</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Tasa efectiva anual (TEA): {(Math.pow(1 + interestRate/100, 12) - 1) * 100}%</li>
                    <li>• Los pagos se realizan mensualmente por fecha de vencimiento</li>
                    <li>• Se permite pagos adelantados sin penalidad</li>
                    <li>• Tasa de mora: 1% diario sobre saldo vencido</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert("Cronograma guardado y listo para solicitar financiamiento");
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScheduleModal;