import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  ClassSerializerInterceptor,
  HttpStatus,
  RequestMethod,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { configSwagger } from '@utils/config-swagger'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import { AppDataSource } from '@database/data-source'
import { GlobalExceptionFilter } from '@filters/global-exception.filter'
import { TransformInterceptor } from 'src/interceptors/transform.interceptor'
import { DatabaseSeederService } from '@database/seeds/database-seeder.service'
import { IoAdapter } from '@nestjs/platform-socket.io'

async function setupEmailTransport() {
  try {
    const mailHost = process.env.SMTP_HOST
    const mailPort = process.env.SMTP_PORT
    const mailUser = process.env.SMTP_USER

    if (mailHost && mailPort) {
      console.log(`[Email Transport] Configured: ${mailHost}:${mailPort} (user: ${mailUser ? 'set' : 'not set'})`)
    } else {
      console.warn('[Email Transport] Configuration incomplete - email sending may fail')
    }
  } catch (error) {
    console.warn('[Email Transport] Setup check failed:', error)
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Setup Socket.IO adapter BEFORE other configurations
  app.useWebSocketAdapter(new IoAdapter(app))

  // Setup security headers
  app.use(helmet())

  // Database connection
  await AppDataSource.initialize()
    .then(() => console.log('Database connected!'))
    .catch((error) => console.error('Database connection error:', error))

  const nodeEnv = process.env.NODE_ENV ?? 'development'
  if (nodeEnv === 'development') {
    console.log('Development environment detected. Running database seeds...')
    try {
      const seederService = new DatabaseSeederService(AppDataSource)
      await seederService.seed()
      console.log('Database seeding completed successfully!')
    } catch (error) {
      console.error('Failed to seed database:', error)
    }
  } else if (nodeEnv === 'production') {
    console.log(
      'Production environment detected. Automatic database seeding is disabled. Please run "npm run seed" manually when needed.'
    )
  } else {
    console.log(`${nodeEnv} environment detected. Skipping automatic database seeds.`)
  }

  const configService = app.get(ConfigService)
  const reflector = app.get(Reflector)
  const corsOrigin = configService.getOrThrow<string>('app.corsOrigin', { infer: true })

  // Setup and verify email transport
  await setupEmailTransport()

  app.useGlobalFilters(new GlobalExceptionFilter(configService))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector), new TransformInterceptor(reflector))

  app.setGlobalPrefix(configService.getOrThrow<string>('app.apiPrefix', { infer: true }), {
    exclude: [
      { method: RequestMethod.GET, path: '/' },
      { method: RequestMethod.GET, path: 'healthz' }
    ]
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException(validationErrors)
      }
    })
  )

  //versioning
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
    credentials: true
  })

  //enable graceful shutdown
  app.enableShutdownHooks()
  console.info('CORS Origin:', corsOrigin)

  // Swagger
  configSwagger(app)
  await app.listen(configService.getOrThrow('app.port'))
}
bootstrap()
