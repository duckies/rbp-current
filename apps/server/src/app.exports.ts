/**
 * Entities
 */
import type { EntityDTO } from '@mikro-orm/core'
import type { Identity as _Identity } from './auth/identity/identity.entity'
import type { Character as _Character } from './character/character.entity'
import type { FieldType, FormField as _FormField } from './form-field/form-field.entity'
import type { DiscriminatedFormField as _DiscriminatedFormField } from './form-field/interfaces'
import type { FormSubmission as _FormSubmission } from './form-submission/form-submission.entity'
import type { Form as _Form } from './form/form.entity'
import type { Permission as _Permission } from './permission/permission.entity'
import type { Role as _Role } from './role/role.entity'
import type { Slide as _Slide } from './slide/slide.entity'
import type { User as _User } from './user/user.entity'

export type Identity = EntityDTO<_Identity>
export { Provider, Providers } from './auth/identity/identity.entity'
export * from './auth/interfaces'
export * from './character/dto'
export * from './form-field/dto'
export type { EntityDTO }

export type Character = EntityDTO<_Character>
export type Form = EntityDTO<_Form>
export type FormField<T extends FieldType> = EntityDTO<_FormField<T>>
export type DiscriminatedFormField = EntityDTO<_DiscriminatedFormField>
export type FormSubmission = EntityDTO<_FormSubmission>
export type Permission = EntityDTO<_Permission>
export type Role = EntityDTO<_Role>
export type Slide = EntityDTO<_Slide>
export type User = EntityDTO<_User>
