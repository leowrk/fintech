import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { applicationsAPI } from '../services/api';

const FinancingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Producto seleccionado desde el catálogo
  const selectedProduct = location.state?.product;
  
  // Estado del formulario
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Selección de equipo
    productId: selectedProduct?.id || '',
    productName: selectedProduct?.name || '',
    productPrice: selectedProduct?.price || 0,
    
    // Datos personales
    documentType: 'DNI',
    documentNumber: '',
    cellPhone: '',
    email: '',
    homeAddress: '',
    department: '',
    province: '',
    district: '',
    housingType: '',
    rentAmount: '',
    acceptsTerms: false,
    acceptsAdvertisingPolicy: false,
    
    // Evidencia de datos personales
    emailVerified: false,
    dniVerified: false,
    dniPhoto: null,
    
    // Información académica
    educationalInstitution: '',
    studyCycle: '',
    pension: '',
    career: '',
    otherCareer: '',
    studentCode: '',
    pensionPaymentMethod: '',
    
    // Evidencia académica
    enrollmentFile: null,
    
    // Forma de pago y fuente de ingresos
    paymentMethod: '',
    incomeSource: '',
    
    // Datos laborales - empleados
    jobTitle: '',
    employerName: '',
    paymentProof: null,
    
    // Datos laborales - negocio personal
    hasRUC: 'no',
    rucNumber: '',
    moneyReceivingMethod: '',
    businessType: '',
    monthlyIncome: '',
    
    // Confirmación de solicitud
    loanDate: '',
    howYouFoundUs: '',
    discountCoupon: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Opciones para selects
  const documentTypes = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'Carnet de Extranjería' }
  ];

  const institutions = [
    { value: 'senati', label: 'SENAIT' },
    { value: 'upc', label: 'UPC' },
    { value: 'pucp', label: 'PUCP' },
    { value: 'uni', label: 'UNI' },
    { value: 'certus', label: 'CERTUS' },
    { value: 'idat', label: 'IDAT' },
    { value: 'cibertec', label: 'CIBERTEC' },
    { value: 'tecsup', label: 'TECSUP' },
    { value: 'usil', label: 'USIL' },
    { value: 'utp', label: 'UTP' },
    { value: 'other', label: 'Otra' }
  ];

  const careers = [
    { value: 'ing-sistemas', label: 'Ingeniería de Sistemas' },
    { value: 'ing-industrial', label: 'Ingeniería Industrial' },
    { value: 'ing-electronica', label: 'Ingeniería Electrónica' },
    { value: 'diseño-grafico', label: 'Diseño Gráfico' },
    { value: 'administracion', label: 'Administración' },
    { value: 'contabilidad', label: 'Contabilidad' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'diseño-web', label: 'Diseño Web' },
    { value: 'programacion', label: 'Programación' },
    { value: 'other', label: 'Otra (Especificar)' }
  ];

  const cycles = [
    { value: '1', label: 'I Ciclo' },
    { value: '2', label: 'II Ciclo' },
    { value: '3', label: 'III Ciclo' },
    { value: '4', label: 'IV Ciclo' },
    { value: '5', label: 'V Ciclo' },
    { value: '6', label: 'VI Ciclo' },
    { value: '7', label: 'VII Ciclo' },
    { value: '8', label: 'VIII Ciclo' },
    { value: '9', label: 'IX Ciclo' },
    { value: '10', label: 'X Ciclo' }
  ];

  const departments = [
    { value: 'lima', label: 'Lima' },
    { value: 'arequipa', label: 'Arequipa' },
    { value: 'cusco', label: 'Cusco' },
    { value: 'la-libertad', label: 'La Libertad' },
    { value: 'piura', label: 'Piura' },
    { value: 'lambayeque', label: 'Lambayeque' }
  ];

  const housingTypes = [
    { value: 'own', label: 'Propio' },
    { value: 'rent', label: 'Alquiler' },
    { value: 'family', label: 'Familiar' }
  ];

  const pensionPaymentMethods = [
    { value: 'parent', label: 'Mis padres pagan' },
    { value: 'myself', label: 'Pago yo mismo' },
    { value: 'loan', label: 'Con préstamo' },
    { value: 'scholarship', label: 'Beca' }
  ];

  const incomeSources = [
    { value: 'employee', label: 'Empleado' },
    { value: 'business', label: 'Negocio propio' },
    { value: 'independent', label: 'Trabajador independiente' },
    { value: 'family', label: 'Apoyo familiar' }
  ];

  const paymentMethods = [
    { value: 'bank-account', label: 'Cuenta bancaria' },
    { value: 'yape-plin', label: 'Yape/Plin' },
    { value: 'cash', label: 'Efectivo' }
  ];

  const businessTypes = [
    { value: 'retail', label: 'Venta minorista' },
    { value: 'services', label: 'Servicios' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'manufacturing', label: 'Manufactura' },
    { value: 'other', label: 'Otro' }
  ];

  const paymentProofs = [
    { value: 'payslip', label: 'Boleta de pagos' },
    { value: 'receipt', label: 'Recibo por honorarios' },
    { value: 'contract', label: 'Contrato' },
    { value: 'bank-statement', label: 'Estado de cuenta' }
  ];

  const howYouFoundUsOptions = [
    { value: 'social-media', label: 'Redes sociales' },
    { value: 'friend', label: 'Recomendación de un amigo' },
    { value: 'search-engine', label: 'Buscador (Google, etc.)' },
    { value: 'advertisement', label: 'Publicidad' },
    { value: 'university', label: 'Universidad/Centro de estudios' },
    { value: 'other', label: 'Otro' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Datos personales
        if (!formData.documentNumber) newErrors.documentNumber = 'El número de documento es requerido';
        if (!formData.cellPhone) newErrors.cellPhone = 'El celular es requerido';
        if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
        if (!formData.homeAddress) newErrors.homeAddress = 'La dirección es requerida';
        if (!formData.department) newErrors.department = 'El departamento es requerido';
        if (!formData.province) newErrors.province = 'La provincia es requerida';
        if (!formData.district) newErrors.district = 'El distrito es requerido';
        if (!formData.housingType) newErrors.housingType = 'El tipo de vivienda es requerido';
        if (formData.housingType === 'rent' && !formData.rentAmount) {
          newErrors.rentAmount = 'El monto de alquiler es requerido';
        }
        if (!formData.acceptsTerms) newErrors.acceptsTerms = 'Debes aceptar los términos y condiciones';
        if (!formData.acceptsAdvertisingPolicy) newErrors.acceptsAdvertisingPolicy = 'Debes aceptar las políticas de publicidad';
        if (!formData.dniVerified) newErrors.dniVerified = 'Debes verificar tu DNI';
        if (!formData.emailVerified) newErrors.emailVerified = 'Debes verificar tu correo electrónico';
        break;

      case 2: // Información académica
        if (!formData.educationalInstitution) newErrors.educationalInstitution = 'La institución es requerida';
        if (!formData.studyCycle) newErrors.studyCycle = 'El ciclo es requerido';
        if (!formData.pension) newErrors.pension = 'La pension es requerida';
        if (!formData.career) newErrors.career = 'La carrera es requerida';
        if (formData.career === 'other' && !formData.otherCareer) {
          newErrors.otherCareer = 'Especifica tu carrera';
        }
        if (!formData.studentCode) newErrors.studentCode = 'El código es requerido';
        if (!formData.pensionPaymentMethod) newErrors.pensionPaymentMethod = 'El método de pago es requerido';
        if (!formData.enrollmentFile) newErrors.enrollmentFile = 'La constancia de matrícula es requerida';
        break;

      case 3: // Forma de pago y fuente de ingresos
        if (!formData.paymentMethod) newErrors.paymentMethod = 'El método de pago es requerido';
        if (!formData.incomeSource) newErrors.incomeSource = 'La fuente de ingresos es requerida';
        
        if (formData.incomeSource === 'employee') {
          if (!formData.jobTitle) newErrors.jobTitle = 'El cargo es requerido';
          if (!formData.employerName) newErrors.employerName = 'El empleador es requerido';
          if (!formData.paymentProof) newErrors.paymentProof = 'El soporte de pago es requerido';
        }
        
        if (formData.incomeSource === 'business') {
          if (!formData.hasRUC) newErrors.hasRUC = 'Especifica si tienes RUC';
          if (formData.hasRUC === 'si' && !formData.rucNumber) {
            newErrors.rucNumber = 'El número de RUC es requerido';
          }
          if (formData.hasRUC === 'no' && !formData.moneyReceivingMethod) {
            newErrors.moneyReceivingMethod = 'El método de recepción es requerido';
          }
          if (!formData.businessType) newErrors.businessType = 'El rubro es requerido';
          if (!formData.monthlyIncome) newErrors.monthlyIncome = 'El ingreso mensual es requerido';
        }
        break;

      case 4: // Confirmación de solicitud
        if (!formData.loanDate) newErrors.loanDate = 'La fecha del préstamo es requerida';
        if (!formData.howYouFoundUs) newErrors.howYouFoundUs = 'Selecciona cómo nos conociste';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleVerifyEmail = async () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Ingresa tu correo electrónico' }));
      return;
    }
    
    setLoading(true);
    // Simular envío de código de verificación
    setTimeout(() => {
      const code = prompt('Ingresa el código de verificación enviado a tu correo:');
      if (code === '123456') {
        setFormData(prev => ({ ...prev, emailVerified: true }));
        alert('¡Correo electrónico verificado!');
      } else {
        alert('Código incorrecto');
      }
      setLoading(false);
    }, 2000);
  };

  const handleVerifyDNI = () => {
    if (!formData.dniPhoto) {
      setErrors(prev => ({ ...prev, dniPhoto: 'Adjunta una foto de tu DNI' }));
      return;
    }
    
    setLoading(true);
    // Simular verificación de DNI
    setTimeout(() => {
      setFormData(prev => ({ ...prev, dniVerified: true }));
      alert('¡DNI verificado correctamente!');
      setLoading(false);
    }, 2000);
  };

  const goToSummary = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      const payload = {
        productId: formData.productId || undefined,
        productName: formData.productName,
        productPrice: Number(formData.productPrice),
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        cellPhone: formData.cellPhone,
        email: formData.email,
        homeAddress: formData.homeAddress,
        department: formData.department,
        province: formData.province,
        district: formData.district,
        housingType: formData.housingType,
        rentAmount: formData.rentAmount ? Number(formData.rentAmount) : undefined,
        educationalInstitution: formData.educationalInstitution,
        studyCycle: formData.studyCycle,
        pension: formData.pension ? Number(formData.pension) : undefined,
        career: formData.career,
        otherCareer: formData.otherCareer || undefined,
        studentCode: formData.studentCode,
        pensionPaymentMethod: formData.pensionPaymentMethod,
        paymentMethod: formData.paymentMethod,
        incomeSource: formData.incomeSource,
        financialData: {
          jobTitle: formData.jobTitle,
          employerName: formData.employerName,
          monthlyIncome: formData.monthlyIncome ? Number(formData.monthlyIncome) : undefined,
          hasRUC: formData.hasRUC,
          rucNumber: formData.rucNumber,
          moneyReceivingMethod: formData.moneyReceivingMethod,
          businessType: formData.businessType,
        },
        howYouFoundUs: formData.howYouFoundUs,
        discountCoupon: formData.discountCoupon || undefined,
        acceptsTerms: formData.acceptsTerms,
        personalData: { firstName: formData.firstName, lastName: formData.lastName },
      };

      const res = await applicationsAPI.create(payload);
      navigate('/resumen', { state: { formData, product: selectedProduct, applicationId: res.data.id } });
    } catch (err) {
      const msg = err.response?.data?.message;
      alert(Array.isArray(msg) ? msg.join('\n') : (msg || 'Error al enviar la solicitud. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No se seleccionó ningún producto</h1>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Volver</span>
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
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step
                      ? 'bg-blue-600 text-white'
                      : currentStep > step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <div className={`h-1 w-20 ${
                  step === 4 ? 'hidden' : currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className={`text-center ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Datos Personales
            </div>
            <div className={`text-center ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Información Académica
            </div>
            <div className={`text-center ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Forma de Pago
            </div>
            <div className={`text-center ${currentStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Confirmación
            </div>
          </div>
        </div>

        {/* Producto Seleccionado */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm font-bold">Producto</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{formData.productName}</h3>
              <p className="text-sm text-gray-600">Precio: S/ {formData.productPrice.toLocaleString()}</p>
            </div>
            <button
              onClick={() => navigate('/catalog')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Cambiar producto
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            /* PASO 1: DATOS PERSONALES */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos Personales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento *
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {documentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    maxLength={formData.documentType === 'DNI' ? '8' : '12'}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.documentNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={formData.documentType === 'DNI' ? '12345678' : '000000000000'}
                  />
                  {errors.documentNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cellPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="987 654 321"
                  />
                  {errors.cellPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.cellPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ejemplo@correo.com"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
                      disabled={loading || !formData.email}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {formData.emailVerified ? 'Verificado ✓' : 'Verificar'}
                    </button>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  {errors.emailVerified && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailVerified}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección de Domicilio *
                </label>
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.homeAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Av. Principal 123, Urbanización"
                />
                {errors.homeAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.homeAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.province ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nombre de la provincia"
                  />
                  {errors.province && (
                    <p className="text-red-500 text-xs mt-1">{errors.province}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distrito *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.district ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nombre del distrito"
                  />
                  {errors.district && (
                    <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Vivienda *
                  </label>
                  <select
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.housingType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {housingTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.housingType && (
                    <p className="text-red-500 text-xs mt-1">{errors.housingType}</p>
                  )}
                </div>

                {formData.housingType === 'rent' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto del Alquiler *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">S/</span>
                      <input
                        type="number"
                        name="rentAmount"
                        value={formData.rentAmount}
                        onChange={handleInputChange}
                        className={`w-full pl-8 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.rentAmount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="500"
                      />
                    </div>
                    {errors.rentAmount && (
                      <p className="text-red-500 text-xs mt-1">{errors.rentAmount}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Evidencia de Datos */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Evidencia de Datos</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verificar DNI *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      name="dniPhoto"
                      onChange={handleInputChange}
                      accept="image/*"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.dniPhoto ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyDNI}
                      disabled={loading || !formData.dniPhoto}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {formData.dniVerified ? 'Verificado ✓' : 'Verificar'}
                    </button>
                  </div>
                  {errors.dniPhoto && (
                    <p className="text-red-500 text-xs mt-1">{errors.dniPhoto}</p>
                  )}
                  {errors.dniVerified && (
                    <p className="text-red-500 text-xs mt-1">{errors.dniVerified}</p>
                  )}
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="border-t pt-6">
                <div className="space-y-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptsTerms"
                      checked={formData.acceptsTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Acepto los términos y condiciones del servicio de financiamiento educativo
                    </span>
                  </label>
                  {errors.acceptsTerms && (
                    <p className="text-red-500 text-xs ml-7">{errors.acceptsTerms}</p>
                  )}

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptsAdvertisingPolicy"
                      checked={formData.acceptsAdvertisingPolicy}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Acepto las políticas de publicidad y tratamiento de datos personales
                    </span>
                  </label>
                  {errors.acceptsAdvertisingPolicy && (
                    <p className="text-red-500 text-xs ml-7">{errors.acceptsAdvertisingPolicy}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            /* PASO 2: INFORMACIÓN ACADÉMICA */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Académica</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institución Educativa *
                  </label>
                  <select
                    name="educationalInstitution"
                    value={formData.educationalInstitution}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.educationalInstitution ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {institutions.map(inst => (
                      <option key={inst.value} value={inst.value}>{inst.label}</option>
                    ))}
                  </select>
                  {errors.educationalInstitution && (
                    <p className="text-red-500 text-xs mt-1">{errors.educationalInstitution}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciclo de Estudios *
                  </label>
                  <select
                    name="studyCycle"
                    value={formData.studyCycle}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.studyCycle ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {cycles.map(cycle => (
                      <option key={cycle.value} value={cycle.value}>{cycle.label}</option>
                    ))}
                  </select>
                  {errors.studyCycle && (
                    <p className="text-red-500 text-xs mt-1">{errors.studyCycle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensualidad de Pension *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">S/</span>
                    <input
                      type="number"
                      name="pension"
                      value={formData.pension}
                      onChange={handleInputChange}
                      className={`w-full pl-8 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.pension ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="500"
                    />
                  </div>
                  {errors.pension && (
                    <p className="text-red-500 text-xs mt-1">{errors.pension}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carrera *
                  </label>
                  <select
                    name="career"
                    value={formData.career}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.career ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {careers.map(career => (
                      <option key={career.value} value={career.value}>{career.label}</option>
                    ))}
                  </select>
                  {errors.career && (
                    <p className="text-red-500 text-xs mt-1">{errors.career}</p>
                  )}
                </div>

                {formData.career === 'other' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especifica tu carrera *
                    </label>
                    <input
                      type="text"
                      name="otherCareer"
                      value={formData.otherCareer}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.otherCareer ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nombre de tu carrera"
                    />
                    {errors.otherCareer && (
                      <p className="text-red-500 text-xs mt-1">{errors.otherCareer}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código de Alumno *
                  </label>
                  <input
                    type="text"
                    name="studentCode"
                    value={formData.studentCode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.studentCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2021-0123"
                  />
                  {errors.studentCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.studentCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo pagas tu pensión? *
                  </label>
                  <select
                    name="pensionPaymentMethod"
                    value={formData.pensionPaymentMethod}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pensionPaymentMethod ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {pensionPaymentMethods.map(method => (
                      <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                  </select>
                  {errors.pensionPaymentMethod && (
                    <p className="text-red-500 text-xs mt-1">{errors.pensionPaymentMethod}</p>
                  )}
                </div>
              </div>

              {/* Evidencia Académica */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Evidencia de Datos Académicos</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Constancia de Matrícula del Ciclo *
                  </label>
                  <input
                    type="file"
                    name="enrollmentFile"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.enrollmentFile ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.enrollmentFile && (
                    <p className="text-red-500 text-xs mt-1">{errors.enrollmentFile}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceptados: PDF, JPG, PNG (Máximo 5MB)
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            /* PASO 3: FORMA DE PAGO Y FUENTE DE INGRESOS */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Forma de Pago y Fuente de Ingresos</h2>
              
              {/* Forma de pago */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forma de Pago Preferida *
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona</option>
                  {paymentMethods.map(method => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
                )}
              </div>

              {/* Fuente de ingresos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuente de Ingresos *
                </label>
                <select
                  name="incomeSource"
                  value={formData.incomeSource}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.incomeSource ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona</option>
                  {incomeSources.map(source => (
                    <option key={source.value} value={source.value}>{source.label}</option>
                  ))}
                </select>
                {errors.incomeSource && (
                  <p className="text-red-500 text-xs mt-1">{errors.incomeSource}</p>
                )}
              </div>

              {/* Información según fuente de ingresos */}
              {formData.incomeSource === 'employee' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Laboral - Empleado</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo *
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Asistente administrativo"
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Empresa *
                      </label>
                      <input
                        type="text"
                        name="employerName"
                        value={formData.employerName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.employerName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Empresa SAC"
                      />
                      {errors.employerName && (
                        <p className="text-red-500 text-xs mt-1">{errors.employerName}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soporte de Pago *
                      </label>
                      <select
                        name="paymentProof"
                        value={formData.paymentProof}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.paymentProof ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona</option>
                        {paymentProofs.map(proof => (
                          <option key={proof.value} value={proof.value}>{proof.label}</option>
                        ))}
                      </select>
                      {errors.paymentProof && (
                        <p className="text-red-500 text-xs mt-1">{errors.paymentProof}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {formData.incomeSource === 'business' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Negocio</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Tienes RUC? *
                      </label>
                      <select
                        name="hasRUC"
                        value={formData.hasRUC}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.hasRUC ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                      </select>
                      {errors.hasRUC && (
                        <p className="text-red-500 text-xs mt-1">{errors.hasRUC}</p>
                      )}
                    </div>

                    {formData.hasRUC === 'si' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de RUC *
                        </label>
                        <input
                          type="text"
                          name="rucNumber"
                          value={formData.rucNumber}
                          onChange={handleInputChange}
                          maxLength="11"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.rucNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="20123456789"
                        />
                        {errors.rucNumber && (
                          <p className="text-red-500 text-xs mt-1">{errors.rucNumber}</p>
                        )}
                      </div>
                    )}

                    {formData.hasRUC === 'no' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Cómo recibes el dinero? *
                        </label>
                        <input
                          type="text"
                          name="moneyReceivingMethod"
                          value={formData.moneyReceivingMethod}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.moneyReceivingMethod ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Transferencia bancaria, efectivo, etc."
                        />
                        {errors.moneyReceivingMethod && (
                          <p className="text-red-500 text-xs mt-1">{errors.moneyReceivingMethod}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rubro *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.businessType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona</option>
                        {businessTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {errors.businessType && (
                        <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ingreso Mensual *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">S/</span>
                        <input
                          type="number"
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onChange={handleInputChange}
                          className={`w-full pl-8 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="2000"
                        />
                      </div>
                      {errors.monthlyIncome && (
                        <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            /* PASO 4: CONFIRMACIÓN DE SOLICITUD */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmación de Solicitud</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Préstamo Deseada *
                  </label>
                  <input
                    type="date"
                    name="loanDate"
                    value={formData.loanDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.loanDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.loanDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.loanDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo te enteraste de nosotros? *
                  </label>
                  <select
                    name="howYouFoundUs"
                    value={formData.howYouFoundUs}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.howYouFoundUs ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    {howYouFoundUsOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors.howYouFoundUs && (
                    <p className="text-red-500 text-xs mt-1">{errors.howYouFoundUs}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cupón de Descuento (Opcional)
                  </label>
                  <input
                    type="text"
                    name="discountCoupon"
                    value={formData.discountCoupon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DESCUENTO2024"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa un código de descuento si tienes uno
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Próximo paso</h3>
                <p className="text-blue-800 text-sm">
                  Al hacer clic en "Ver Resumen", revisarás toda tu información antes de enviar la solicitud.
                  Una vez enviada, un asesor revisará tu caso y te contactará pronto.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={goToSummary}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ver Resumen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingForm;