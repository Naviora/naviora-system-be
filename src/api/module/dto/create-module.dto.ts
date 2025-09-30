import { IsNotEmpty } from 'class-validator'

export class CreateModuleDto {
  @IsNotEmpty()
  /**
   * TODO: should check the format of the moduleCode match with the specific regex
   */
  moduleCode: string

  @IsNotEmpty()
  moduleName: string

  moduleDescription?: string
}
