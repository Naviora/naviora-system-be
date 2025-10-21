import { Injectable, Logger } from '@nestjs/common'

interface RoomUser {
  userId: string
  socketId: string
}

@Injectable()
export class WebRTCService {
  private readonly logger = new Logger(WebRTCService.name)
  private rooms: Map<string, RoomUser[]> = new Map()
  private socketToUser: Map<string, string> = new Map()

  addUserToRoom(roomId: string, userId: string, socketId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, [])
    }

    const room = this.rooms.get(roomId)
    const existingUserIndex = room.findIndex((user) => user.userId === userId)

    if (existingUserIndex !== -1) {
      // Update existing user's socket ID
      room[existingUserIndex].socketId = socketId
    } else {
      // Add new user
      room.push({ userId, socketId })
    }

    this.socketToUser.set(socketId, userId)
    this.logger.log(`User ${userId} added to room ${roomId} with socket ${socketId}`)
  }

  removeUserFromRoom(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId)
    if (room) {
      const userIndex = room.findIndex((user) => user.userId === userId)
      if (userIndex !== -1) {
        const user = room[userIndex]
        this.socketToUser.delete(user.socketId)
        room.splice(userIndex, 1)
        this.logger.log(`User ${userId} removed from room ${roomId}`)
      }
    }
  }

  getUserSocketId(roomId: string, userId: string): string | null {
    const room = this.rooms.get(roomId)
    if (room) {
      const user = room.find((u) => u.userId === userId)
      return user ? user.socketId : null
    }
    return null
  }

  getUserIdBySocketId(socketId: string): string | null {
    return this.socketToUser.get(socketId) || null
  }

  getRoomUsers(roomId: string): RoomUser[] {
    return this.rooms.get(roomId) || []
  }

  handleDisconnect(socketId: string): void {
    const userId = this.socketToUser.get(socketId)
    if (userId) {
      this.socketToUser.delete(socketId)

      // Remove user from all rooms
      for (const [roomId, users] of this.rooms.entries()) {
        const userIndex = users.findIndex((user) => user.socketId === socketId)
        if (userIndex !== -1) {
          users.splice(userIndex, 1)
          this.logger.log(`User ${userId} disconnected from room ${roomId}`)
        }
      }
    }
  }

  createRoom(roomId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, [])
      this.logger.log(`Room ${roomId} created`)
    }
  }

  deleteRoom(roomId: string): void {
    const room = this.rooms.get(roomId)
    if (room) {
      // Clean up socket mappings for all users in the room
      room.forEach((user) => {
        this.socketToUser.delete(user.socketId)
      })
      this.rooms.delete(roomId)
      this.logger.log(`Room ${roomId} deleted`)
    }
  }
}
