import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ─────────────────────────────────────────────────────────────────────────────
// INSTANCIA PÚBLICA — usa 'token' / 'user' en localStorage
// ─────────────────────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const isAuthCall = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/check-dni');
      if (!isAuthCall) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        const path = window.location.pathname;
        if (!path.includes('/login') && !path.startsWith('/admin')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// INSTANCIA ADMIN — usa 'admin_token' / 'admin_user' en localStorage
// Completamente independiente del sitio público
// ─────────────────────────────────────────────────────────────────────────────
export const adminApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const isAuthCall = url.includes('/auth/login');
      if (!isAuthCall) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// APIs PÚBLICAS — usan instancia 'api'
// ─────────────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:    (email, password) => api.post('/auth/login', { email, password }),
  loginDni: (documentNumber, password) => api.post('/auth/login-dni', { documentNumber, password }),
  checkDni: (documentNumber) => api.post('/auth/check-dni', { documentNumber }),
  register: (data) => api.post('/auth/register', data),
  me:       () => api.get('/auth/me'),
};

export const productsAPI = {
  getAll:      (params) => api.get('/products', { params }),
  getOne:      (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
};

export const applicationsAPI = {
  create:   (data) => api.post('/applications', data),
  getMy:    () => api.get('/applications/my'),
  simulate: (price, term, rate) => api.get('/applications/simulate', { params: { price, term, rate } }),
};

export const uploadAPI = {
  upload: (formData) =>
    api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ─────────────────────────────────────────────────────────────────────────────
// APIs ADMIN — usan instancia 'adminApi' (token separado)
// ─────────────────────────────────────────────────────────────────────────────
export const adminAuthAPI = {
  login: (email, password) => adminApi.post('/auth/login', { email, password }),
  me:    () => adminApi.get('/auth/me'),
};

export const adminApplicationsAPI = {
  getAll:       (params) => adminApi.get('/admin/applications', { params }),
  getOne:       (id)     => adminApi.get(`/admin/applications/${id}`),
  getStats:     ()       => adminApi.get('/admin/applications/stats'),
  updateStatus: (id, data) => adminApi.patch(`/admin/applications/${id}/status`, data),
};

export const adminProductsAPI = {
  getAll:  (params) => adminApi.get('/admin/products', { params }),
  create:  (data)   => adminApi.post('/admin/products', data),
  update:  (id, data) => adminApi.put(`/admin/products/${id}`, data),
  delete:  (id)     => adminApi.delete(`/admin/products/${id}`),
};

export const adminSettingsAPI = {
  get:            ()       => adminApi.get('/admin/settings'),
  update:         (data)   => adminApi.patch('/admin/settings', data),
  changePassword: (currentPassword, newPassword) =>
    adminApi.patch('/auth/change-password', { currentPassword, newPassword }),
  changeEmail:    (currentPassword, newEmail) =>
    adminApi.patch('/auth/change-email', { currentPassword, newEmail }),
};

export default api;
