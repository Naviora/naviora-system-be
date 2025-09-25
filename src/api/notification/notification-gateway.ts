import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { OpenaiService } from '@api/openai/openai.service'
import { UserContextService } from '@api/user-context/user-context.service'
import { User } from '@api/user/entities/user.entity'

interface AuthenticatedSocket extends Socket {
  user?: any
}

@WebSocketGateway(3332, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private userSockets = new Map<string, string>()

  constructor(
    private readonly openaiService: OpenaiService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly context: UserContextService
  ) {}

  afterInit(server: Server) {
    // Add authentication middleware
    server.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const token = socket.handshake.headers?.auth || socket.handshake.auth?.token
        if (!token) {
          return next(new ValidationException(ErrorCode.ES001))
        }

        // Remove 'Bearer ' if present
        const tokenValue = token.split(' ')[1]
        const decoded = await this.jwtService.verify(tokenValue, {
          secret: this.configService.get<string>('ACCESS_SECRET')
        })
        const user = await this.userRepository.findOne({
          where: { id: decoded.id },
          relations: ['staff']
        })
        if (!user) {
          return next(new ValidationException(ErrorCode.E002))
        }
        socket.user = user
        next()
      } catch (error) {
        console.log('Socket authentication error:', error.message)
        next(new ValidationException(ErrorCode.ES001))
      }
    })
  }

  handleConnection(client: AuthenticatedSocket) {
    try {
      if (!client.user) {
        console.log('No user data, disconnecting')
        client.disconnect()
        return
      }

      console.log(`🔗 Client connected: ${client.id}, User: ${client.user.id}`)
      this.userSockets.set(client.user.id, client.id)
      this.context.saveToContext(
        `User connected with userId: ${client.user.id}, staffId: ${client.user.staff.id}`,
        'user',
        client.user.id
      )
    } catch (error) {
      console.log('Connection error:', error)
      client.disconnect()
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    try {
      if (client.user) {
        this.userSockets.delete(client.user.id)
        console.log(`🔌 Client disconnected: ${client.id}, User: ${client.user.id}`)
      }
    } catch (error) {
      console.log('Disconnect error:', error)
    }
  }

  @SubscribeMessage('CLIENT_SEND_MESSAGE')
  async handleMessage(client: Socket, message: string) {
    console.log(message)
    const userId = Array.from(this.userSockets.keys()).find((key) => this.userSockets.get(key) === client.id)
    const response = await this.openaiService.createChatCompletion(message, userId)
    client.emit('AI_SEND_MESSAGE', response)
    console.log(response)
  }
}
