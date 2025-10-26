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
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`Offer from ${fromUserId} (${client.id}) to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      this.logger.log(`Forwarding offer to ${data.targetUserId} (${targetSocketId})`)
      client.to(targetSocketId).emit('offer', {
        offer: data.offer,
        fromUserId: fromUserId
      })
    } else {
      this.logger.warn(`Target user ${data.targetUserId} not found in room ${data.roomId}`)
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() data: { roomId: string; answer: RTCSessionDescriptionInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`Answer from ${fromUserId} (${client.id}) to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      this.logger.log(`Forwarding answer to ${data.targetUserId} (${targetSocketId})`)
      client.to(targetSocketId).emit('answer', {
        answer: data.answer,
        fromUserId: fromUserId
      })
    } else {
      this.logger.warn(`Target user ${data.targetUserId} not found in room ${data.roomId}`)
    }
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    @MessageBody() data: { roomId: string; candidate: RTCIceCandidateInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`ICE candidate from ${fromUserId} (${client.id}) to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      this.logger.log(`Forwarding ICE candidate to ${data.targetUserId} (${targetSocketId})`)
      client.to(targetSocketId).emit('ice-candidate', {
        candidate: data.candidate,
        fromUserId: fromUserId
      })
    } else {
      this.logger.warn(`Target user ${data.targetUserId} not found in room ${data.roomId}`)
    }
  }

  @SubscribeMessage('start-screen-share')
  handleStartScreenShare(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} starting screen share in room ${data.roomId}`)
    this.webrtcService.setScreenSharingUser(data.roomId, data.userId)
    client.to(data.roomId).emit('screen-share-started', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('stop-screen-share')
  handleStopScreenShare(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} stopping screen share in room ${data.roomId}`)
    this.webrtcService.clearScreenSharingUser(data.roomId)
    client.to(data.roomId).emit('screen-share-stopped', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('request-screen-share')
  handleRequestScreenShare(
    @MessageBody() data: { roomId: string; fromUserId: string; toUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`User ${data.fromUserId} requesting screen share from ${data.toUserId} in room ${data.roomId}`)
    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.toUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('screen-share-request', {
        fromUserId: data.fromUserId,
        timestamp: Date.now()
      })
    }
  }

  @SubscribeMessage('screen-share-offer')
  handleScreenShareOffer(
    @MessageBody() data: { roomId: string; offer: RTCSessionDescriptionInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`Screen share offer from ${fromUserId} to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('screen-share-offer', {
        offer: data.offer,
        fromUserId: fromUserId
      })
    }
  }

  @SubscribeMessage('screen-share-answer')
  handleScreenShareAnswer(
    @MessageBody() data: { roomId: string; answer: RTCSessionDescriptionInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`Screen share answer from ${fromUserId} to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('screen-share-answer', {
        answer: data.answer,
        fromUserId: fromUserId
      })
    }
  }

  @SubscribeMessage('screen-share-ice-candidate')
  handleScreenShareIceCandidate(
    @MessageBody() data: { roomId: string; candidate: RTCIceCandidateInit; targetUserId: string },
    @ConnectedSocket() client: Socket
  ) {
    const fromUserId = this.webrtcService.getUserIdBySocketId(client.id)
    this.logger.log(`Screen share ICE candidate from ${fromUserId} to ${data.targetUserId}`)

    const targetSocketId = this.webrtcService.getUserSocketId(data.roomId, data.targetUserId)
    if (targetSocketId) {
      client.to(targetSocketId).emit('screen-share-ice-candidate', {
        candidate: data.candidate,
        fromUserId: fromUserId
      })
    }
  }

  @SubscribeMessage('send-message')
  handleSendMessage(
    @MessageBody() data: { roomId: string; userId: string; message: string; timestamp: number },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Message from ${data.userId} in room ${data.roomId}: ${data.message}`)
    client.to(data.roomId).emit('new-message', {
      userId: data.userId,
      message: data.message,
      timestamp: data.timestamp
    })
  }

  @SubscribeMessage('raise-hand')
  handleRaiseHand(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} raised hand in room ${data.roomId}`)
    client.to(data.roomId).emit('hand-raised', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('lower-hand')
  handleLowerHand(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} lowered hand in room ${data.roomId}`)
    client.to(data.roomId).emit('hand-lowered', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('start-recording')
  handleStartRecording(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} started recording in room ${data.roomId}`)
    client.to(data.roomId).emit('recording-started', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('stop-recording')
  handleStopRecording(@MessageBody() data: { roomId: string; userId: string }, @ConnectedSocket() client: Socket) {
    this.logger.log(`User ${data.userId} stopped recording in room ${data.roomId}`)
    client.to(data.roomId).emit('recording-stopped', {
      userId: data.userId,
      timestamp: Date.now()
    })
  }

  @SubscribeMessage('debug-room-state')
  handleDebugRoomState(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    const roomState = this.webrtcService.getRoomState(data.roomId)
    this.logger.log(`Room state for ${data.roomId}:`, roomState)
    client.emit('room-state-debug', roomState)
  }
}
