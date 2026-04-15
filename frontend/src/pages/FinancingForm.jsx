import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { applicationsAPI, uploadAPI, authAPI } from '../services/api';
import { getDepartamentos, getProvincias, getDistritos } from '../data/peruUbigeo';
import { useAuth } from '../contexts/AuthContext';

const FinancingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loginByDni, registerByDni } = useAuth();
  
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

  // ── Auth Gate (login/registro por DNI) ────────────────────────────────────
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authGateMode, setAuthGateMode] = useState('checking'); // 'checking' | 'login' | 'register'
  const [authGateLoading, setAuthGateLoading] = useState(false);
  const [authGateError, setAuthGateError] = useState('');
  const [gatePassword, setGatePassword] = useState('');
  const [gatePasswordConfirm, setGatePasswordConfirm] = useState('');
  const [gateShowPassword, setGateShowPassword] = useState(false);
  const [existingUserName, setExistingUserName] = useState('');
  const pendingActionRef = useRef(null); // 'next' | 'submit'

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

  // Ubigeo en cascada
  const departamentos = useMemo(() => getDepartamentos(), []);
  const provincias = useMemo(() => getProvincias(formData.department), [formData.department]);
  const distritos = useMemo(() => getDistritos(formData.department, formData.province), [formData.department, formData.province]);

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
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (name === 'department') {
      // Al cambiar departamento, limpiar provincia y distrito
      setFormData(prev => ({ ...prev, department: value, province: '', district: '' }));
    } else if (name === 'province') {
      // Al cambiar provincia, limpiar distrito
      setFormData(prev => ({ ...prev, province: value, district: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

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
      // Requerir autenticación al terminar Step 1
      if (currentStep === 1 && !user) {
        openAuthGate('next');
        return;
      }
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // ── Lógica del Auth Gate ──────────────────────────────────────────────────
  const openAuthGate = async (pendingAction) => {
    pendingActionRef.current = pendingAction;
    setAuthGateMode('checking');
    setAuthGateError('');
    setGatePassword('');
    setGatePasswordConfirm('');
    setShowAuthGate(true);

    try {
      const res = await authAPI.checkDni(formData.documentNumber);
      if (res.data.exists) {
        setExistingUserName(res.data.firstName || '');
        setAuthGateMode('login');
      } else {
        setAuthGateMode('register');
      }
    } catch {
      setAuthGateMode('register');
    }
  };

  const handleAuthGateLogin = async () => {
    if (!gatePassword) {
      setAuthGateError('Ingresa tu contraseña');
      return;
    }
    setAuthGateLoading(true);
    setAuthGateError('');
    try {
      await loginByDni(formData.documentNumber, gatePassword);
      setShowAuthGate(false);
      executePendingAction();
    } catch (err) {
      setAuthGateError(err.response?.data?.message || 'Contraseña incorrecta');
    } finally {
      setAuthGateLoading(false);
    }
  };

  const handleAuthGateRegister = async () => {
    if (!gatePassword) {
      setAuthGateError('Ingresa una contraseña');
      return;
    }
    if (gatePassword.length < 6) {
      setAuthGateError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (gatePassword !== gatePasswordConfirm) {
      setAuthGateError('Las contraseñas no coinciden');
      return;
    }
    if (!formData.email) {
      setAuthGateError('Por favor ingresa tu correo electrónico en el formulario primero');
      return;
    }
    setAuthGateLoading(true);
    setAuthGateError('');
    try {
      await registerByDni({
        documentNumber: formData.documentNumber,
        password: gatePassword,
        email: formData.email,
      });
      setShowAuthGate(false);
      executePendingAction();
    } catch (err) {
      const msg = err.response?.data?.message;
      setAuthGateError(Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al crear la cuenta'));
    } finally {
      setAuthGateLoading(false);
    }
  };

  const executePendingAction = () => {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    if (action === 'next') {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    } else if (action === 'submit') {
      // Llamar submit directamente (sin re-chequear autenticación)
      submitApplication();
    }
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

  // Lógica real de envío (sin chequeo de auth, ya fue validado)
  const submitApplication = async () => {
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
      const applicationId = res.data.id;

      // Upload attached files
      const fileUploads = [
        { file: formData.dniPhoto, fileType: 'dni' },
        { file: formData.enrollmentFile, fileType: 'enrollment' },
        { file: formData.paymentProof && typeof formData.paymentProof !== 'string' ? formData.paymentProof : null, fileType: 'payment_proof' },
      ];

      await Promise.allSettled(
        fileUploads
          .filter(({ file }) => file instanceof File)
          .map(({ file, fileType }) => {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('fileType', fileType);
            fd.append('applicationId', applicationId);
            return uploadAPI.upload(fd);
          })
      );

      navigate('/resumen', { state: { formData, product: selectedProduct, applicationId } });
    } catch (err) {
      const msg = err.response?.data?.message;
      alert(Array.isArray(msg) ? msg.join('\n') : (msg || 'Error al enviar la solicitud. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  // Gate de autenticación antes de enviar
  const goToSummary = async () => {
    if (!validateCurrentStep()) return;
    if (!user) {
      openAuthGate('submit');
      return;
    }
    await submitApplication();
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
          {user && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-green-700 font-medium hidden sm:block">
                DNI {user.documentNumber || 'conectado'}
              </span>
            </div>
          )}
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
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* DNI File Upload */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto / Escáner del DNI
                </label>
                <p className="text-xs text-gray-400 mb-3">Adjunta una foto clara de tu documento de identidad (anverso). Formatos: JPG, PNG, PDF (máx. 5 MB)</p>
                <input
                  type="file"
                  name="dniPhoto"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formData.dniPhoto && (
                  <p className="text-xs text-green-600 mt-1.5">✅ Archivo seleccionado: {formData.dniPhoto.name}</p>
                )}
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
                {/* Departamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departamento *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Selecciona departamento</option>
                    {departamentos.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>

                {/* Provincia — depende del departamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provincia *</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    disabled={!formData.department}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Selecciona provincia</option>
                    {provincias.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                </div>

                {/* Distrito — depende de la provincia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distrito *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={!formData.province}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Selecciona distrito</option>
                    {distritos.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
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

      {/* ── AUTH GATE MODAL ── */}
      {showAuthGate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#023047] to-[#034060] p-6 text-white">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base">Confirma tu identidad</p>
                  <p className="text-blue-200 text-xs">Para continuar con tu solicitud</p>
                </div>
              </div>
              <div className="mt-3 bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-xs text-blue-200">DNI:</span>
                <span className="font-bold tracking-widest">{formData.documentNumber}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {authGateMode === 'checking' && (
                <div className="py-6 text-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Verificando tu DNI...</p>
                </div>
              )}

              {authGateMode === 'login' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">
                      {existingUserName ? `¡Hola, ${existingUserName}! 👋` : '¡Bienvenido de vuelta!'}
                    </p>
                    <p className="text-xs text-gray-400">Ya tienes una cuenta. Ingresa tu contraseña para continuar.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña</label>
                    <div className="relative">
                      <input
                        type={gateShowPassword ? 'text' : 'password'}
                        value={gatePassword}
                        onChange={(e) => { setGatePassword(e.target.value); setAuthGateError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAuthGateLogin()}
                        autoFocus
                        placeholder="Tu contraseña"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => setGateShowPassword(v => !v)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {gateShowPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {authGateError && (
                    <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{authGateError}</p>
                  )}

                  <button
                    onClick={handleAuthGateLogin}
                    disabled={authGateLoading}
                    className="w-full bg-[#023047] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#034060] disabled:opacity-60 transition-colors"
                  >
                    {authGateLoading ? 'Ingresando...' : 'Ingresar y continuar →'}
                  </button>
                </div>
              )}

              {authGateMode === 'register' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">Crea tu contraseña 🔐</p>
                    <p className="text-xs text-gray-400">
                      Es la primera vez que usas este DNI. Crea una contraseña para tu cuenta.
                    </p>
                  </div>

                  {/* Email display */}
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Correo de la cuenta</p>
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {formData.email || <span className="text-orange-500">⚠ Ingresa tu correo en el formulario</span>}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña <span className="text-gray-400">(mín. 6 caracteres)</span></label>
                    <div className="relative">
                      <input
                        type={gateShowPassword ? 'text' : 'password'}
                        value={gatePassword}
                        onChange={(e) => { setGatePassword(e.target.value); setAuthGateError(''); }}
                        autoFocus
                        placeholder="Crea una contraseña"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => setGateShowPassword(v => !v)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Confirmar contraseña</label>
                    <input
                      type={gateShowPassword ? 'text' : 'password'}
                      value={gatePasswordConfirm}
                      onChange={(e) => { setGatePasswordConfirm(e.target.value); setAuthGateError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuthGateRegister()}
                      placeholder="Repite la contraseña"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                  </div>

                  {authGateError && (
                    <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{authGateError}</p>
                  )}

                  <button
                    onClick={handleAuthGateRegister}
                    disabled={authGateLoading}
                    className="w-full bg-[#2A9D8F] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#21867a] disabled:opacity-60 transition-colors"
                  >
                    {authGateLoading ? 'Creando cuenta...' : 'Crear cuenta y continuar →'}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-5">
              <button
                onClick={() => setShowAuthGate(false)}
                className="w-full text-xs text-gray-400 hover:text-gray-600 py-1"
              >
                Cancelar y volver al formulario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancingForm;