import { registerAs } from '@nestjs/config'

import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import validateConfig from '@utils/validate-config'
import { MailConfig } from 'src/mail/config/mail-config.type'

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  MAIL_HOST: string

  @IsString()
  @IsOptional()
  SMTP_HOST: string

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  MAIL_PORT: number

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  SMTP_PORT: number

  @IsString()
  @IsOptional()
  MAIL_USER: string

  @IsString()
  @IsOptional()
  SMTP_USER: string

  @IsString()
  @IsOptional()
  MAIL_PASSWORD: string

  @IsString()
  @IsOptional()
  SMTP_PASS: string

  @IsBoolean()
  @IsOptional()
  MAIL_IGNORE_TLS: boolean

  @IsBoolean()
  @IsOptional()
  MAIL_SECURE: boolean

  @IsBoolean()
  @IsOptional()
  MAIL_REQUIRE_TLS: boolean

  @IsEmail()
  @IsOptional()
  MAIL_DEFAULT_EMAIL: string

  @IsString()
  @IsOptional()
  MAIL_DEFAULT_NAME: string

  @IsString()
  @IsOptional()
  EMAIL_FROM: string
}

export default registerAs<MailConfig>('mail', () => {
  console.info(`Register MailConfig from environment variables`)

  // Support both SMTP_* and MAIL_* formats, prioritize SMTP_*
  const host = process.env.SMTP_HOST || process.env.MAIL_HOST
  const port = process.env.SMTP_PORT || process.env.MAIL_PORT || '587'
  const user = process.env.SMTP_USER || process.env.MAIL_USER
  const password = process.env.SMTP_PASS || process.env.MAIL_PASSWORD

  console.info(
    `[MailConfig] Raw env: SMTP_HOST=${process.env.SMTP_HOST ? 'set' : 'not set'}, SMTP_USER=${process.env.SMTP_USER ? 'set' : 'not set'}, SMTP_PASS=${process.env.SMTP_PASS ? 'set' : 'not set'}`
  )

  // Parse EMAIL_FROM format: "Name <email@example.com>" or just email
  let defaultEmail = process.env.EMAIL_FROM

  if (process.env.EMAIL_FROM) {
    const emailFromMatch = process.env.EMAIL_FROM.match(/^"?([^<"]+)"?\s*<([^>]+)>$/)
    if (emailFromMatch) {
      defaultEmail = emailFromMatch[2].trim()
    } else {
      defaultEmail = process.env.EMAIL_FROM.replace(/"/g, '').trim()
    }
  }

  const config = {
    host: host || 'smtp.gmail.com',
    port: parseInt(port, 10),
    user: user,
    password: password,
    ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
    secure: process.env.MAIL_SECURE === 'true',
    requireTLS: process.env.MAIL_REQUIRE_TLS !== 'false', // Default to true for Gmail
    defaultEmail: defaultEmail || user || 'noreply@example.com'
  }

  console.info(
    `Mail Config: host=${config.host}, port=${config.port}, user=${config.user ? '***' : 'not set'}, password=${config.password ? '***' : 'not set'}`
  )

  // Only validate if we have required fields
  if (host || process.env.MAIL_HOST) {
    validateConfig(process.env, EnvironmentVariablesValidator)
  }

  return config
})
