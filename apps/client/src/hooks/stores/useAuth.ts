import type { ParsedUrlQuery } from 'querystring';
import type { User } from '@rbp/server';
import type { UseMutateFunction } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from 'lib/auth';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import nookies from 'nookies';
import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { logout } from '../auth';

export interface AuthContextValue {
  user?: User
  error: unknown
  status: 'error' | 'success'
  refetch: any
  logout: UseMutateFunction<
    void,
    unknown,
    GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | undefined
  >
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
  const [token, _setToken] = useState<string | null>(initialState?.token || null);
  const queryClient = useQueryClient();

  const { data, error, status, refetch } = useQuery(['user'], () => getMe(token!), {
    initialData: initialState?.user,
    retry: 0,
    staleTime: 1000 * 60 * 60 * 8, // Refetch after 8 hours
    enabled: !!token,
  });

  function setToken(token: string | null) {
    _setToken(token);

    if (!token) {
      nookies.destroy(null, 'token');
    }
  }

  const logoutMutation = useMutation(
    async (ctx?: GetServerSidePropsContext) => logout(ctx),
    {
      onSuccess: () => {
        queryClient.setQueryData(['user'], null);
        setToken(null);
      },
    },
  );

  const value = useMemo(
    () => ({
      user: data,
      error,
      status,
      refetch,
      logout: logoutMutation.mutate,
    }),
    [data, error, status, refetch, logoutMutation.mutate],
  );

  return createElement(AuthContext.Provider, { value }, children);
}
