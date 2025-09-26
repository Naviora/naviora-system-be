import { AllConfigType } from '@config/config.type'
import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NextFunction, Request, Response } from 'express'

export function configSwagger(app: INestApplication) {
  const appEnv = app.get(ConfigService).get<AllConfigType>('app', { infer: true })

  const api_documentation_credentials = {
    name: appEnv.apiDocsUsername,
    pass: appEnv.apiDocsPassword
  }

  const config = new DocumentBuilder()
    .setTitle('Naviora API')
    .setDescription('## The Naviora API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'Authorization'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)

  const http_adapter = app.getHttpAdapter()
  http_adapter.use('/api-docs', (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.status(401).set('WWW-Authenticate', 'Basic').send('Unauthorized')
      return
    }

    const authHeader = req.headers.authorization
    if (authHeader.startsWith('Basic ')) {
      const encodedPart = authHeader.split(' ')[1]
      const buff = Buffer.from(encodedPart, 'base64')
      const text = buff.toString('ascii')
      const [name, pass] = text.split(':')

      if (name !== api_documentation_credentials.name || pass !== api_documentation_credentials.pass) {
        res.status(401).set('WWW-Authenticate', 'Basic').send('Unauthorized')
        return
      }
    } else if (authHeader.startsWith('Bearer ')) {
      next()
      return
    } else {
      res.status(401).set('WWW-Authenticate', 'Basic').send('Unauthorized')
      return
    }
    next()
  })

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true }
  })
}
