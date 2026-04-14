import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentScheduleModal from '../components/PaymentScheduleModal';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { productsAPI } from '../services/api';

const Catalog = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    productsAPI
      .getAll({ limit: 50 })
      .then((res) => {
        const items = res.data.items || [];
        // Normalizar para que funcionen los modales existentes
        setAllProducts(
          items.map((p) => ({
            ...p,
            image: p.imageUrl || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
            monthly: Math.round((p.price * 0.019) / (1 - Math.pow(1.019, -12))),
            processor: p.specs?.processor,
            ram: p.specs?.ram,
            storage: p.specs?.storage,
            screen: p.specs?.screen,
            graphics: p.specs?.graphics,
          }))
        );
      })
      .catch(() => setAllProducts([]))
      .finally(() => setLoadingProducts(false));
  }, []);

  // FILTRADO
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
    const priceMatch = product.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  const categories = ['Todos', 'Laptops', 'Gaming', 'Tablets'];

  const handleShowPaymentSchedule = (product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };



  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {loadingProducts && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Cargando catálogo...</p>
        </div>
      )}
      {/* --- NAVBAR SIMPLIFICADO --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#023047] rounded-tr-lg rounded-bl-lg"></div>
            <span className="text-xl font-bold tracking-tight text-[#023047]">Fintech</span>
          </Link>
          <div className="flex gap-4">
             <span className="text-sm text-gray-500 hidden md:block">¿Necesitas ayuda? <Link to="/ayuda" className="text-[#2A9D8F] font-bold">Contáctanos</Link></span>
             <Link to="/login" className="text-sm font-bold text-[#023047]">Login</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR (FILTROS) --- */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
             
            {/* Filtro: Categorías */}
            <div>
              <h3 className="font-bold text-[#023047] mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      className="peer sr-only" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className="w-4 h-4 border border-gray-300 rounded-full mr-3 peer-checked:border-[#2A9D8F] peer-checked:bg-[#2A9D8F] transition-all"></span>
                    <span className="text-gray-600 group-hover:text-[#2A9D8F] transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtro: Precio */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#023047]">Precio Máximo</h3>
                <span className="text-sm font-bold text-[#2A9D8F]">S/ {priceRange}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="6000" 
                step="100" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2A9D8F]" 
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>S/ 1000</span>
                <span>S/ 6000+</span>
              </div>
            </div>

            {/* Banner Publicidad Lateral */}
            <div className="bg-[#023047] rounded-xl p-6 text-white text-center hidden lg:block">
              <p className="font-bold text-lg mb-2">¡Financia al 0%!</p>
              <p className="text-sm text-blue-200 mb-4">Solo por este mes en equipos seleccionados.</p>
              <button className="text-xs font-bold bg-[#2A9D8F] px-4 py-2 rounded-lg hover:bg-[#21867a]">Ver ofertas</button>
            </div>

          </aside>

          {/* --- GRID DE PRODUCTOS --- */}
          <main className="flex-1">
             
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#023047]">
                {selectedCategory === 'Todos' ? 'Todos los Equipos' : selectedCategory}
              </h1>
              <span className="text-sm text-gray-500">{filteredProducts.length} resultados</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                    {/* Imagen */}
                    <div className="h-48 rounded-xl mb-4 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        {product.brand}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{product.category}</p>
                      <h3 className="font-bold text-[#023047] text-lg leading-tight">{product.name}</h3>
                    </div>

                    {/* Precio */}
                    <div className="border-t border-gray-50 pt-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Desde</p>
                        <p className="text-xl font-extrabold text-[#2A9D8F]">S/ {product.monthly}<span className="text-xs font-normal text-gray-400">/mes</span></p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Contado: S/ {product.price}</p>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => {
                          navigate('/formulario-financiamiento', { state: { product } });
                        }}
                        className="bg-[#023047] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#034060] transition-colors text-sm"
                      >
                        Solicitar Ahora
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleShowDetails(product)}
                          className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-xs"
                        >
                          Ver detalles
                        </button>
                        <button
                          onClick={() => handleShowPaymentSchedule(product)}
                          className="bg-blue-100 text-blue-700 py-2 px-3 rounded-lg font-medium hover:bg-blue-200 transition-colors text-xs"
                        >
                          Simular pago
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Estado Vacío (Sin resultados)
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">No encontramos productos en ese rango de precio.</p>
                <button 
                  onClick={() => {setPriceRange(6000); setSelectedCategory('Todos')}}
                  className="mt-4 text-[#2A9D8F] font-bold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Modales */}
      {selectedProduct && (
        <>
          <PaymentScheduleModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            product={selectedProduct}
          />
          
          <ProductDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            product={selectedProduct}
          />
        </>
      )}
    </div>
  );
};

export default Catalog;