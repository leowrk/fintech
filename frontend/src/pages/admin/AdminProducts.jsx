import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { adminProductsAPI } from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '',
    brand: '', model: '', imageUrl: '', isAvailable: true, isFeatured: false, stock: 0,
  });

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
    setForm({ name: '', description: '', price: '', category: '', brand: '', model: '', imageUrl: '', isAvailable: true, isFeatured: false, stock: 0 });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, description: p.description || '', price: p.price, category: p.category, brand: p.brand || '', model: p.model || '', imageUrl: p.imageUrl || '', isAvailable: p.isAvailable, isFeatured: p.isFeatured, stock: p.stock || 0 });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
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

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400';

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
          {products.map((p) => (
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
                      ★ Destacado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{p.brand} · {p.category}</p>
                <p className="text-lg font-bold text-[#2A9D8F]">
                  S/ {Number(p.price).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">Stock: {p.stock ?? 0} · {p.isAvailable ? '✅ Disponible' : '❌ No disponible'}</p>

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
          ))}
        </div>
      )}

      {/* Modal crear/editar */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">
                {editProduct ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-medium">Nombre *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Precio (S/) *</label>
                  <input required type="number" min="0" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Categoría *</label>
                  <select required value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className={inputClass}>
                    <option value="">Seleccionar...</option>
                    {['Laptops', 'Gaming', 'Tablets', 'Accesorios'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Marca</label>
                  <input value={form.brand} onChange={e => setForm(f => ({...f, brand: e.target.value}))} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Modelo</label>
                  <input value={form.model} onChange={e => setForm(f => ({...f, model: e.target.value}))} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Stock</label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({...f, stock: e.target.value}))} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-medium">URL de imagen</label>
                  <input value={form.imageUrl} onChange={e => setForm(f => ({...f, imageUrl: e.target.value}))} className={inputClass} placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-medium">Descripción</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3} className={inputClass} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isAvailable" checked={form.isAvailable} onChange={e => setForm(f => ({...f, isAvailable: e.target.checked}))} />
                  <label htmlFor="isAvailable" className="text-sm text-gray-700">Disponible</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isFeatured" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} />
                  <label htmlFor="isFeatured" className="text-sm text-gray-700">Destacado</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
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
