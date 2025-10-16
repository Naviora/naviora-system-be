import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { QuestionSetService } from './question-set.service'
import { CreateQuestionSetDto } from './dto/create-question-set.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { RolesGuard } from '@guards/roles.guard'

@ApiTags('Question Sets')
@Controller({ path: 'question-set', version: '1' })
@UseGuards(RolesGuard)
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
@ApiBearerAuth('Authorization')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question set (exam test set)' })
  @ApiBody({ description: 'Payload to create question set', type: CreateQuestionSetDto })
  @ResponseMessage('Question set created successfully')
  async create(@Body() dto: CreateQuestionSetDto, @CurrentUser() currentUser: User) {
    return await this.questionSetService.create(dto, currentUser)
  }
}
