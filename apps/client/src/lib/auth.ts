import type { User } from '@rbp/server';
import { $get } from './utils/fetch';

export function getMe(token: string) {
  return $get<User>('/user/me', { headers: { Authorization: `Bearer ${token}` } });
}
