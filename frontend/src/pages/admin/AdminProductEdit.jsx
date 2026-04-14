import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminProductEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    sku: '',
    shortDescription: '',
    description: '',
    price: '',
    stock: '',
    processor: '',
    ram: '',
    storage: '',
    graphics: '',
    screen: '',
    category: '',
    featured: false
  });

  useEffect(() => {
    // Simular carga del producto desde la API
    setTimeout(() => {
      const mockProduct = {
        id: 1,
        name: 'MacBook Air M1',
        brand: 'Apple',
        sku: 'LAP-APP-001',
        shortDescription: '8GB RAM - 256GB SSD - Pantalla Retina',
        description: 'La MacBook Air con chip M1 ofrece un rendimiento revolucionario con mayor duración de batería y velocidades increíbles.',
        price: 3500,
        stock: 12,
        processor: 'Apple M1',
        ram: '8GB',
        storage: '256GB SSD',
        graphics: 'GPU integrada de 8 núcleos',
        screen: '13.3" Retina',
        category: 'laptop',
        featured: true,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80'
      };
      
      setProduct(mockProduct);
      setFormData({
        name: mockProduct.name,
        brand: mockProduct.brand,
        sku: mockProduct.sku,
        shortDescription: mockProduct.shortDescription,
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        processor: mockProduct.processor,
        ram: mockProduct.ram,
        storage: mockProduct.storage,
        graphics: mockProduct.graphics,
        screen: mockProduct.screen,
        category: mockProduct.category,
        featured: mockProduct.featured
      });
      setImagePreview(mockProduct.image);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de guardar en el backend
    alert("¡Producto actualizado correctamente! (Simulación)");
    navigate('/admin/products');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* --- ENCABEZADO --- */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="text-gray-400 hover:text-gray-800 transition-colors">
            ← Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
            <p className="text-gray-600">SKU: {formData.sku}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancelar
          </Link>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA (Info General) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta: Información Básica */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Información General</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                      required
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta (Specs) *</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ej. 8GB RAM - 256GB SSD - Pantalla Retina"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Describe las características principales del equipo..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="laptop">Laptop</option>
                    <option value="gaming">Gaming</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tarjeta: Especificaciones Técnicas */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Ficha Técnica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Procesador</label>
                  <input
                    type="text"
                    name="processor"
                    value={formData.processor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Memoria RAM</label>
                  <input
                    type="text"
                    name="ram"
                    value={formData.ram}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Almacenamiento</label>
                  <input
                    type="text"
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarjeta Gráfica</label>
                  <input
                    type="text"
                    name="graphics"
                    value={formData.graphics}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pantalla</label>
                  <input
                    type="text"
                    name="screen"
                    value={formData.screen}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (Imagen y Configuración) */}
          <div className="space-y-6">
            {/* Tarjeta: Imagen */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Imagen del Producto</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors relative">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-contain rounded-md" 
                  />
                ) : (
                  <div className="py-8">
                    <div className="mx-auto w-12 h-12 text-gray-300 mb-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">Haz clic para cambiar imagen</p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                />
              </div>
            </div>

            {/* Tarjeta: Precios y Stock */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Ventas</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio al Contado (S/) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">S/</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-8 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Disponible *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Producto Destacado / Oferta</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Tarjeta: Historial */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Historial de Cambios</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Producto creado</span>
                  <span className="text-gray-400 text-xs">15/01/2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Stock actualizado</span>
                  <span className="text-gray-400 text-xs">14/01/2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Precio modificado</span>
                  <span className="text-gray-400 text-xs">13/01/2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEdit;