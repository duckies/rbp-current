import type { Identity, Provider, User } from '@prisma/client';
export type {
  Form,
  FormField,
  FormSubmission,
  Prisma,
  User,
} from '@prisma/client';
export * from './auth/interfaces';

export interface IdentityDTO<T extends Provider>
  extends Omit<Identity, 'accessToken' | 'refreshToken'> {
  provider: T;
}

export interface UserDTO extends User {
  discord: IdentityDTO<'Discord'>;
}
