import React, { useState } from 'react';

const ApplicationModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    // Información personal
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dni: '',
    birthDate: '',
    
    // Información académica
    institution: '',
    career: '',
    semester: '',
    academicEmail: '',
    studentCode: '',
    
    // Información de domicilio
    address: '',
    department: '',
    province: '',
    district: '',
    reference: '',
    
    // Información financiera
    hasIncome: false,
    monthlyIncome: '',
    occupation: '',
    employerName: '',
    employerPhone: '',
    
    // Referencias personales
    reference1Name: '',
    reference1Phone: '',
    reference1Relationship: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relationship: '',
    
    // Información del producto
    downPayment: '0',
    paymentMonths: '12',
    hasReadTerms: false,
    acceptsTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación básica
    if (!formData.firstName) newErrors.firstName = 'Nombre requerido';
    if (!formData.lastName) newErrors.lastName = 'Apellido requerido';
    if (!formData.email) newErrors.email = 'Email requerido';
    if (!formData.phone) newErrors.phone = 'Teléfono requerido';
    if (!formData.dni || formData.dni.length !== 8) newErrors.dni = 'DNI inválido';
    if (!formData.birthDate) newErrors.birthDate = 'Fecha de nacimiento requerida';

    // Información académica
    if (!formData.institution) newErrors.institution = 'Institución requerida';
    if (!formData.career) newErrors.career = 'Carrera requerida';
    if (!formData.semester) newErrors.semester = 'Semestre requerido';
    if (!formData.academicEmail) newErrors.academicEmail = 'Email académico requerido';
    if (!formData.studentCode) newErrors.studentCode = 'Código de estudiante requerido';

    // Domicilio
    if (!formData.address) newErrors.address = 'Dirección requerida';
    if (!formData.department) newErrors.department = 'Departamento requerido';
    if (!formData.province) newErrors.province = 'Provincia requerida';
    if (!formData.district) newErrors.district = 'Distrito requerido';

    // Términos y condiciones
    if (!formData.acceptsTerms) newErrors.acceptsTerms = 'Debes aceptar los términos y condiciones';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Guardar en localStorage para demostración
      const application = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      existingApplications.push(application);
      localStorage.setItem('applications', JSON.stringify(existingApplications));

      alert('¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.');
      onClose();
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dni: '',
        birthDate: '',
        institution: '',
        career: '',
        semester: '',
        academicEmail: '',
        studentCode: '',
        address: '',
        department: '',
        province: '',
        district: '',
        reference: '',
        hasIncome: false,
        monthlyIncome: '',
        occupation: '',
        employerName: '',
        employerPhone: '',
        reference1Name: '',
        reference1Phone: '',
        reference1Relationship: '',
        reference2Name: '',
        reference2Phone: '',
        reference2Relationship: '',
        downPayment: '0',
        paymentMonths: '12',
        hasReadTerms: false,
        acceptsTerms: false
      });
      
    } catch (error) {
      alert('Error al enviar la solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !product) return null;

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
          className="relative inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-6xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Solicitud de Financiamiento</h3>
                <p className="text-blue-100">{product.name} - S/ {product.price.toLocaleString()}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-700 rounded p-1 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 px-6 py-4 max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Información Personal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombres *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Personal *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI *</label>
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      maxLength="8"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                  </div>
                </div>
              </div>

              {/* Información Académica */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Información Académica</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institución Educativa *</label>
                    <select
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.institution ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Selecciona una institución</option>
                      <option value="senati">SENAIT</option>
                      <option value="upc">UPC</option>
                      <option value="pucp">PUCP</option>
                      <option value="uni">UNI</option>
                      <option value="certus">CERTUS</option>
                      <option value="idat">IDAT</option>
                      <option value="cibertec">CIBERTEC</option>
                    </select>
                    {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrera *</label>
                    <input
                      type="text"
                      name="career"
                      value={formData.career}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.career ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.career && <p className="text-red-500 text-xs mt-1">{errors.career}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semestre *</label>
                    <input
                      type="number"
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      min="1"
                      max="12"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.semester ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Institucional *</label>
                    <input
                      type="email"
                      name="academicEmail"
                      value={formData.academicEmail}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.academicEmail ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.academicEmail && <p className="text-red-500 text-xs mt-1">{errors.academicEmail}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código de Estudiante *</label>
                    <input
                      type="text"
                      name="studentCode"
                      value={formData.studentCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.studentCode ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.studentCode && <p className="text-red-500 text-xs mt-1">{errors.studentCode}</p>}
                  </div>
                </div>
              </div>

              {/* Información de Domicilio */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Información de Domicilio</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Completa *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento *</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Selecciona</option>
                      <option value="lima">Lima</option>
                      <option value="arequipa">Arequipa</option>
                      <option value="cusco">Cusco</option>
                    </select>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provincia *</label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distrito *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                    <input
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Configuración de Pagos */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Configuración de Pagos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cuota Inicial</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">S/</span>
                      <input
                        type="number"
                        name="downPayment"
                        value={formData.downPayment}
                        onChange={handleInputChange}
                        min="0"
                        max={product.price}
                        className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plazo (meses)</label>
                    <select
                      name="paymentMonths"
                      value={formData.paymentMonths}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="18">18 meses</option>
                      <option value="24">24 meses</option>
                      <option value="36">36 meses</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Información importante:</strong> La tasa de interés será del 1.9% mensual (TEA 25.1%).
                    Puedes pagar tu financiamiento anticipadamente sin penalidades.
                  </p>
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Términos y Condiciones</h4>
                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="hasReadTerms"
                      checked={formData.hasReadTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      He leído y comprendido los términos y condiciones del servicio de financiamiento educativo
                    </span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptsTerms"
                      checked={formData.acceptsTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Acepto los términos y condiciones, la política de privacidad y autorizo el tratamiento de mis datos personales *
                    </span>
                  </label>
                  {errors.acceptsTerms && <p className="text-red-500 text-xs">{errors.acceptsTerms}</p>}
                </div>
              </div>
            </form>
          </div>

          {/* Footer actions */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;