import { FieldType, FormField } from '../form-field.entity'

export type DistributeFieldTypes<T extends FieldType> = T extends FieldType ? FormField<T> : never
export type DiscriminatedFormField = DistributeFieldTypes<FieldType>
