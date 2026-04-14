import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Interceptor de REQUEST: adjunta el JWT ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Interceptor de RESPONSE: maneja 401 global ─────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Solo redirige si no estamos ya en /admin/login
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);

// ── Auth ────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

// ── Productos ────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// ── Solicitudes ──────────────────────────────────────────────────────────────
export const applicationsAPI = {
  create: (data) => api.post('/applications', data),
  getMy: () => api.get('/applications/my'),
  simulate: (price, term, rate) =>
    api.get('/applications/simulate', { params: { price, term, rate } }),
};

// ── Admin — solicitudes ─────────────────────────────────────────────────────
export const adminApplicationsAPI = {
  getAll: (params) => api.get('/admin/applications', { params }),
  getOne: (id) => api.get(`/admin/applications/${id}`),
  getStats: () => api.get('/admin/applications/stats'),
  updateStatus: (id, data) => api.patch(`/admin/applications/${id}/status`, data),
};

// ── Admin — productos ────────────────────────────────────────────────────────
export const adminProductsAPI = {
  getAll: (params) => api.get('/admin/products', { params }),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
};

// ── Upload ───────────────────────────────────────────────────────────────────
export const uploadAPI = {
  upload: (formData) =>
    api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default api;
