import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { QuestionSetEntity } from './entities/question-set.entity'
import { CreateQuestionSetDto } from './dto/create-question-set.dto'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'

@Injectable()
export class QuestionSetService {
  constructor(
    @InjectRepository(QuestionSetEntity)
    private readonly questionSetRepository: Repository<QuestionSetEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createDto: CreateQuestionSetDto, currentUser: User) {
    // Validate title
    if (!createDto.title || createDto.title.trim().length === 0) {
      throw new ValidationException(ErrorCode.V004, 'title is required', [{ property: 'title', code: ErrorCode.V004 }])
    }

    // Validate content is non-empty
    if (!Array.isArray(createDto.questions) || createDto.questions.length === 0) {
      throw new ValidationException(ErrorCode.V004, 'Questions is required', [
        { property: 'questions', code: ErrorCode.V004 }
      ])
    }

    // Validate question IDs exist
    const uniqueIds = Array.from(new Set(createDto.questions))
    const found = await this.questionRepository.find({
      where: { questionId: In(uniqueIds) },
      select: ['questionId']
    })
    const foundIds = new Set(found.map((q) => q.questionId))
    const missing = uniqueIds.filter((id) => !foundIds.has(id))
    if (missing.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Invalid question IDs', [
        { property: 'questions', code: ErrorCode.Q001, message: `Invalid question IDs: ${missing.join(', ')}` }
      ])
    }

    // Validate that the number of questions matches the config total_questions
    const actualQuestionCount = foundIds.size
    const expectedQuestionCount = createDto.config.general.total_questions

    if (actualQuestionCount !== expectedQuestionCount) {
      throw new ValidationException(ErrorCode.Q005, 'Question count mismatch', [
        {
          property: 'questions',
          code: ErrorCode.Q005,
          message: `Expected ${expectedQuestionCount} questions but got ${actualQuestionCount}`
        }
      ])
    }

    const toSave = this.questionSetRepository.create({
      title: createDto.title,
      description: createDto.description ?? null,
      questions: createDto.questions,
      config: createDto.config,
      lecturer: currentUser
    })

    const savedQuestionSet = await this.questionSetRepository.save(toSave)
    if (!savedQuestionSet) {
      throw new ValidationException(ErrorCode.MODULE002, 'Failed to create question set')
    }

    return savedQuestionSet
  }
}
