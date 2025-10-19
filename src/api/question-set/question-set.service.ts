import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { QuestionSetEntity } from './entities/question-set.entity'
import { CreateQuestionSetDto } from './dto/create-question-set.dto'
import { GetQuestionSetsQueryDto } from './dto/get-question-sets-query.dto'
import { ConfigDetailDto, QuestionSetDetailResponseDto } from './dto/question-set-detail-response.dto'
import { QuestionResponseDto } from '@api/question/dto/question-response.dto'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'
import { paginate } from '@utils/offset-pagination'
import { plainToInstance } from 'class-transformer'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { QuestionSetResponseDto } from './dto/question-set-response.dto'

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

  async getQuestionSets(queryDto: GetQuestionSetsQueryDto) {
    const query = this.questionSetRepository.createQueryBuilder('question_set')

    // Search filter
    if (queryDto.q) {
      query.andWhere('question_set.title ILIKE :search OR question_set.description ILIKE :search', {
        search: `%${queryDto.q}%`
      })
    }

    // Lecturer filter
    if (queryDto.lecturerId) {
      query.andWhere('question_set.lecturer_id = :lecturerId', { lecturerId: queryDto.lecturerId })
    }

    // Sorting
    const validSortFields = ['title', 'description', 'createdAt', 'updatedAt']
    const sortMapping: Record<string, string> = {
      title: 'title',
      description: 'description',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    }
    const rawSort = queryDto.sort_by || 'created_at'
    const mappedSort = sortMapping[rawSort]
    const sortField = validSortFields.includes(mappedSort) ? mappedSort : 'createdAt'
    query.orderBy(`question_set.${sortField}`, queryDto.order)

    // Pagination
    const [questionSets, metaDto] = await paginate<QuestionSetEntity>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    const mappedQuestionSets = questionSets.map((q) =>
      plainToInstance(QuestionSetResponseDto, {
        questionSetId: q.questionSetId,
        title: q.title,
        description: q.description,
        totalQuestions: q.config.general.total_questions,
        durationMinutes: q.config.general.duration_minutes,
        passingScore: q.config.general.passing_score,
        maxAttempts: q.config.general.max_attempts,
        lecturer: q.lecturer,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt
      })
    )

    return new OffsetPaginatedDto<QuestionSetResponseDto>({
      statusCode: 200,
      message: 'Question sets retrieved successfully',
      data: mappedQuestionSets,
      meta: metaDto
    })
  }

  async getQuestionSetById(questionSetId: string): Promise<QuestionSetDetailResponseDto> {
    const questionSet = await this.questionSetRepository.findOne({
      where: { questionSetId },
      relations: ['lecturer']
    })

    if (!questionSet) {
      throw new ValidationException(ErrorCode.Q001, 'Question set not found', [
        { property: 'questionSetId', code: ErrorCode.Q001 }
      ])
    }

    // Fetch detailed question information with answers
    const detailedQuestions: QuestionResponseDto[] = []

    if (questionSet.questions && questionSet.questions.length > 0) {
      const questions = await this.questionRepository.find({
        where: { questionId: In(questionSet.questions) },
        relations: ['answers'],
        order: { createdAt: 'ASC' }
      })

      detailedQuestions.push(...questions.map((question) => QuestionResponseDto.fromEntity(question)))
    }

    return {
      questionSetId: questionSet.questionSetId,
      title: questionSet.title,
      description: questionSet.description,
      questions: detailedQuestions,
      config: plainToInstance(ConfigDetailDto, questionSet.config),
      lecturer: {
        userId: questionSet.lecturer.id,
        name: questionSet.lecturer.name,
        email: questionSet.lecturer.email
      },
      createdAt: questionSet.createdAt,
      updatedAt: questionSet.updatedAt
    }
  }
}
