'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api, getToken, setToken, clearToken, API_URL } from './api';
import type { User } from './types';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<{ email: string; isEmailVerified: boolean }>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyForgotOtp: (email: string, otp: string) => Promise<string>;
  resetPassword: (resetToken: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await api.get<User>('/api/auth/me', undefined, true);
      setUser(me);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const loginWithGoogle = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (!path.startsWith('/auth')) {
        sessionStorage.setItem('auth_redirect', path + window.location.search);
      }
    }
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>('/api/auth/login', { email, password });
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
    }
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    return await api.post<{ email: string; isEmailVerified: boolean }>('/api/auth/signup', {
      name,
      email,
      password,
      phone,
    });
  };

  const verifyOtp = async (email: string, otp: string) => {
    const res = await api.post<{ token: string; user: User }>('/api/auth/verify-otp', { email, otp });
    if (res.token && res.user) {
      setToken(res.token);
      setUser(res.user);
    }
  };

  const resendOtp = async (email: string) => {
    await api.post('/api/auth/resend-otp', { email });
  };

  const forgotPassword = async (email: string) => {
    await api.post('/api/auth/forgot-password', { email });
  };

  const verifyForgotOtp = async (email: string, otp: string) => {
    const res = await api.post<{ resetToken: string }>('/api/auth/verify-forgot-otp', { email, otp });
    return res.resetToken;
  };

  const resetPassword = async (resetToken: string, password: string) => {
    await api.post('/api/auth/reset-password', { resetToken, password });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout,
        refresh,
        login,
        signup,
        verifyOtp,
        resendOtp,
        forgotPassword,
        verifyForgotOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
