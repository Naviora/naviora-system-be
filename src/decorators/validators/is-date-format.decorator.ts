import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsDateFormat(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      propertyName: propertyName as string,
      name: 'isDateFormat',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format: YYYY-MM-DD`
        }
      }
    })
  }
}
