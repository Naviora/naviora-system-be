import { ArrayField, EnumFieldOptional, StringField, UUIDArrayField } from '@decorators/field.decorators'

export class ManualEnrolStudentsDto {
  @StringField()
  readonly class_id: string

  @UUIDArrayField()
  readonly student_ids: string[]
}


