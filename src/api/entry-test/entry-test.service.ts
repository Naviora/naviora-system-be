import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { EntryTestEntity } from './entities/entry-test.entity'
import { EntryTestSubmissionEntity } from './entities/entry-test-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { CreateEntryTestDto } from './dto/create-entry-test.dto'
import { UpdateEntryTestDto } from './dto/update-entry-test.dto'
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
    // Validate question sets exist and are not in use
    const uniqueIds = Array.from(new Set(createDto.questionSets))
    const foundQuestionSets = await this.questionSetRepository.find({
      where: { questionSetId: In(uniqueIds) },
      select: ['questionSetId', 'isInUse']
    })
    const foundIds = new Set(foundQuestionSets.map((qs) => qs.questionSetId))
    const missing = uniqueIds.filter((id) => !foundIds.has(id))

    if (missing.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Invalid question set IDs', [
        { property: 'questionSets', code: ErrorCode.Q001, message: `Invalid question set IDs: ${missing.join(', ')}` }
      ])
    }

    // Check if any question sets are already in use
    const inUseQuestionSets = foundQuestionSets.filter((qs) => qs.isInUse)
    if (inUseQuestionSets.length > 0) {
      const inUseIds = inUseQuestionSets.map((qs) => qs.questionSetId)
      throw new ValidationException(ErrorCode.QUESTION_SET_005, 'Question sets are already in use', [
        {
          property: 'questionSets',
          code: ErrorCode.QUESTION_SET_005,
          message: `Question sets already in use: ${inUseIds.join(', ')}`
        }
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

    // Set isInUse = true for all question sets used in this entry test
    await this.questionSetRepository.update({ questionSetId: In(Array.from(foundIds)) }, { isInUse: true })

    if (!savedEntryTest) {
      throw new ValidationException(ErrorCode.MODULE002, 'Failed to create entry test')
    }

    return plainToInstance(EntryTestResponseDto, {
      ...savedEntryTest,
      questionSets: savedEntryTest.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async updateEntryTest(
    entryTestId: string,
    updateDto: UpdateEntryTestDto,
    currentUser: User
  ): Promise<EntryTestResponseDto> {
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

    // Validate question sets if provided
    if (updateDto.questionSets && updateDto.questionSets.length > 0) {
      const uniqueIds = Array.from(new Set(updateDto.questionSets))
      const foundQuestionSets = await this.questionSetRepository.find({
        where: { questionSetId: In(uniqueIds) },
        select: ['questionSetId', 'isInUse']
      })
      const foundIds = new Set(foundQuestionSets.map((qs) => qs.questionSetId))
      const missing = uniqueIds.filter((id) => !foundIds.has(id))

      if (missing.length > 0) {
        throw new ValidationException(ErrorCode.QUESTION_SET_002, 'Invalid question set IDs', [
          {
            property: 'questionSets',
            code: ErrorCode.QUESTION_SET_002,
            message: `Invalid question set IDs: ${missing.join(', ')}`
          }
        ])
      }

      // Check if any question sets are already in use (excluding current ones)
      const currentQuestionSetIds = entryTest.questionSets.map((qs) => qs.questionSetId)
      const inUseQuestionSets = foundQuestionSets.filter(
        (qs) => qs.isInUse && !currentQuestionSetIds.includes(qs.questionSetId)
      )
      if (inUseQuestionSets.length > 0) {
        const inUseIds = inUseQuestionSets.map((qs) => qs.questionSetId)
        throw new ValidationException(ErrorCode.QUESTION_SET_005, 'Question sets are already in use', [
          {
            property: 'questionSets',
            code: ErrorCode.QUESTION_SET_005,
            message: `Question sets already in use: ${inUseIds.join(', ')}`
          }
        ])
      }
    }

    // Update fields
    if (updateDto.title !== undefined) {
      entryTest.title = updateDto.title
    }
    if (updateDto.description !== undefined) {
      entryTest.description = updateDto.description
    }
    if (updateDto.status !== undefined) {
      entryTest.status = updateDto.status
    }
    if (updateDto.questionSets !== undefined) {
      // Business Logic: Compare input question sets with existing ones
      // If they are equal, do nothing. If different, override with user input.

      // Get current question set IDs from database
      const currentQuestionSetIds = entryTest.questionSets.map((qs) => qs.questionSetId)

      // Compare the two arrays (order-independent comparison)
      const areEqual = this.areQuestionSetArraysEqual(currentQuestionSetIds, updateDto.questionSets)

      // Only update if the lists are different
      if (!areEqual) {
        // Find question sets that are being removed (no longer in the new list)
        const removedQuestionSetIds = currentQuestionSetIds.filter((id) => !updateDto.questionSets.includes(id))

        // Find question sets that are being added (new ones not in the current list)
        const addedQuestionSetIds = updateDto.questionSets.filter((id) => !currentQuestionSetIds.includes(id))

        // Set isInUse = false for removed question sets
        if (removedQuestionSetIds.length > 0) {
          await this.questionSetRepository.update({ questionSetId: In(removedQuestionSetIds) }, { isInUse: false })
        }

        // Set isInUse = true for added question sets
        if (addedQuestionSetIds.length > 0) {
          await this.questionSetRepository.update({ questionSetId: In(addedQuestionSetIds) }, { isInUse: true })
        }

        // Override with user input - fetch the new question sets
        const foundQuestionSets = await this.questionSetRepository.find({
          where: { questionSetId: In(updateDto.questionSets) }
        })
        entryTest.questionSets = foundQuestionSets
      }
      // If areEqual is true, do nothing - keep existing question sets
    }

    // Set updated by
    entryTest.updatedBy = currentUser

    const savedEntryTest = await this.entryTestRepository.save(entryTest)

    if (!savedEntryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST004, 'Failed to update entry test', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST004 }
      ])
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

    // Mark user as participated
    if (!currentUser.hasParticipatedEntryTest) {
      currentUser.hasParticipatedEntryTest = true
      await this.entryTestSubmissionRepository.manager.getRepository(User).save(currentUser)
    }

    return plainToInstance(EntryTestSubmissionResponseDto, savedSubmission)
  }

  async getEntryTests(queryDto: GetEntryTestsQueryDto) {
    const query = this.entryTestRepository.createQueryBuilder('entry_test')

    query.leftJoinAndSelect('entry_test.questionSets', 'questionSets')
    query.leftJoinAndSelect('entry_test.createdBy', 'createdBy')
    query.leftJoinAndSelect('entry_test.updatedBy', 'updatedBy')
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
      relations: ['questionSets', 'createdBy', 'updatedBy']
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

  async getLatestActiveEntryTestForStudent(): Promise<EntryTestResponseDto | null> {
    const now = new Date()

    // Find the latest active entry test that is currently within the time window
    const entryTest = await this.entryTestRepository
      .createQueryBuilder('entry_test')
      .leftJoinAndSelect('entry_test.questionSets', 'questionSets')
      .leftJoinAndSelect('entry_test.createdBy', 'createdBy')
      .leftJoinAndSelect('entry_test.updatedBy', 'updatedBy')
      .where('entry_test.status = :status', { status: ExamStatus.ACTIVE })
      .andWhere('entry_test.startTime <= :now', { now })
      .andWhere('entry_test.endTime >= :now', { now })
      .orderBy('entry_test.startTime', 'DESC')
      .getOne()

    if (!entryTest) {
      // If no entry test found within time window, try to find the latest ACTIVE entry test regardless of time
      const latestActiveTest = await this.entryTestRepository
        .createQueryBuilder('entry_test')
        .leftJoinAndSelect('entry_test.questionSets', 'questionSets')
        .leftJoinAndSelect('entry_test.createdBy', 'createdBy')
        .leftJoinAndSelect('entry_test.updatedBy', 'updatedBy')
        .where('entry_test.status = :status', { status: ExamStatus.ACTIVE })
        .orderBy('entry_test.startTime', 'DESC')
        .getOne()

      if (!latestActiveTest) return null

      return plainToInstance(EntryTestResponseDto, {
        ...latestActiveTest,
        questionSets: latestActiveTest.questionSets.map((qs) => qs.questionSetId)
      })
    }

    return plainToInstance(EntryTestResponseDto, {
      ...entryTest,
      questionSets: entryTest.questionSets.map((qs) => qs.questionSetId)
    })
  }
  async softDeleteEntryTest(entryTestId: string, currentUser: User) {
    // Find the entry test with question sets
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Entry test not found', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Get question set IDs to set isInUse = false
    const questionSetIds = entryTest.questionSets.map((qs) => qs.questionSetId)

    // Set isInUse = false for all question sets used in this entry test
    if (questionSetIds.length > 0) {
      await this.questionSetRepository.update({ questionSetId: In(questionSetIds) }, { isInUse: false })
    }

    // Set updatedBy before soft delete
    await this.entryTestRepository.update(entryTestId, {
      updatedBy: currentUser
    })

    // Perform soft delete
    await this.entryTestRepository.softDelete(entryTestId)

    return { message: 'Entry test deleted successfully' }
  }

  /**
   * Compare two arrays of strings for equality (order-independent)
   * @param arr1 First array
   * @param arr2 Second array
   * @returns true if arrays contain the same elements
   */
  private areQuestionSetArraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false
    const sorted1 = [...arr1].sort()
    const sorted2 = [...arr2].sort()
    return sorted1.every((id, index) => id === sorted2[index])
  }
}
