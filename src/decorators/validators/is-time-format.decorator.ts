import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsTimeFormat(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isTimeFormat',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(value) // Matches h:mm AM/PM
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format: hh:mm AM/PM`
        }
      }
    })
  }
}
