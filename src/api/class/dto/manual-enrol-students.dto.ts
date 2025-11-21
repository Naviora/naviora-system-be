import { StringField, UUIDField } from '@decorators/field.decorators'

export class ManualEnrolStudentsDto {
  @StringField()
  readonly class_id: string

  @UUIDField({ each: true })
  readonly student_ids: string[]
}
