import { IsNotEmpty } from 'class-validator'

export class CreateModuleDto {
  @IsNotEmpty()
  moduleCode: string

  @IsNotEmpty()
  moduleName: string

  moduleDescription?: string
}
