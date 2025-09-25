import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpStatus, RequestMethod, UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { configSwagger } from '@utils/config-swagger'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import { AppDataSource } from '@database/data-source'
import { GlobalExceptionFilter } from '@filters/global-exception.filter'
import { TransformInterceptor } from 'src/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Setup security headers
  app.use(helmet())

  // Database connection
  AppDataSource.initialize()
    .then(() => console.log('Database connected!'))
    .catch((error) => console.error('Database connection error:', error))

  const configService = app.get(ConfigService)
  const reflector = app.get(Reflector)
  const corsOrigin = configService.getOrThrow<string>('app.corsOrigin', { infer: true })

  app.useGlobalFilters(new GlobalExceptionFilter(configService))
  app.useGlobalInterceptors(new TransformInterceptor(reflector))

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
