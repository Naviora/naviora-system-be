import { AllConfigType } from '@config/config.type'
import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import dayjs from 'dayjs'

type AccountInfo = {
  name: string
  email: string
  password: string
}

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly mailerService: MailerService
  ) {}

  async sendEmailVerification(email: string, token: string) {
    // Please replace the URL with your own frontend URL
    const url = `${process.env.APP_URL}/api/v1/auth/verify/email?token=${token}`

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        email: email,
        url
      }
    })
  }

  async sendReminder(to: string, userName: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Email Reminder',
      template: 'reminder',
      context: { userName }
    })
  }

  async sendAccountInfo(to: string, accountInfo: AccountInfo) {
    await this.mailerService.sendMail({
      to,
      subject: 'Account Information',
      template: 'account-info',
      context: { staffName: accountInfo.name, email: accountInfo.email, password: accountInfo.password }
    })
  }

  async sendOtp(to: string, otp: string, userName: string) {
    const currentDate = dayjs().format('DD/MM/YYYY')
    await this.mailerService.sendMail({
      to,
      subject: 'OTP',
      template: 'sendOtp',
      context: { currentDate, userName, otp }
    })
  }
}
