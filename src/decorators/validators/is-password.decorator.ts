import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsPassword(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (typeof value !== 'string') return false

          const conditions = [/[a-z]/.test(value), /[A-Z]/.test(value), /\d/.test(value), /[!#$%&*@^]/.test(value)]

          const passedConditions = conditions.filter(Boolean).length

          return value.length >= 6 && passedConditions >= 3
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be at least 6 characters long and meet at least 3 of the following: uppercase letter, lowercase letter, number, special character (!#$%&*@^)`
        }
      }
    })
  }
}
