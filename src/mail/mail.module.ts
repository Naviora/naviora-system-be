import { AllConfigType } from '@config/config.type'
import { MailService } from '@mail/mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { existsSync } from 'fs'

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService<AllConfigType>) => {
        const mailHost = config.get('mail.host', { infer: true }) || 'smtp.gmail.com'
        const mailPort = config.get('mail.port', { infer: true }) || 587
        const mailUser = config.get('mail.user', { infer: true })
        const mailPassword = config.get('mail.password', { infer: true })

        console.log(
          `[MailModule] Config loaded: host=${mailHost}, port=${mailPort}, user=${mailUser ? '***' : 'not set'}, password=${mailPassword ? '***' : 'not set'}`
        )

        // Build transport config with authentication (required for Gmail)
        const transportConfig: Record<string, unknown> = {
          host: mailHost,
          port: mailPort,
          ignoreTLS: config.get('mail.ignoreTLS', { infer: true }) || false,
          requireTLS: config.get('mail.requireTLS', { infer: true }) !== false,
          secure: config.get('mail.secure', { infer: true }) || false,
          logger: false
        }

        // Add authentication if credentials are provided (required for Gmail SMTP)
        if (mailUser && mailPassword) {
          transportConfig.auth = {
            user: mailUser,
            pass: mailPassword
          }
          console.log(`[MailModule] Auth configured for user: ${mailUser}`)
        } else {
          console.error(
            `[MailModule] Missing credentials! user=${mailUser ? 'set' : 'NOT SET'}, password=${mailPassword ? 'set' : 'NOT SET'}`
          )
        }

        // Resolve template directory - works in both dev and production
        // Try compiled location first (production), then source location (development)
        let templateDir = join(__dirname, 'templates')
        if (!existsSync(templateDir)) {
          // Fallback to source location for development
          templateDir = join(process.cwd(), 'src', 'mail', 'templates')
        }

        console.log(`[MailModule] Template directory: ${templateDir}`)

        return {
          transport: transportConfig,
          defaults: {
            from: `"${config.get('mail.defaultName', { infer: true })}" <${config.get('mail.defaultEmail', { infer: true })}>`
          },
          template: {
            dir: templateDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true
            }
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
