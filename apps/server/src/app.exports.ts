/**
 * Entities
 */
import type { EntityDTO } from '@mikro-orm/core';
import type { Identity as IdentityEntity } from './auth/identity/identity.entity';
import type { Character as CharacterEntity } from './character/character.entity';
import type { Form as FormEntity } from './form/form.entity';
import type { FormField as FormFieldEntity } from './form-field/form-field.entity';
import type { FormSubmission as FormSubmissionEntity } from './form-submission/form-submission.entity';
import type { Permission as PermisionEntity } from './permission/permission.entity';
import type { Role as RoleEntity } from './role/role.entity';
import type { Slide as SlideEntity } from './slide/slide.entity';
import type { User as UserEntity } from './user/user.entity';

export type Identity = EntityDTO<IdentityEntity>;
export type Character = EntityDTO<CharacterEntity>;
export type Form = EntityDTO<FormEntity>;
export type FormField = EntityDTO<FormFieldEntity>;
export type FormSubmission = EntityDTO<FormSubmissionEntity>;
export type Permission = EntityDTO<PermisionEntity>;
export type Role = EntityDTO<RoleEntity>;
export type Slide = EntityDTO<SlideEntity>;
export type User = EntityDTO<UserEntity>;
export type { EntityDTO };

export * from './auth/interfaces';
export * from './form-field/dto';
export * from './form-field/interfaces';
export * from './character/dto';
