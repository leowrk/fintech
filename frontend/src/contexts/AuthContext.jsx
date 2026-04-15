import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Verificar token al montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      authAPI
        .me()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, []);

  const _saveSession = (access_token, userData) => {
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  // Login con email + contraseña
  const login = useCallback(async (email, password, registerData = null) => {
    setLoading(true);
    try {
      let res;
      if (registerData?.register) {
        res = await authAPI.register({
          email,
          password,
          firstName: registerData.firstName || '',
          lastName: registerData.lastName || '',
          documentNumber: registerData.documentNumber || undefined,
        });
      } else {
        res = await authAPI.login(email, password);
      }
      const { access_token, user: userData } = res.data;
      return _saveSession(access_token, userData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login con DNI + contraseña (para el formulario de postulación)
  const loginByDni = useCallback(async (documentNumber, password) => {
    setLoading(true);
    try {
      const res = await authAPI.loginDni(documentNumber, password);
      const { access_token, user: userData } = res.data;
      return _saveSession(access_token, userData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Registro con DNI (para nuevos usuarios desde el formulario)
  const registerByDni = useCallback(async ({ documentNumber, password, email, firstName, lastName }) => {
    setLoading(true);
    try {
      const res = await authAPI.register({
        documentNumber,
        password,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
      });
      const { access_token, user: userData } = res.data;
      return _saveSession(access_token, userData);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isAdmin = user?.isAdmin === true;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      initializing,
      login,
      loginByDni,
      registerByDni,
      logout,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
