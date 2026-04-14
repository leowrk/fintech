import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminProductForm = () => {
  const navigate = useNavigate();
  
  // Estado simple para simular la previsualización de imagen
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Producto guardado correctamente! (Simulación)");
    navigate('/admin/products'); // Regresa a la lista
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* --- ENCABEZADO --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="text-gray-400 hover:text-slate-800 transition-colors">
            ← Volver
          </Link>
          <h2 className="text-2xl font-bold text-slate-800">Nuevo Producto</h2>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancelar
          </Link>
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
            Guardar Producto
          </button>
        </div>
      </div>

      {/* --- FORMULARIO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA (Info General) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tarjeta: Información Básica */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Información General</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. MacBook Air M2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca / Fabricante</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. Apple" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Código Interno)</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. LAP-APP-001" />
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta (Specs)</label>
                <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. 8GB RAM - 256GB SSD - Pantalla Retina" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                <textarea rows="4" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe las características principales del equipo..."></textarea>
              </div>
            </div>
          </div>

          {/* Tarjeta: Especificaciones Técnicas (Opcional) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Ficha Técnica</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Procesador</label>
                    <input type="text" className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Memoria RAM</label>
                    <input type="text" className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 outline-none" />
                </div>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA (Precio e Imagen) */}
        <div className="space-y-6">
          
          {/* Tarjeta: Imagen */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Imagen del Producto</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain rounded-md" />
              ) : (
                <div className="py-8">
                  <div className="mx-auto w-12 h-12 text-gray-300 mb-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <p className="text-sm text-gray-500">Haz clic para subir imagen</p>
                </div>
              )}
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" />
            </div>
          </div>

          {/* Tarjeta: Precios y Stock */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Venta</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio al Contado (S/)</label>
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">S/</span>
                    <input type="number" className="w-full pl-8 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800" placeholder="0.00" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Disponible</label>
                <input type="number" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0" />
              </div>

              <div className="pt-4 border-t border-gray-100">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Producto Destacado / Oferta</span>
                 </label>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminProductForm;