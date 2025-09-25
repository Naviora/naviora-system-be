import { StringField } from '@decorators/field.decorators'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

export class CreateChatCompletionRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatCompletionMessageDto)
  messages: ChatCompletionMessageDto[]
}

export class ChatCompletionMessageDto {
  @StringField({ required: true })
  role: string

  @StringField({ required: true })
  content: string
}

export class ChatReqDto {
  @StringField({ required: true })
  message: string
}
