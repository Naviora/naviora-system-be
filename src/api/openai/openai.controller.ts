import { Controller } from '@nestjs/common'
import { OpenaiService } from './openai.service'
import { Public } from '@decorators/auth.decorator'

@Controller({
  path: 'openai',
  version: '1'
})
@Public()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  // @Post('chatCompletion')
  // async createChatCompletion(@Body() body: ChatReqDto) {
  //   return this.openaiService.createChatCompletion(body.message)
  // }
}
