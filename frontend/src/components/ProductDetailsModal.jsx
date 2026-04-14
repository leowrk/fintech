import React from 'react';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
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
          className="relative inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Ficha Técnica del Producto</h3>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Imagen y información básica */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    <p className="text-gray-600">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">S/ {product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Precio al contado</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Stock: {product.stock} unidades
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Especificaciones técnicas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
                
                <div className="space-y-4">
                  {/* Procesador */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Procesador</h4>
                    <p className="text-gray-600">{product.processor}</p>
                  </div>

                  {/* Memoria */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Memoria RAM</h4>
                    <p className="text-gray-600">{product.ram}</p>
                  </div>

                  {/* Almacenamiento */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Almacenamiento</h4>
                    <p className="text-gray-600">{product.storage}</p>
                  </div>

                  {/* Pantalla */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Pantalla</h4>
                    <p className="text-gray-600">{product.screen}</p>
                  </div>

                  {/* Gráficos */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Gráficos</h4>
                    <p className="text-gray-600">{product.graphics}</p>
                  </div>

                  {/* Características adicionales */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Características Adicionales</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• WiFi 6</li>
                      <li>• Bluetooth 5.0</li>
                      <li>• Cámara HD</li>
                      <li>• Micrófono con cancelación de ruido</li>
                      <li>• Puertos USB-C, USB-A, HDMI</li>
                      <li>• Lector de huellas</li>
                    </ul>
                  </div>

                  {/* Garantía */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">Garantía y Soporte</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Garantía del fabricante: 1 año</li>
                      <li>• Soporte técnico incluido</li>
                      <li>• Seguro contra roto: Opcional</li>
                    </ul>
                  </div>
                </div>

                {/* Información de envío */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Información de Envío</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Envío gratuito a nivel nacional</li>
                    <li>• Tiempo de entrega: 3-5 días hábiles</li>
                    <li>• Seguro de envío incluido</li>
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
                  alert("Redirigiendo a formulario de solicitud...");
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Solicitar este producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;