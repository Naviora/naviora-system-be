import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Request as ExpressRequest } from 'express'
import { LoginDTO } from './dto/login-auth.dto'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { ChangePasswordAuthDto, EmailDTO, ForgotPasswordDTO } from './dto/change-password-auth'
import { AccessTokenGuard } from './passport/accessToken.guard'
import { VerifyOtpDTO } from './dto/verify-otp-payload'
import { ApiResponse as ApiResponseSuccess } from '@common/dto/api-response.dto'
import { Public } from '@decorators/auth.decorator'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { JwtPayloadType } from '@api/auth/types/jwt-payload.type'
import { RefreshReqDto } from '@api/auth/dto/refresh.req.dto'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return JWT token' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: { email: { type: 'string' }, password: { type: 'string' } }
    },
    description: 'Login Account',
    type: LoginDTO,
    examples: {
      example1: { summary: 'Login Account', value: { email: 'admin@naviora.com', password: 'Admin@123' } }
    }
  })
  @ResponseMessage('Login successfully')
  async login(@Request() req: ExpressRequest & { user: { id: string; role?: string } }) {
    try {
      return await this.authService.login(req.user)
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token', description: 'Get new refresh token' })
  @ApiBody({
    type: RefreshReqDto,
    examples: { example1: { summary: 'Refresh token', value: { refresh_token: 'token' } } }
  })
  @ResponseMessage('Get refresh token successfully')
  async refreshToken(@Body() dto: RefreshReqDto) {
    return await this.authService.refreshToken(dto.refresh_token)
  }

  @ApiOperation({
    description: 'Logout user and remove refresh token from redis',
    summary: 'Logout user'
  })
  @Post('logout')
  @ApiBody({ description: 'Login Account' })
  @ResponseMessage('Logout successfully')
  async logout(@CurrentUser() userToken: JwtPayloadType) {
    console.log('user token', userToken)
    return await this.authService.logout(userToken)
  }

  @Post('change-password')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Change password', description: 'Change user password with current password verification' })
  @ApiBody({
    description: 'Change Password',
    type: ChangePasswordAuthDto,
    examples: {
      example1: {
        summary: 'Change Password Example',
        value: { currentPassword: 'oldPassword123', confirmPassword: 'newPassword123', newPassword: 'newPassword123' }
      }
    }
  })
  async changePassword(@Request() req: ExpressRequest & { user: { id: string } }, @Body() data: ChangePasswordAuthDto) {
    await this.authService.changePassword(req.user.id, data)
    return new ApiResponseSuccess().setCode(200).setMessage('Change password successfully')
  }

  @Public()
  @Post('/create-otp')
  @ApiOperation({ summary: 'Create OTP', description: 'Generate OTP for email verification' })
  @ApiBody({
    description: 'Email Address',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'OTP created successfully'
  })
  async createOtp(@Body() payload: EmailDTO) {
    await this.authService.createOtp(payload)
    return new ApiResponseSuccess().setCode(200).setMessage('Create OTP successfully')
  }

  @Public()
  @Post('/active-account-otp')
  @ApiOperation({ summary: 'Active Account', description: 'Verify OTP sent to the user email' })
  @ApiBody({
    description: 'Active Account',
    type: VerifyOtpDTO,
    examples: {
      example1: {
        summary: 'Valid OTP Example',
        value: {
          email: 'user@example.com',
          otp: '123456'
        }
      }
    }
  })
  @ApiResponse({
    status: 204,
    description: 'OTP is valid'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or expired'
  })
  async activeAccountOtp(@Body() payload: VerifyOtpDTO) {
    try {
      const account = await this.authService.verifyOtp(payload)
      await this.authService.activeAccountOtp(account)
      return new ApiResponseSuccess().setCode(204).setMessage('Account authentication successful')
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Post('/verify-otp')
  @ApiOperation({ summary: 'Verify OTP', description: 'Verify OTP sent to the user email' })
  @ApiBody({
    description: 'Verify OTP Payload',
    type: VerifyOtpDTO,
    examples: {
      example1: {
        summary: 'Valid OTP Example',
        value: {
          email: 'user@example.com',
          otp: '123456'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'OTP is valid'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or expired'
  })
  async verifyOtp(@Body() payload: VerifyOtpDTO) {
    try {
      await this.authService.verifyOtp(payload)
      return new ApiResponseSuccess().setCode(200).setMessage('OTP is valid')
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Post('/forgot-password')
  @ApiOperation({
    summary: 'Forgot Password',
    description: 'Forgot user password using email, OTP, and new password'
  })
  @ApiBody({
    description: 'Forgot Password Payload',
    type: ForgotPasswordDTO,
    examples: {
      example1: {
        summary: 'Forgot Password Example',
        value: {
          email: 'user@example.com',
          otp: '123456',
          newPassword: 'NewPassword123',
          confirmNewPassword: 'NewPassword123'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or passwords do not match'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  async forgotPassword(@Body() payload: ForgotPasswordDTO) {
    try {
      const { email, otp, newPassword, confirmNewPassword } = payload
      const account = await this.authService.verifyOtp({ email, otp })
      await this.authService.forgotPassword({ id: account.id, email, otp, newPassword, confirmNewPassword })
      return new ApiResponseSuccess().setCode(200).setMessage('Password reset successfully')
    } catch (error) {
      throw error
    }
  }
}
