import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { EntryTestEntity } from './entities/entry-test.entity'
import { EntryTestSubmissionEntity } from './entities/entry-test-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { CreateEntryTestDto } from './dto/create-entry-test.dto'
import { EntryTestResponseDto } from './dto/entry-test-response.dto'
import { EntryTestSubmissionResponseDto } from './dto/entry-test-submission-response.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'
import { plainToInstance } from 'class-transformer'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { paginate } from '@utils/offset-pagination'
import { GetEntryTestsQueryDto } from './dto/get-entry-tests-query.dto'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

@Injectable()
export class EntryTestService {
  constructor(
    @InjectRepository(EntryTestEntity)
    private readonly entryTestRepository: Repository<EntryTestEntity>,
    @InjectRepository(QuestionSetEntity)
    private readonly questionSetRepository: Repository<QuestionSetEntity>,
    @InjectRepository(EntryTestSubmissionEntity)
    private readonly entryTestSubmissionRepository: Repository<EntryTestSubmissionEntity>
  ) {}

  async create(createDto: CreateEntryTestDto, currentUser: User): Promise<EntryTestResponseDto> {
    // Validate question sets exist
    const uniqueIds = Array.from(new Set(createDto.questionSets))
    const foundQuestionSets = await this.questionSetRepository.find({
      where: { questionSetId: In(uniqueIds) },
      select: ['questionSetId']
    })
    const foundIds = new Set(foundQuestionSets.map((qs) => qs.questionSetId))
    const missing = uniqueIds.filter((id) => !foundIds.has(id))

    if (missing.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Invalid question set IDs', [
        { property: 'questionSets', code: ErrorCode.Q001, message: `Invalid question set IDs: ${missing.join(', ')}` }
      ])
    }

    // Validate time constraints
    const startTime = new Date(createDto.startTime)
    const endTime = new Date(createDto.endTime)

    if (endTime <= startTime) {
      throw new ValidationException(ErrorCode.V004, 'End time must be after start time', [
        { property: 'endTime', code: ErrorCode.V004 }
      ])
    }

    // Create entry test
    const entryTest = this.entryTestRepository.create({
      title: createDto.title,
      description: createDto.description,
      status: createDto.status || ExamStatus.DRAFT,
      startTime,
      endTime,
      createdBy: currentUser,
      questionSets: foundQuestionSets
    })

    const savedEntryTest = await this.entryTestRepository.save(entryTest)

    if (!savedEntryTest) {
      throw new ValidationException(ErrorCode.MODULE002, 'Failed to create entry test')
    }

    return plainToInstance(EntryTestResponseDto, {
      ...savedEntryTest,
      questionSets: savedEntryTest.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async startEntryTest(entryTestId: string, currentUser: User): Promise<EntryTestSubmissionResponseDto> {
    // Find the entry test
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Entry test not found', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Check if entry test is active
    if (entryTest.status !== ExamStatus.ACTIVE) {
      throw new ValidationException(ErrorCode.V004, 'Entry test is not active', [
        { property: 'entryTestId', code: ErrorCode.V004 }
      ])
    }

    // Check if student already has a submission for this entry test
    const existingSubmission = await this.entryTestSubmissionRepository.findOne({
      where: {
        studentId: currentUser.id,
        entryTestId: entryTestId
      }
    })

    if (existingSubmission) {
      throw new ValidationException(ErrorCode.ENTRY_TEST002, 'Student already has a submission for this entry test', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST002 }
      ])
    }

    // Randomly select a question set from the entry test's question sets
    const availableQuestionSets = entryTest.questionSets
    if (availableQuestionSets.length === 0) {
      throw new ValidationException(ErrorCode.ENTRY_TEST003, 'No question sets available for this entry test', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST003 }
      ])
    }
    const randomIndex = Math.floor(Math.random() * availableQuestionSets.length)
    const selectedQuestionSet = availableQuestionSets[randomIndex]

    // Create entry test submission
    const submission = this.entryTestSubmissionRepository.create({
      studentId: currentUser.id,
      entryTestId: entryTestId,
      questionSetId: selectedQuestionSet.questionSetId,
      attemptStatus: AttemptStatus.IN_PROGRESS,
      score: null,
      answered: null,
      penalty: null,
      note: null,
      submittedAt: null
    })

    const savedSubmission = await this.entryTestSubmissionRepository.save(submission)

    return plainToInstance(EntryTestSubmissionResponseDto, savedSubmission)
  }

  async getEntryTests(queryDto: GetEntryTestsQueryDto) {
    const query = this.entryTestRepository.createQueryBuilder('entry_test')

    query.leftJoinAndSelect('entry_test.questionSets', 'questionSets')
    query.leftJoinAndSelect('entry_test.createdBy', 'createdBy')
    query.leftJoinAndSelect('createdBy.role', 'role')

    // Search filter
    if (queryDto.q) {
      query.andWhere('entry_test.title ILIKE :search OR entry_test.description ILIKE :search', {
        search: `%${queryDto.q}%`
      })
    }

    // Status filter
    if (queryDto.status) {
      query.andWhere('entry_test.status = :status', { status: queryDto.status })
    }

    // Creator filter
    if (queryDto.createdBy) {
      query.andWhere('entry_test.createdBy = :createdBy', { createdBy: queryDto.createdBy })
    }

    // Sorting
    const validSortFields = ['title', 'status', 'startTime', 'createdAt', 'updatedAt']
    const sortMapping: Record<string, string> = {
      title: 'title',
      status: 'status',
      start_time: 'startTime',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    }
    const rawSort = queryDto.sort_by || 'created_at'
    const mappedSort = sortMapping[rawSort]
    const sortField = validSortFields.includes(mappedSort) ? mappedSort : 'createdAt'
    query.orderBy(`entry_test.${sortField}`, queryDto.order)

    // Pagination
    const [entryTests, metaDto] = await paginate<EntryTestEntity>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    const mappedEntryTests = entryTests.map((et) =>
      plainToInstance(EntryTestResponseDto, {
        ...et,
        questionSets: et.questionSets.map((qs) => qs.questionSetId)
      })
    )

    return {
      entry_tests: mappedEntryTests,
      pagination: metaDto
    }
  }

  async getEntryTestById(entryTestId: string): Promise<EntryTestResponseDto> {
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets', 'createdBy']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Entry test not found', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    return plainToInstance(EntryTestResponseDto, {
      ...entryTest,
      questionSets: entryTest.questionSets.map((qs) => qs.questionSetId)
    })
  }
}
