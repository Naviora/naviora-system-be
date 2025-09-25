import { Context } from '@api/user-context/dto/context.dto'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class UserContextService {
  private readonly contextExpirationTime: number = 10800 // Expiration Time In Seconds
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async saveToContext(context: string, contextType: 'user' | 'assistant', userID: string) {
    try {
      const value = JSON.stringify({
        role: contextType,
        content: context
      })
      const hashedUserID = `conversation:${userID}`
      await this.redis.rpush(hashedUserID, value)
      await this.redis.expire(hashedUserID, this.contextExpirationTime)

      return 'Context Saved!'
    } catch (error) {
      console.error('Error Saving Context', error)
      return 'Error Saving Context'
    }
  }

  async saveAndFetchContext(context: string, contextType: 'user' | 'assistant', userID: string): Promise<Context[]> {
    try {
      const pipeline = this.redis.pipeline()
      const value = JSON.stringify({
        role: contextType,
        content: context
      })

      const hashedUserID = `conversation:${userID}`

      // Add context saving to pipeline
      pipeline.rpush(hashedUserID, value)

      pipeline.lrange(hashedUserID, 0, -1)

      pipeline.expire(hashedUserID, this.contextExpirationTime)

      // Execute both operations in a single round-trip

      const results = await pipeline.exec()
      const conversationContext = results[1][1] as string[]

      return conversationContext.map((item) => JSON.parse(item))
    } catch (error) {
      console.error('Error Saving Context And Retrieving', error)
      return []
    }
  }

  async getConversationHistory(userID: string) {
    try {
      const hashedUserID = `conversation:${userID}`
      const conversation = await this.redis.lrange(hashedUserID, 0, -1)

      await this.redis.expire(hashedUserID, this.contextExpirationTime)

      return conversation.map((item) => JSON.parse(item))
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
