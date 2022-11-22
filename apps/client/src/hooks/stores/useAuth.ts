import type { User } from '@rbp/server';
import nookies from 'nookies';
import { createContext, createElement, useContext, useMemo, useState } from 'react';

export interface AuthContextValue {
  user?: User
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export interface AuthProviderProps {
  initialState?: { user?: User; token?: string }
  children: React.ReactNode
}

export function AuthProvider({
  initialState,
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(initialState?.token || null);

  function setToken(token: string | null) {
    _setToken(token);

    if (!token) {
      nookies.destroy(null, 'token');
    }
  }

  function logout() {
    setToken(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      logout,
    }),
    [user, token, logout],
  );

  return createElement(AuthContext.Provider, { value }, children);
}
