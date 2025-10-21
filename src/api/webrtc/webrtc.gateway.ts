import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'
import { WebRTCService } from './webrtc.service'

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  namespace: '/webrtc',
  transports: ['websocket', 'polling']
})
export class WebRTCGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger = new Logger(WebRTCGateway.name)

  constructor(private readonly webrtcService: WebRTCService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    this.webrtcService.handleDisconnect(client.id)
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} joining room ${data.roomId}`)
    client.join(data.roomId)
    this.webrtcService.addUserToRoom(data.roomId, data.userId, client.id)

    // Notify other users in the room
    client.to(data.roomId).emit('user-joined', {
      userId: data.userId,
      socketId: client.id
    })

    // Send list of existing users to the new user
    const existingUsers = this.webrtcService.getRoomUsers(data.roomId)
    client.emit(
      'existing-users',
      existingUsers.map((user) => ({
        userId: user.userId,
        socketId: user.socketId
      }))
    )
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} leaving room ${data.roomId}`)
    client.leave(data.roomId)
    this.webrtcService.removeUserFromRoom(data.roomId, data.userId)

    // Notify other users in the room
    client.to(data.roomId).emit('user-left', {
      userId: data.userId
    })
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody() data: { roomId: string; offer: RTCSessionDescriptionInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Offer from ${client.id} to ${data.targetUserId}`)
    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('offer', {
        offer: data.offer,
        fromUserId: this.webrtcService.getUserIdBySocketId(client.id)
      })
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() data: { roomId: string; answer: RTCSessionDescriptionInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Answer from ${client.id} to ${data.targetUserId}`)
    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('answer', {
        answer: data.answer,
        fromUserId: this.webrtcService.getUserIdBySocketId(client.id)
      })
    }
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    @MessageBody() data: { roomId: string; candidate: RTCIceCandidateInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`ICE candidate from ${client.id} to ${data.targetUserId}`)
    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('ice-candidate', {
        candidate: data.candidate,
        fromUserId: this.webrtcService.getUserIdBySocketId(client.id)
      })
    }
  }

  @SubscribeMessage('start-screen-share')
  handleStartScreenShare(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} starting screen share in room ${data.roomId}`)
    client.to(data.roomId).emit('screen-share-started', {
      userId: data.userId
    })
  }

  @SubscribeMessage('stop-screen-share')
  handleStopScreenShare(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} stopping screen share in room ${data.roomId}`)
    client.to(data.roomId).emit('screen-share-stopped', {
      userId: data.userId
    })
  }
}
