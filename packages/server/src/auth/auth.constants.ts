import { Action, Subject } from '@prisma/client';

export const AUTH_ABILITY_KEY = Symbol('Auth Abilities');

export const Subjects: Subject[] = [
  'Identity',
  'Permission',
  'Role',
  'Slide',
  'User',
  'all',
];

export const Actions: Action[] = [
  'Manage',
  'Create',
  'Read',
  'Update',
  'Delete',
];
