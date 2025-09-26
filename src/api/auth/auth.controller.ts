import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login-auth.dto'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { RefreshTokenGuard } from './passport/refreshToken.guard'
import { ChangePasswordAuthDto, EmailDTO, ForgotPasswordDTO } from './dto/change-password-auth'
import { AccessTokenGuard } from './passport/accessToken.guard'
import { VerifyOtpDTO } from './dto/verify-otp-payload'
import { ApiResponse as ApiResponseSuccess } from '@common/dto/api-response.dto'
import { Public } from '@decorators/auth.decorator'

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
      example1: { summary: 'Login Account', value: { email: 'thang09052004@gmail.com', password: 'Login123@' } }
    }
  })
  async login(@Request() req: any) {
    try {
      const response = await this.authService.login(req.user)
      return new ApiResponseSuccess().setCode(200).setMessage('Login successfully').setData(response)
    } catch (error) {
      throw error
    }
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token', description: 'Get new refresh token' })
  @ApiBody({ type: LoginDTO, examples: { example1: { summary: 'Refresh token', value: { refreshToken: 'token' } } } })
  async refreshToken(@Request() req: any) {
    const response = await this.authService.refreshToken(req.user.refreshToken)
    return new ApiResponseSuccess().setCode(200).setMessage('Get refresh token successfully').setData(response)
  }

  @Public()
  @ApiOperation({
    description: 'Logout user and remove refresh token from redis',
    summary: 'Logout user'
  })
  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  @ApiBody({ description: 'Login Account', examples: { example1: { value: { refreshToken: 'token' } } } })
  @Get('logout')
  async logout(@Request() req: any) {
    await this.authService.logout(req.user.id)
    return new ApiResponseSuccess().setCode(200).setMessage('Logout successfully')
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
  async changePassword(@Request() req: any, @Body() data: ChangePasswordAuthDto) {
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
