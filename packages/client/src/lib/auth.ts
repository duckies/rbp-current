import type { UserDTO } from '@rbp/server';
import type { GetServerSidePropsContext } from 'next';
import { $get } from './utils/fetch';

export function getMe(context?: GetServerSidePropsContext) {
  return $get<UserDTO>('/user/me', { context, authenticate: true });
}
