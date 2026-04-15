import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminAuthAPI } from '../services/api';

// Claves de storage EXCLUSIVAS del panel admin — no interfieren con el sitio público
const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY  = 'admin_user';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem(ADMIN_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [initializing, setInitializing] = useState(true);

  // Verificar token admin al montar
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token && !adminUser) {
      adminAuthAPI
        .me()
        .then((res) => {
          if (res.data?.isAdmin) {
            setAdminUser(res.data);
            localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(res.data));
          } else {
            _clearSession();
          }
        })
        .catch(() => _clearSession())
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, []);

  const _saveSession = (access_token, userData) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, access_token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userData));
    setAdminUser(userData);
    return userData;
  };

  const _clearSession = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    setAdminUser(null);
  };

  const login = useCallback(async (email, password) => {
    const res = await adminAuthAPI.login(email, password);
    const { access_token, user } = res.data;
    if (!user?.isAdmin) {
      throw new Error('Solo administradores pueden acceder al panel');
    }
    return _saveSession(access_token, user);
  }, []);

  // Actualizar token en memoria (después de cambiar contraseña/email)
  const updateToken = useCallback((access_token, updatedUser) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, access_token);
    if (updatedUser) {
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updatedUser));
      setAdminUser(updatedUser);
    }
  }, []);

  const logout = useCallback(() => {
    _clearSession();
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      user: adminUser,
      initializing,
      login,
      logout,
      updateToken,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth debe usarse dentro de AdminAuthProvider');
  return ctx;
}
