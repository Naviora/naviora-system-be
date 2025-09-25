import { ClaimerAgent } from '@api/openai/config/agent'
import { ClaimRequestTool } from '@api/openai/tools/claim-request.tool'
import { Context } from '@api/user-context/dto/context.dto'
import { UserContextService } from '@api/user-context/user-context.service'
import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

type ToolCallHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any,
  userContext: Context[],
  systemPrompt: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialResponse: any,
  toolCallId: string,
  userID: string
) => Promise<string>

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI
  private toolCallHandlers: Record<string, ToolCallHandler>

  constructor(private readonly context: UserContextService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY
    })

    // Register tool call handlers
    this.registerToolCallHandlers()
  }

  private registerToolCallHandlers() {
    this.toolCallHandlers = {}
  }

  async createChatCompletion(userInput: string, userID: string) {
    try {
      const systemPrompt = ClaimerAgent
      const tools = ClaimRequestTool
      const userContext = await this.context.saveAndFetchContext(userInput, 'user', userID)

      const response = await this.openai.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...userContext],
        model: 'gpt-4o-mini',
        tools
      })

      // Hanlde tool calls
      if (response.choices.length > 0 && response.choices[0].message.tool_calls?.length > 0) {
        return await this.processToolCalls(
          response.choices[0].message.tool_calls,
          userContext,
          systemPrompt,
          response.choices[0].message,
          userID
        )
      }

      // Handle normal response
      const aiResponse = response.choices[0].message.content
      await this.context.saveToContext(aiResponse, 'assistant', userID)
      console.log(aiResponse)
      return aiResponse
    } catch (error) {
      console.error('Error in createChatCompletion:', error)
      return 'Sorry, I am unable to process your request at the moment.'
    }
  }

  private async processToolCalls(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toolCalls: any[],
    userContext: Context[],
    systemPrompt: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialResponse: any,
    userID: string
  ) {
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name
      const handler = this.toolCallHandlers[functionName]

      if (handler) {
        const args = JSON.parse(toolCall.function.arguments)
        return await handler(args, userContext, systemPrompt, initialResponse, toolCall.id, userID)
      }
    }

    // If no handler is found, return the initial response
    return initialResponse.content
  }

  private async getFollowUpResponse(
    userContext: Context[],
    systemPrompt: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialResponse: any,
    toolResponse: string,
    toolCallId: string,
    userID: string
  ) {
    const followUpResponse = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...userContext,
        initialResponse,
        {
          role: 'tool',
          content: toolResponse,
          tool_call_id: toolCallId
        }
      ],
      model: 'gpt-4o-mini',
      store: true
    })

    const aiResponse = followUpResponse.choices[0].message.content
    await this.context.saveToContext(aiResponse, 'assistant', userID)
    console.log(aiResponse)
    return aiResponse
  }
}
