import { Module } from '@nestjs/common'
import { WebRTCGateway } from './webrtc.gateway'
import { WebRTCService } from './webrtc.service'

@Module({
  providers: [WebRTCGateway, WebRTCService],
  exports: [WebRTCService]
})
export class WebRTCModule {}
