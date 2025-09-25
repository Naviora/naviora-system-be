# NestJS Boilerplate

A comprehensive, production-ready NestJS boilerplate with modern architecture, best practices, and essential features out of the box.

## 🚀 Features

- **🔐 Authentication & Authorization**: JWT-based auth with role-based access control
- **📡 Real-time Communication**: WebSocket support with notification system
- **☁️ File Management**: Cloud storage integration (Cloudinary)
- **📧 Email System**: Automated email sending with templates
- **🤖 AI Integration**: OpenAI API integration ready
- **📊 Database**: PostgreSQL with TypeORM, migrations, and seeding
- **⚡ Caching**: Redis integration for performance
- **🔄 Queue Processing**: Background job processing with BullMQ
- **📚 API Documentation**: Swagger/OpenAPI with authentication
- **🧪 Testing**: Jest setup for unit and e2e tests
- **🐳 Docker**: Containerization support
- **⚙️ Configuration**: Environment-based configuration management
- **🛡️ Security**: Input validation, rate limiting, and security best practices

## 🛠️ Technology Stack

| Category          | Technology                          |
| ----------------- | ----------------------------------- |
| **Framework**     | NestJS                              |
| **Language**      | TypeScript                          |
| **Database**      | PostgreSQL + TypeORM                |
| **Cache**         | Redis                               |
| **Queue**         | BullMQ                              |
| **Auth**          | JWT + Passport                      |
| **Validation**    | class-validator + class-transformer |
| **Documentation** | Swagger/OpenAPI                     |
| **Testing**       | Jest + Supertest                    |
| **Container**     | Docker + Docker Compose             |

## 📋 Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **PostgreSQL** 12+
- **Redis** 6+
- **Docker** (optional)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd your-project-name
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Configure your `.env` file with your specific values.

### 3. Database Setup

```bash
# Start PostgreSQL and Redis (if using Docker)
docker-compose up -d postgres redis

# Run migrations
npm run migration:run

# Seed initial data (optional)
npm run seed:run
```

### 4. Start Development

```bash
npm run start:dev
```

Your API will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

| Variable         | Description            | Default       |
| ---------------- | ---------------------- | ------------- |
| `NODE_ENV`       | Environment            | `development` |
| `PORT`           | API Port               | `3000`        |
| `API_PREFIX`     | API Route Prefix       | `api`         |
| `DATABASE_*`     | Database Configuration | -             |
| `REDIS_*`        | Redis Configuration    | -             |
| `JWT_*`          | JWT Configuration      | -             |
| `SMTP_*`         | Email Configuration    | -             |
| `CLOUDINARY_*`   | File Storage Config    | -             |
| `OPENAI_API_KEY` | OpenAI API Key         | -             |

### Database Configuration

```typescript
// src/database/config/database.config.ts
export const databaseConfig: DatabaseConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'app_db'
}
```

## 🏗️ Project Structure

```
src/
├── api/                    # API modules
│   ├── auth/              # Authentication & authorization
│   ├── user/              # User management
│   ├── role/              # Role management
│   ├── notification/      # Real-time notifications
│   ├── openai/            # AI integration
│   └── [feature]/         # Your feature modules
├── common/                 # Shared utilities
│   ├── dto/               # Data transfer objects
│   ├── enums/             # Enumerations
│   ├── interfaces/        # TypeScript interfaces
│   └── types/             # Type definitions
├── config/                 # Configuration files
├── database/               # Database setup
│   ├── entities/          # TypeORM entities
│   ├── migrations/        # Database migrations
│   └── seeds/             # Seed data
├── decorators/             # Custom decorators
├── exceptions/             # Custom exceptions
├── filters/                # Exception filters
├── guards/                 # Authentication guards
├── interceptors/           # Request/response interceptors
├── mail/                   # Email functionality
├── utils/                  # Utility functions
└── main.ts                 # Application entry point
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
npm run seed:run           # Run seeders

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run e2e tests
npm run test:cov           # Run tests with coverage
npm run test:debug         # Run tests in debug mode

# Docker
npm run docker:dev         # Start development containers
npm run docker:build       # Build production image
npm run docker:prod        # Start production containers

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues
npm run format             # Format code with Prettier
```

## 📚 API Documentation

Access Swagger documentation at:

```
http://localhost:3000/api/docs
```

**Default credentials:**

- Username: `admin`
- Password: `admin123`

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

## 🐳 Docker

### Development

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production

```bash
# Build and start
docker-compose up -d

# Scale services
docker-compose up -d --scale app=3
```

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Role-based Access Control** (RBAC)
- **Input Validation** with class-validator
- **Rate Limiting** (configurable)
- **CORS** protection
- **Helmet** security headers
- **Request sanitization**

## 📦 Adding New Features

### 1. Create Module

```bash
nest g module feature-name
nest g controller feature-name
nest g service feature-name
```

### 2. Define Entity

```typescript
// src/api/feature-name/entities/feature.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from '@/database/entities/base.entity'

@Entity('features')
export class Feature extends BaseEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string
}
```

### 3. Create DTOs

```typescript
// src/api/feature-name/dto/create-feature.dto.ts
import { IsString, IsOptional } from 'class-validator'

export class CreateFeatureDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string
}
```

### 4. Add to Module

```typescript
// src/api/feature-name/feature.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeatureController } from './feature.controller'
import { FeatureService } from './feature.service'
import { Feature } from './entities/feature.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService]
})
export class FeatureModule {}
```

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set in production:

```bash
# Required for production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port
JWT_SECRET=your-super-secret-key
```

### PM2 (Recommended)

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Docker Production

```bash
docker build -t your-app .
docker run -p 3000:3000 your-app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing_feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing_feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [BullMQ](https://docs.bullmq.io/) - Job and message queue
- [Swagger](https://swagger.io/) - API documentation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/EXE-201/bill-snap-server/issues)
- **Discussions**: [GitHub Discussions](https://github.com/EXE-201/bill-snap-server/discussions)

---

**Made with ❤️ using NestJS**
