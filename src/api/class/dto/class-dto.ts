import { ClassType } from '@common/enums/class-types.enum'

export class ClassDTO {
  classId: string
  classCode: string
  className: string
  classType: ClassType
  startDate: Date
  endDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
