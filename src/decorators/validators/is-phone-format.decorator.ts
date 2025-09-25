import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsPhoneNumber(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isPhoneNumber',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^(\+\d{1,3})?\d{9,11}$/.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid phone number (9-11 digits, optional country code)`
        }
      }
    })
  }
}
