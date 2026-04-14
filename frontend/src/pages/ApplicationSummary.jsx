import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ApplicationSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, product } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Guardar en localStorage para demostración
      const application = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      existingApplications.push(application);
      localStorage.setItem('applications', JSON.stringify(existingApplications));

      setSubmitted(true);
    } catch (error) {
      alert('Error al enviar la solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDocumentTypeText = (value) => {
    const types = {
      'DNI': 'DNI',
      'CE': 'Carnet de Extranjería'
    };
    return types[value] || value;
  };

  const getHousingTypeText = (value) => {
    const types = {
      'own': 'Propio',
      'rent': 'Alquiler',
      'family': 'Familiar'
    };
    return types[value] || value;
  };

  const getIncomeSourceText = (value) => {
    const sources = {
      'employee': 'Empleado',
      'business': 'Negocio propio',
      'independent': 'Trabajador independiente',
      'family': 'Apoyo familiar'
    };
    return sources[value] || value;
  };

  if (!formData || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No se encontraron datos</h1>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h1>
          <p className="text-gray-600 mb-6">
            Tu solicitud de financiamiento ha sido recibida correctamente. Un asesor revisará tu caso y te contactará pronto.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Número de solicitud:</strong> #{Date.now()}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Estado:</strong> Pendiente de revisión
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/formulario-financiamiento', { state: { product } })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Editar</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Fintech</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resumen de la Solicitud</h1>

        {/* Producto Seleccionado */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Producto Seleccionado</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-blue-700">Producto</p>
              <p className="font-medium text-blue-900">{formData.productName}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Precio</p>
              <p className="font-medium text-blue-900">S/ {formData.productPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Fecha de solicitud</p>
              <p className="font-medium text-blue-900">{new Date().toLocaleDateString('es-PE')}</p>
            </div>
          </div>
        </div>

        {/* Datos Personales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos Personales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Tipo de Documento</p>
              <p className="font-medium">{getDocumentTypeText(formData.documentType)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Número de Documento</p>
              <p className="font-medium">{formData.documentNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Celular</p>
              <p className="font-medium">{formData.cellPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo Electrónico</p>
              <p className="font-medium">{formData.email}</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                Verificado ✓
              </span>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="font-medium">{formData.homeAddress}, {formData.district}, {formData.province}, {formData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de Vivienda</p>
              <p className="font-medium">{getHousingTypeText(formData.housingType)}</p>
            </div>
            {formData.rentAmount && (
              <div>
                <p className="text-sm text-gray-500">Monto de Alquiler</p>
                <p className="font-medium">S/ {formData.rentAmount}</p>
              </div>
            )}
          </div>
        </div>

        {/* Información Académica */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Académica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Institución Educativa</p>
              <p className="font-medium">{formData.educationalInstitution}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ciclo de Estudios</p>
              <p className="font-medium">{formData.studyCycle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pensión Mensual</p>
              <p className="font-medium">S/ {formData.pension}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carrera</p>
              <p className="font-medium">{formData.career === 'other' ? formData.otherCareer : formData.career}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Código de Alumno</p>
              <p className="font-medium">{formData.studentCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">¿Quién paga la pensión?</p>
              <p className="font-medium">{formData.pensionPaymentMethod}</p>
            </div>
          </div>
          
          {formData.enrollmentFile && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Constancia de matrícula adjuntada
              </p>
            </div>
          )}
        </div>

        {/* Forma de Pago y Fuente de Ingresos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Forma de Pago y Fuente de Ingresos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Forma de Pago</p>
              <p className="font-medium">{formData.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fuente de Ingresos</p>
              <p className="font-medium">{getIncomeSourceText(formData.incomeSource)}</p>
            </div>
          </div>

          {formData.incomeSource === 'employee' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Información Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Cargo</p>
                  <p className="font-medium">{formData.jobTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Empresa</p>
                  <p className="font-medium">{formData.employerName}</p>
                </div>
              </div>
            </div>
          )}

          {formData.incomeSource === 'business' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Información del Negocio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tiene RUC</p>
                  <p className="font-medium">{formData.hasRUC === 'si' ? 'Sí' : 'No'}</p>
                </div>
                {formData.hasRUC === 'si' && (
                  <div>
                    <p className="text-sm text-gray-500">Número de RUC</p>
                    <p className="font-medium">{formData.rucNumber}</p>
                  </div>
                )}
                {formData.hasRUC === 'no' && (
                  <div>
                    <p className="text-sm text-gray-500">¿Cómo recibe dinero?</p>
                    <p className="font-medium">{formData.moneyReceivingMethod}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Rubro</p>
                  <p className="font-medium">{formData.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ingreso Mensual</p>
                  <p className="font-medium">S/ {formData.monthlyIncome}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirmación Final */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalles Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Fecha de Préstamo Deseada</p>
              <p className="font-medium">{formData.loanDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">¿Cómo nos conociste?</p>
              <p className="font-medium">{formData.howYouFoundUs}</p>
            </div>
            {formData.discountCoupon && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Cupón de Descuento</p>
                <p className="font-medium">{formData.discountCoupon}</p>
              </div>
            )}
          </div>
        </div>

        {/* Información de Verificaciones */}
        <div className="bg-green-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Verificaciones Completadas</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">Correo electrónico verificado</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">DNI verificado</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">Constancia de matrícula adjuntada</span>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/formulario-financiamiento', { state: { product } })}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Editar Información
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Enviando solicitud...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;