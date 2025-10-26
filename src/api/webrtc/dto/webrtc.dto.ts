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
