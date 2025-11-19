import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { EntryTestEntity } from './entities/entry-test.entity'
import { EntryTestSubmissionEntity } from './entities/entry-test-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { CreateEntryTestDto } from './dto/create-entry-test.dto'
import { UpdateEntryTestDto } from './dto/update-entry-test.dto'
import { SubmitEntryTestDto } from './dto/submit-entry-test.dto'
import { EntryTestResponseDto } from './dto/entry-test-response.dto'
import { EntryTestSubmissionResponseDto } from './dto/entry-test-submission-response.dto'
import { EntryTestScoreSpectrumDto, ScoreRangeDto, ScoreStatisticsDto } from './dto/entry-test-score-spectrum.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'
import { plainToInstance } from 'class-transformer'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { paginate } from '@utils/offset-pagination'
import { GetEntryTestsQueryDto } from './dto/get-entry-tests-query.dto'
import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { GetEntryTestStudentGradesQueryDto } from './dto/get-student-grades-query.dto'
import {
  EntryTestStudentGradeListResponseDto,
  EntryTestStudentGradeItemDto
} from './dto/entry-test-student-grade-list-response.dto'
import { StreakService } from '@api/streak/streak.service'
import { QuestionSetBasicInfoDto } from './dto/question-set-basic-info.dto'
import { extractUserRole } from '@utils/common.util'
import { RoleInAccount } from '@common/enums/account-role.enum'

@Injectable()
export class EntryTestService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EntryTestEntity)
    private readonly entryTestRepository: Repository<EntryTestEntity>,
    @InjectRepository(QuestionSetEntity)
    private readonly questionSetRepository: Repository<QuestionSetEntity>,
    @InjectRepository(EntryTestSubmissionEntity)
    private readonly entryTestSubmissionRepository: Repository<EntryTestSubmissionEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    private readonly streakService: StreakService
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
      throw new ValidationException(ErrorCode.Q001, 'ID bộ câu hỏi không hợp lệ', [
        { property: 'questionSets', code: ErrorCode.Q001, message: `Invalid question set IDs: ${missing.join(', ')}` }
      ])
    }

    // Check if any question sets are already in use
    const inUseQuestionSets = foundQuestionSets.filter((qs) => qs.isInUse)
    if (inUseQuestionSets.length > 0) {
      const inUseIds = inUseQuestionSets.map((qs) => qs.questionSetId)
      throw new ValidationException(ErrorCode.QUESTION_SET_005, 'Bộ câu hỏi đang được sử dụng', [
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
      throw new ValidationException(ErrorCode.V004, 'Thời gian kết thúc phải sau thời gian bắt đầu', [
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
      throw new ValidationException(ErrorCode.MODULE002, 'Tạo bài kiểm tra đầu vào thất bại')
    }

    // Reload entry test with full question set relations to get all fields
    const entryTestWithRelations = await this.entryTestRepository.findOne({
      where: { entryTestId: savedEntryTest.entryTestId },
      relations: ['questionSets', 'createdBy', 'updatedBy']
    })

    return plainToInstance(EntryTestResponseDto, {
      ...entryTestWithRelations,
      questionSets: this.mapQuestionSetsToBasicInfo(entryTestWithRelations.questionSets)
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
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài kiểm tra đầu vào', [
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
        throw new ValidationException(ErrorCode.QUESTION_SET_002, 'ID bộ câu hỏi không hợp lệ', [
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
        throw new ValidationException(ErrorCode.QUESTION_SET_005, 'Bộ câu hỏi đang được sử dụng', [
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
    if (updateDto.status !== undefined && updateDto.status !== entryTest.status) {
      // Only check for existing active entry test if trying to set status to ACTIVE
      if (updateDto.status === ExamStatus.ACTIVE) {
        const existingActiveEntryTest = await this.entryTestRepository.findOne({
          where: { status: ExamStatus.ACTIVE }
        })
        // Exclude the current entry test from the check
        if (existingActiveEntryTest && existingActiveEntryTest.entryTestId !== entryTest.entryTestId) {
          throw new ValidationException(ErrorCode.ENTRY_TEST005, 'Đã có bài kiểm tra đầu vào đang hoạt động', [
            { property: 'status', code: ErrorCode.ENTRY_TEST005 }
          ])
        }
      }
      entryTest.status = updateDto.status
    }
    if (updateDto.startTime !== undefined) {
      const newStartTime = new Date(updateDto.startTime)
      // Validate that end time is after start time
      const endTimeToCheck = updateDto.endTime ? new Date(updateDto.endTime) : entryTest.endTime
      if (endTimeToCheck <= newStartTime) {
        throw new ValidationException(ErrorCode.V004, 'Thời gian kết thúc phải sau thời gian bắt đầu', [
          { property: 'startTime', code: ErrorCode.V004 }
        ])
      }
      entryTest.startTime = newStartTime
    }
    if (updateDto.endTime !== undefined) {
      // Validate that end time is after start time
      const newEndTime = new Date(updateDto.endTime)
      const startTimeToCheck = updateDto.startTime ? new Date(updateDto.startTime) : entryTest.startTime
      if (newEndTime <= startTimeToCheck) {
        throw new ValidationException(ErrorCode.V004, 'Thời gian kết thúc phải sau thời gian bắt đầu', [
          { property: 'endTime', code: ErrorCode.V004 }
        ])
      }
      entryTest.endTime = newEndTime
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
      throw new ValidationException(ErrorCode.ENTRY_TEST004, 'Cập nhật bài kiểm tra đầu vào thất bại', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST004 }
      ])
    }

    // Reload entry test with full question set relations to get all fields
    const entryTestWithRelations = await this.entryTestRepository.findOne({
      where: { entryTestId: savedEntryTest.entryTestId },
      relations: ['questionSets', 'createdBy', 'updatedBy']
    })

    return plainToInstance(EntryTestResponseDto, {
      ...entryTestWithRelations,
      questionSets: this.mapQuestionSetsToBasicInfo(entryTestWithRelations.questionSets)
    })
  }

  async startEntryTest(entryTestId: string, currentUser: User): Promise<EntryTestSubmissionResponseDto> {
    // Find the entry test
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài kiểm tra đầu vào', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Check if entry test is active
    if (entryTest.status !== ExamStatus.ACTIVE) {
      throw new ValidationException(ErrorCode.V004, 'Bài kiểm tra đầu vào chưa kích hoạt', [
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
      throw new ValidationException(ErrorCode.ENTRY_TEST002, 'Sinh viên đã có bài nộp cho bài kiểm tra đầu vào này', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST002 }
      ])
    }

    // Randomly select a question set from the entry test's question sets
    const availableQuestionSets = entryTest.questionSets
    if (availableQuestionSets.length === 0) {
      throw new ValidationException(ErrorCode.ENTRY_TEST003, 'Không có bộ câu hỏi nào cho bài kiểm tra đầu vào này', [
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
    const user = await this.userRepository.findOne({ where: { id: currentUser.id } })
    if (!user.hasParticipatedEntryTest) {
      user.hasParticipatedEntryTest = true
      await this.userRepository.save(user)
    }

    return plainToInstance(EntryTestSubmissionResponseDto, savedSubmission)
  }

  async getEntryTests(queryDto: GetEntryTestsQueryDto, currentUser?: User) {
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

    const isStudent = currentUser && extractUserRole(currentUser) === RoleInAccount.Student
    let submissionsByEntryTestId: Record<string, boolean> = {}

    if (isStudent && entryTests.length > 0) {
      const entryTestIds = entryTests.map((et) => et.entryTestId)
      const submissions = await this.entryTestSubmissionRepository.find({
        where: {
          entryTestId: In(entryTestIds),
          studentId: currentUser.id
        },
        select: ['entryTestId']
      })

      submissionsByEntryTestId = submissions.reduce<Record<string, boolean>>((acc, submission) => {
        acc[submission.entryTestId] = true
        return acc
      }, {})
    }

    const mappedEntryTests = entryTests.map((et) =>
      plainToInstance(EntryTestResponseDto, {
        ...et,
        questionSets: this.mapQuestionSetsToBasicInfo(et.questionSets),
        isSubmitted: isStudent ? submissionsByEntryTestId[et.entryTestId] || false : undefined
      })
    )

    return {
      entry_tests: mappedEntryTests,
      pagination: metaDto
    }
  }

  async getEntryTestById(entryTestId: string, currentUser?: User): Promise<EntryTestResponseDto> {
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets', 'createdBy', 'updatedBy']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài kiểm tra đầu vào', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    let isSubmitted: boolean | undefined = undefined
    const isStudent = currentUser && extractUserRole(currentUser) === RoleInAccount.Student

    if (isStudent) {
      const submission = await this.entryTestSubmissionRepository.findOne({
        where: {
          entryTestId,
          studentId: currentUser.id
        },
        select: ['entryTestId']
      })
      isSubmitted = !!submission
    }

    return plainToInstance(EntryTestResponseDto, {
      ...entryTest,
      questionSets: this.mapQuestionSetsToBasicInfo(entryTest.questionSets),
      isSubmitted
    })
  }

  async getLatestActiveEntryTestForStudent(currentUser: User): Promise<EntryTestResponseDto | null> {
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

      const submission = await this.entryTestSubmissionRepository.findOne({
        where: {
          entryTestId: latestActiveTest.entryTestId,
          studentId: currentUser.id
        },
        select: ['entryTestId']
      })

      return plainToInstance(EntryTestResponseDto, {
        ...latestActiveTest,
        questionSets: this.mapQuestionSetsToBasicInfo(latestActiveTest.questionSets),
        isSubmitted: !!submission
      })
    }

    const submission = await this.entryTestSubmissionRepository.findOne({
      where: {
        entryTestId: entryTest.entryTestId,
        studentId: currentUser.id
      },
      select: ['entryTestId']
    })

    return plainToInstance(EntryTestResponseDto, {
      ...entryTest,
      questionSets: this.mapQuestionSetsToBasicInfo(entryTest.questionSets),
      isSubmitted: !!submission
    })
  }
  async softDeleteEntryTest(entryTestId: string, currentUser: User) {
    // Find the entry test with question sets
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      relations: ['questionSets']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài kiểm tra đầu vào', [
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

  async submitEntryTest(
    entryTestId: string,
    questionSetId: string,
    submitDto: SubmitEntryTestDto,
    currentUser: User
  ): Promise<EntryTestSubmissionResponseDto> {
    // Find the submission
    const submission = await this.entryTestSubmissionRepository.findOne({
      where: { entryTestId, questionSetId, studentId: currentUser.id },
      relations: ['student', 'entryTest', 'questionSet']
    })

    if (!submission) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài nộp', [
        { property: 'submissionId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Check if submission belongs to current user
    if (submission.studentId !== currentUser.id) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không có quyền truy cập bài nộp này', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Check if submission is still in progress
    if (submission.attemptStatus !== AttemptStatus.IN_PROGRESS) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Bài nộp đã hoàn thành', [
        { property: 'submissionId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    // Validate that all submitted questions belong to the question set
    const questionIds = submission.questionSet.questions
    const submittedQuestionIds = submitDto.answered.map((answer) => answer.questionId)
    const invalidQuestions = submittedQuestionIds.filter((id) => !questionIds.includes(id))

    if (invalidQuestions.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Trong bài nộp có câu hỏi không hợp lệ', [
        { property: 'answered', code: ErrorCode.Q001, message: `Invalid question IDs: ${invalidQuestions.join(', ')}` }
      ])
    }

    // Validate that all answers exist and belong to their respective questions
    const allAnswerIds = submitDto.answered.map((answer) => answer.answerId)
    const answers = await this.answerRepository.find({
      where: { answerId: In(allAnswerIds) },
      relations: ['question']
    })

    const foundAnswerIds = new Set(answers.map((answer) => answer.answerId))
    const missingAnswers = allAnswerIds.filter((id) => !foundAnswerIds.has(id))

    if (missingAnswers.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Trong bài nộp có đáp án không hợp lệ', [
        { property: 'answered', code: ErrorCode.Q001, message: `Invalid answer IDs: ${missingAnswers.join(', ')}` }
      ])
    }

    // Validate answer-question relationships
    for (const submittedAnswer of submitDto.answered) {
      const answer = answers.find((a) => a.answerId === submittedAnswer.answerId)
      if (answer && answer.question.questionId !== submittedAnswer.questionId) {
        throw new ValidationException(ErrorCode.Q001, 'Đáp án không thuộc câu hỏi tương ứng', [
          {
            property: 'answered',
            code: ErrorCode.Q001,
            message: `Answer ${submittedAnswer.answerId} does not belong to question ${submittedAnswer.questionId}`
          }
        ])
      }
    }

    // Calculate score
    const score = await this.calculateScore(submitDto.answered, submission.questionSet.questions)

    // Update submission
    submission.answered = submitDto.answered
    submission.score = score
    submission.attemptStatus = AttemptStatus.SUBMITTED
    submission.submittedAt = new Date()

    const savedSubmission = await this.entryTestSubmissionRepository.save(submission)

    // Update streak for student
    try {
      await this.streakService.updateStreak(currentUser.id, savedSubmission.submittedAt)
    } catch (error) {
      // Log error but don't fail the submission
      console.error('Failed to update streak:', error)
    }

    return plainToInstance(EntryTestSubmissionResponseDto, savedSubmission)
  }

  private async calculateScore(
    answered: { questionId: string; answerId: string }[],
    questionIds: string[]
  ): Promise<number> {
    const totalQuestions = questionIds.length

    // Get all submitted answers with their isCorrect field
    const submittedAnswerIds = answered.map((answer) => answer.answerId)
    const answers = await this.answerRepository.find({
      where: { answerId: In(submittedAnswerIds) },
      select: ['answerId', 'isCorrect']
    })

    // Count correct answers
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length

    // Calculate percentage score
    return Math.round((correctAnswers / totalQuestions) * 10)
  }

  async getEntryTestScoreSpectrum(entryTestId: string): Promise<EntryTestScoreSpectrumDto> {
    // Find the entry test
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId },
      select: ['entryTestId', 'title']
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Không tìm thấy bài kiểm tra đầu vào', [
        { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
      ])
    }

    /**
     * TODO: Below logic should be considered to be moved to background logic for better performance & reliability
     * */
    // Get all submitted entries for this entry test
    const submissions = await this.entryTestSubmissionRepository.find({
      where: {
        entryTestId,
        attemptStatus: AttemptStatus.SUBMITTED
      },
      select: ['score']
    })

    if (submissions.length === 0) {
      return {
        entryTestId: entryTest.entryTestId,
        entryTestTitle: entryTest.title,
        statistics: {
          totalSubmissions: 0,
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          medianScore: 0,
          standardDeviation: 0
        },
        scoreRanges: []
      }
    }

    const scores = submissions.map((submission) => submission.score).filter((score) => score !== null) as number[]

    // Calculate statistics
    const statistics = this.calculateScoreStatistics(scores)

    // Calculate score ranges (0-1, 1-2, 2-3, ..., 9-10)
    const scoreRanges = this.calculateScoreRanges(scores)

    return {
      entryTestId: entryTest.entryTestId,
      entryTestTitle: entryTest.title,
      statistics,
      scoreRanges
    }
  }

  private calculateScoreStatistics(scores: number[]): ScoreStatisticsDto {
    const sortedScores = [...scores].sort((a, b) => a - b)
    const totalSubmissions = scores.length

    // Calculate average
    const averageScore = Math.round((scores.reduce((sum, score) => sum + score, 0) / totalSubmissions) * 100) / 100

    // Calculate median
    const medianScore =
      totalSubmissions % 2 === 0
        ? (sortedScores[totalSubmissions / 2 - 1] + sortedScores[totalSubmissions / 2]) / 2
        : sortedScores[Math.floor(totalSubmissions / 2)]

    // Calculate standard deviation
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / totalSubmissions
    const standardDeviation = Math.round(Math.sqrt(variance) * 100) / 100

    return {
      totalSubmissions,
      averageScore,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      medianScore: Math.round(medianScore * 100) / 100,
      standardDeviation
    }
  }

  private calculateScoreRanges(scores: number[]): ScoreRangeDto[] {
    const ranges: ScoreRangeDto[] = []
    const totalSubmissions = scores.length

    // Create ranges with 0.25 increments: 0.0, 0.25, 0.5, 0.75, 1.0, ..., 10.0
    for (let i = 0; i <= 40; i++) {
      const score = i * 0.25
      const rangeLabel = score.toString()

      // Count scores that match this exact score (with small tolerance for floating point precision)
      const count = scores.filter((s) => Math.abs(s - score) < 0.01).length

      // Calculate percentage
      const percentage = Math.round((count / totalSubmissions) * 100 * 100) / 100

      ranges.push({
        score: rangeLabel,
        count,
        percentage
      })
    }

    return ranges
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

  /**
   * Map question sets to basic info DTO
   * @param questionSets Array of question set entities
   * @returns Array of QuestionSetBasicInfoDto
   */
  private mapQuestionSetsToBasicInfo(questionSets: QuestionSetEntity[]): QuestionSetBasicInfoDto[] {
    return questionSets.map((qs) =>
      plainToInstance(QuestionSetBasicInfoDto, {
        questionSetId: qs.questionSetId,
        title: qs.title,
        description: qs.description,
        totalQuestions: qs.config?.general?.total_questions || 0,
        durationMinutes: qs.config?.general?.duration_minutes || 0
      })
    )
  }

  async getStudentGradeList(
    entryTestId: string,
    queryDto: GetEntryTestStudentGradesQueryDto | undefined,
    currentUser: User
  ): Promise<EntryTestStudentGradeListResponseDto> {
    // Ensure queryDto has default values if not provided
    // Create a new DTO with proper defaults to avoid readonly property issues
    const paginationDto: GetEntryTestStudentGradesQueryDto = queryDto
      ? Object.assign(new GetEntryTestStudentGradesQueryDto(), {
          limit: queryDto.limit || 10,
          page: queryDto.page || 1,
          order: queryDto.order || 'ASC',
          q: queryDto.q
        })
      : new GetEntryTestStudentGradesQueryDto()

    // Get entry test to validate it exists
    const entryTest = await this.entryTestRepository.findOne({
      where: { entryTestId }
    })

    if (!entryTest) {
      throw new ValidationException(ErrorCode.V004, 'Không tìm thấy bài kiểm tra đầu vào', [
        { property: 'entryTestId', code: ErrorCode.V004 }
      ])
    }

    // Get all submissions for this entry test with student info
    const submissionsQuery = this.entryTestSubmissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.student', 'student')
      .leftJoinAndSelect('student.role', 'studentRole')
      .where('submission.entryTestId = :entryTestId', { entryTestId })

    // Note: Entry tests are not tied to modules/classes, so all admins/principals/lecturers can see all students
    // No additional filtering needed based on role

    // Apply search filter if provided
    if (paginationDto.q) {
      submissionsQuery.andWhere('(student.name ILIKE :search OR student.email ILIKE :search)', {
        search: `%${paginationDto.q}%`
      })
    }

    // Apply attempt status filter if provided
    if (paginationDto.attemptStatus) {
      submissionsQuery.andWhere('submission.attemptStatus = :attemptStatus', {
        attemptStatus: paginationDto.attemptStatus
      })
    }

    // Apply sorting
    submissionsQuery.orderBy('student.name', paginationDto.order || 'ASC')
    submissionsQuery.addOrderBy('submission.submittedAt', 'DESC')

    // Apply pagination
    const [submissions, metaDto] = await paginate<EntryTestSubmissionEntity>(submissionsQuery, paginationDto, {
      skipCount: false,
      takeAll: false
    })

    // Transform to response DTO
    const studentGrades: EntryTestStudentGradeItemDto[] = submissions.map((submission) => ({
      studentId: submission.student.id,
      studentName: submission.student.name,
      studentEmail: submission.student.email,
      studentAvatar: submission.student.avatar,
      submissionId: submission.entryTestSubmissionId,
      score: submission.score,
      attemptStatus: submission.attemptStatus,
      submittedAt: submission.submittedAt,
      note: submission.note,
      penalty: submission.penalty
    }))

    return plainToInstance(EntryTestStudentGradeListResponseDto, {
      entryTestId,
      students: studentGrades,
      pagination: metaDto
    })
  }
}
