import { Action, Subject } from '../entities';

export const AUTH_ABILITY_KEY = Symbol('Auth Abilities');

export const Subjects: Subject[] = [
  Subject.Identity,
  Subject.Permission,
  Subject.Role,
  Subject.Slide,
  Subject.User,
  Subject.all,
];

export const Actions: Action[] = [
  Action.Manage,
  Action.Create,
  Action.Read,
  Action.Update,
  Action.Delete,
];
