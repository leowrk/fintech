import React, { useState, useEffect, useCallback } from 'react';
import { adminProductsAPI } from '../../services/api';

const CATEGORIES = ['Laptops', 'Gaming', 'Tablets', 'Accesorios'];
const TERM_OPTIONS = [3, 6, 12, 18, 24, 36];

const emptyForm = () => ({
  name: '', description: '', price: '', category: '',
  brand: '', model: '', imageUrl: '', isAvailable: true, isFeatured: false,
  stock: 0,
  // Specs
  processor: '', ram: '', storage: '', screen: '', graphics: '', battery: '', os: '',
  // Financiero
  interestRate: 1.9,
  paymentTerms: [6, 12, 18, 24],
  minDownPayment: 0,
});

const calcMonthly = (price, ratePercent, term) => {
  const r = (parseFloat(ratePercent) || 1.9) / 100;
  const n = term;
  const p = parseFloat(price) || 0;
  if (r === 0) return Math.round(p / n);
  return Math.round((p * r) / (1 - Math.pow(1 + r, -n)));
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [activeTab, setActiveTab] = useState('general');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminProductsAPI.getAll({ search: search || undefined, limit: 50 });
      setProducts(res.data.items || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const openCreate = () => {
    setEditProduct(null);
    setForm(emptyForm());
    setActiveTab('general');
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name, description: p.description || '',
      price: p.price, category: p.category,
      brand: p.brand || '', model: p.model || '',
      imageUrl: p.imageUrl || '',
      isAvailable: p.isAvailable, isFeatured: p.isFeatured,
      stock: p.stock || 0,
      processor: p.specs?.processor || '',
      ram: p.specs?.ram || '',
      storage: p.specs?.storage || '',
      screen: p.specs?.screen || '',
      graphics: p.specs?.graphics || '',
      battery: p.specs?.battery || '',
      os: p.specs?.os || '',
      interestRate: p.interestRate ? (parseFloat(p.interestRate) * 100).toFixed(2) : 1.9,
      paymentTerms: p.paymentTerms || [6, 12, 18, 24],
      minDownPayment: p.minDownPayment ? parseFloat(p.minDownPayment) : 0,
    });
    setActiveTab('general');
    setShowForm(true);
  };

  const toggleTerm = (term) => {
    setForm((f) => ({
      ...f,
      paymentTerms: f.paymentTerms.includes(term)
        ? f.paymentTerms.filter((t) => t !== term)
        : [...f.paymentTerms, term].sort((a, b) => a - b),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (form.paymentTerms.length === 0) {
      alert('Selecciona al menos un plazo de pago');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        brand: form.brand,
        model: form.model,
        imageUrl: form.imageUrl,
        isAvailable: form.isAvailable,
        isFeatured: form.isFeatured,
        stock: Number(form.stock),
        specs: {
          processor: form.processor || undefined,
          ram: form.ram || undefined,
          storage: form.storage || undefined,
          screen: form.screen || undefined,
          graphics: form.graphics || undefined,
          battery: form.battery || undefined,
          os: form.os || undefined,
        },
        interestRate: parseFloat(form.interestRate) / 100,
        paymentTerms: form.paymentTerms,
        minDownPayment: Number(form.minDownPayment),
      };
      if (editProduct) {
        await adminProductsAPI.update(editProduct.id, payload);
      } else {
        await adminProductsAPI.create(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al guardar producto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(id);
    try {
      await adminProductsAPI.delete(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar');
    } finally {
      setDeleting(null);
    }
  };

  const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400';

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-sm text-gray-500">{products.length} productos en el catálogo</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#023047] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#034060] transition-colors"
        >
          + Nuevo producto
        </button>
      </div>

      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Grid de productos */}
      {loading ? (
        <div className="py-16 text-center text-gray-400">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center text-gray-400">No hay productos aún</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => {
            const rate = parseFloat(p.interestRate) || 0.019;
            const monthly = calcMonthly(p.price, rate * 100, 12);
            return (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">
                    📦
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{p.name}</h3>
                    {p.isFeatured && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                        ★ Dest.
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{p.brand} · {p.category}</p>
                  <p className="text-lg font-bold text-[#2A9D8F]">
                    S/ {Number(p.price).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Desde S/ {monthly}/mes · {(rate * 100).toFixed(1)}% mensual
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Stock: {p.stock ?? 0} · {p.isAvailable ? '✅' : '❌'}
                    {p.paymentTerms?.length > 0 && (
                      <span className="ml-1">· Plazos: {p.paymentTerms?.join(', ')}m</span>
                    )}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex-1 text-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      disabled={deleting === p.id}
                      onClick={() => handleDelete(p.id, p.name)}
                      className="flex-1 text-center text-xs bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                    >
                      {deleting === p.id ? '...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal crear/editar */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-900">
                {editProduct ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              {[
                { id: 'general', label: '📋 General' },
                { id: 'specs', label: '⚙️ Especificaciones' },
                { id: 'financiero', label: '💰 Financiero' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#023047] text-[#023047]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="p-6">
              {/* TAB GENERAL */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Nombre *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Precio (S/) *</label>
                      <input required type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Categoría *</label>
                      <select required value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className={inputCls}>
                        <option value="">Seleccionar...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Marca</label>
                      <input value={form.brand} onChange={e => setForm(f => ({...f, brand: e.target.value}))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Modelo</label>
                      <input value={form.model} onChange={e => setForm(f => ({...f, model: e.target.value}))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Stock</label>
                      <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({...f, stock: e.target.value}))} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">URL de imagen</label>
                    <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className={inputCls} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Descripción</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3} className={inputCls} />
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.isAvailable} onChange={e => setForm(f => ({...f, isAvailable: e.target.checked}))} />
                      <span className="text-sm text-gray-700">Disponible</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} />
                      <span className="text-sm text-gray-700">★ Destacado</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB SPECS */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-400">Ingresa las especificaciones técnicas del equipo.</p>
                  {[
                    { key: 'processor', label: 'Procesador', placeholder: 'Intel Core i7-1165G7' },
                    { key: 'ram', label: 'RAM', placeholder: '16GB DDR4' },
                    { key: 'storage', label: 'Almacenamiento', placeholder: '512GB NVMe SSD' },
                    { key: 'screen', label: 'Pantalla', placeholder: '15.6" FHD 144Hz' },
                    { key: 'graphics', label: 'Gráficos', placeholder: 'NVIDIA RTX 3060 6GB' },
                    { key: 'battery', label: 'Batería', placeholder: '8 horas' },
                    { key: 'os', label: 'Sistema Operativo', placeholder: 'Windows 11 Home' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 font-medium">{label}</label>
                      <input
                        value={form[key]}
                        onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
                        className={inputCls}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB FINANCIERO */}
              {activeTab === 'financiero' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Tasa de interés mensual (%)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value={form.interestRate}
                        onChange={e => setForm(f => ({...f, interestRate: e.target.value}))}
                        className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                      />
                      <span className="text-sm text-gray-500">% mensual</span>
                      <span className="text-xs text-gray-400">(TEA ≈ {((Math.pow(1 + parseFloat(form.interestRate || 0) / 100, 12) - 1) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-2">
                      Plazos disponibles (meses)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TERM_OPTIONS.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => toggleTerm(term)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                            form.paymentTerms.includes(term)
                              ? 'border-[#023047] bg-[#023047] text-white'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {term}m
                        </button>
                      ))}
                    </div>
                    {form.paymentTerms.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">Selecciona al menos un plazo</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Cuota inicial mínima (%)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={form.minDownPayment}
                        onChange={e => setForm(f => ({...f, minDownPayment: e.target.value}))}
                        className="w-40 accent-[#023047]"
                      />
                      <span className="text-sm font-bold text-[#023047]">{form.minDownPayment}%</span>
                      {form.minDownPayment > 0 && form.price && (
                        <span className="text-xs text-gray-400">
                          = S/ {Math.round(parseFloat(form.price) * parseFloat(form.minDownPayment) / 100).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">0% = Sin cuota inicial requerida</p>
                  </div>

                  {/* Preview de cuotas */}
                  {form.price && form.interestRate && form.paymentTerms.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Vista previa de cuotas mensuales
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {form.paymentTerms.map((term) => (
                          <div key={term} className="bg-white rounded-lg p-3 text-center border border-gray-100">
                            <p className="text-lg font-extrabold text-[#2A9D8F]">
                              S/ {calcMonthly(form.price, form.interestRate, term).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">{term} cuotas</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#023047] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#034060] disabled:opacity-60">
                  {saving ? 'Guardando...' : (editProduct ? 'Guardar cambios' : 'Crear producto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
