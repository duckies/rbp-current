import { isArray, isPOJO } from '@rbp/shared'
import { registerDecorator, ValidationOptions } from 'class-validator'

const uuidv4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export function IsFormFieldArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFormFieldArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return !isArray(value) && isPOJO(value) && Object.keys(value).every((k) => uuidv4.test(k))
        },
      },
    })
  }
}
