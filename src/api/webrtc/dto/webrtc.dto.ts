import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class LeaveRoomDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class OfferDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  offer: RTCSessionDescriptionInit
}

export class AnswerDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  answer: RTCSessionDescriptionInit
}

export class IceCandidateDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  candidate: RTCIceCandidateInit
}

export class ScreenShareDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class StopScreenShareDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class RequestScreenShareDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  fromUserId: string

  @IsString()
  @IsNotEmpty()
  toUserId: string
}

export class ScreenShareOfferDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  offer: RTCSessionDescriptionInit
}

export class ScreenShareAnswerDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  answer: RTCSessionDescriptionInit
}

export class ScreenShareIceCandidateDto {
  @IsString()
  @IsNotEmpty()
  roomId: string

  @IsString()
  @IsNotEmpty()
  targetUserId: string

  @IsNotEmpty()
  candidate: RTCIceCandidateInit
}
