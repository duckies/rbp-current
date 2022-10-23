import type { ParsedUrlQuery } from 'querystring';
import type { UserDTO } from '@rbp/server';
import type { UseMutateFunction } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, createElement, useContext, useMemo } from 'react';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import { logout } from '../auth';
import { getMe } from 'lib/auth';

export interface AuthContextValue {
  user?: UserDTO
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
  initialState?: { user?: UserDTO }
  children: React.ReactNode
}

export function AuthProvider({
  initialState = {},
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  const { data, error, status, refetch } = useQuery(['user'], () => getMe(), {
    initialData: initialState.user,
    retry: 0,
    staleTime: 1000 * 60 * 60 * 8, // Refetch after 8 hours
  });

  const logoutMutation = useMutation(
    async (ctx?: GetServerSidePropsContext) => logout(ctx),
    {
      onSuccess: () => {
        queryClient.setQueryData(['user'], null);
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
