import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { ReviewedExerciseEntity } from './entities/reviewed-exercise.entity'
import { ReviewedExerciseSubmissionEntity } from './entities/reviewed-exercise-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { CreateReviewedExerciseDto } from './dto/create-reviewed-exercise.dto'
import { UpdateReviewedExerciseDto } from './dto/update-reviewed-exercise.dto'
import { SubmitReviewedExerciseDto } from './dto/submit-reviewed-exercise.dto'
import { ReviewedExerciseResponseDto } from './dto/reviewed-exercise-response.dto'
import { ReviewedExerciseSubmissionResponseDto } from './dto/reviewed-exercise-submission-response.dto'
import {
  ReviewedExerciseScoreSpectrumDto,
  ScoreRangeDto,
  ScoreStatisticsDto
} from './dto/reviewed-exercise-score-spectrum.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'
import { plainToInstance } from 'class-transformer'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { paginate } from '@utils/offset-pagination'
import { GetReviewedExercisesQueryDto } from './dto/get-reviewed-exercises-query.dto'
import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { StudentGradeListResponseDto, StudentGradeItemDto } from './dto/student-grade-list-response.dto'
import { GetStudentGradesQueryDto } from './dto/get-student-grades-query.dto'
import { extractUserRole } from '@utils/common.util'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { StreakService } from '@api/streak/streak.service'

@Injectable()
export class ReviewedExerciseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ReviewedExerciseEntity)
    private readonly reviewedExerciseRepository: Repository<ReviewedExerciseEntity>,
    @InjectRepository(QuestionSetEntity)
    private readonly questionSetRepository: Repository<QuestionSetEntity>,
    @InjectRepository(ReviewedExerciseSubmissionEntity)
    private readonly reviewedExerciseSubmissionRepository: Repository<ReviewedExerciseSubmissionEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(TeachingModule)
    private readonly teachingModuleRepository: Repository<TeachingModule>,
    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    private readonly streakService: StreakService
  ) {}

  async create(createDto: CreateReviewedExerciseDto, currentUser: User): Promise<ReviewedExerciseResponseDto> {
    // Validate lesson exists
    const lesson = await this.lessonRepository.findOne({
      where: { lessonId: createDto.lessonId }
    })

    if (!lesson) {
      throw new ValidationException(ErrorCode.V004, 'Lesson not found', [
        { property: 'lessonId', code: ErrorCode.V004 }
      ])
    }

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

    // Create reviewed exercise - lecturer is the current user (who assigns the question sets to the lesson)
    const reviewedExercise = this.reviewedExerciseRepository.create({
      lessonId: createDto.lessonId,
      status: createDto.status || ExamStatus.DRAFT,
      startTime,
      endTime,
      lecturerId: currentUser.id,
      createdBy: currentUser,
      questionSets: foundQuestionSets
    })

    const savedReviewedExercise = await this.reviewedExerciseRepository.save(reviewedExercise)

    // Set isInUse = true for all question sets used in this reviewed exercise
    await this.questionSetRepository.update({ questionSetId: In(Array.from(foundIds)) }, { isInUse: true })

    if (!savedReviewedExercise) {
      throw new ValidationException(ErrorCode.MODULE002, 'Failed to create reviewed exercise')
    }

    // Load relations for response
    const loadedReviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId: savedReviewedExercise.reviewedExerciseId },
      relations: ['lesson', 'lecturer', 'questionSets', 'createdBy', 'updatedBy']
    })

    return plainToInstance(ReviewedExerciseResponseDto, {
      ...loadedReviewedExercise,
      lessonId: loadedReviewedExercise.lessonId,
      lecturerId: loadedReviewedExercise.lecturerId,
      questionSets: loadedReviewedExercise.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async updateReviewedExercise(
    reviewedExerciseId: string,
    updateDto: UpdateReviewedExerciseDto,
    currentUser: User
  ): Promise<ReviewedExerciseResponseDto> {
    // Find the reviewed exercise
    const reviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId },
      relations: ['questionSets', 'lesson']
    })

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
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
      const currentQuestionSetIds = reviewedExercise.questionSets.map((qs) => qs.questionSetId)
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
    if (updateDto.status !== undefined) {
      reviewedExercise.status = updateDto.status
    }
    if (updateDto.startTime !== undefined) {
      const newStartTime = new Date(updateDto.startTime)
      // Validate that end time is after start time
      if (reviewedExercise.endTime <= newStartTime) {
        throw new ValidationException(ErrorCode.V004, 'End time must be after start time', [
          { property: 'startTime', code: ErrorCode.V004 }
        ])
      }
      reviewedExercise.startTime = newStartTime
    }
    if (updateDto.endTime !== undefined) {
      // Validate that end time is after start time
      const newEndTime = new Date(updateDto.endTime)
      if (newEndTime <= reviewedExercise.startTime) {
        throw new ValidationException(ErrorCode.V004, 'End time must be after start time', [
          { property: 'endTime', code: ErrorCode.V004 }
        ])
      }
      reviewedExercise.endTime = newEndTime
    }
    if (updateDto.questionSets !== undefined) {
      // Business Logic: Compare input question sets with existing ones
      // If they are equal, do nothing. If different, override with user input.

      // Get current question set IDs from database
      const currentQuestionSetIds = reviewedExercise.questionSets.map((qs) => qs.questionSetId)

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
        reviewedExercise.questionSets = foundQuestionSets
      }
      // If areEqual is true, do nothing - keep existing question sets
    }

    // Set updated by
    reviewedExercise.updatedBy = currentUser

    const savedReviewedExercise = await this.reviewedExerciseRepository.save(reviewedExercise)

    if (!savedReviewedExercise) {
      throw new ValidationException(ErrorCode.MODULE002, 'Failed to update reviewed exercise', [
        { property: 'reviewedExerciseId', code: ErrorCode.MODULE002 }
      ])
    }

    // Load relations for response
    const loadedReviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId: savedReviewedExercise.reviewedExerciseId },
      relations: ['lesson', 'lecturer', 'questionSets', 'createdBy', 'updatedBy']
    })

    return plainToInstance(ReviewedExerciseResponseDto, {
      ...loadedReviewedExercise,
      lessonId: loadedReviewedExercise.lessonId,
      lecturerId: loadedReviewedExercise.lecturerId,
      questionSets: loadedReviewedExercise.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async startReviewedExercise(
    reviewedExerciseId: string,
    currentUser: User
  ): Promise<ReviewedExerciseSubmissionResponseDto> {
    // Find the reviewed exercise
    const reviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId },
      relations: ['questionSets']
    })

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Check if reviewed exercise is active
    if (reviewedExercise.status !== ExamStatus.ACTIVE) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise is not active', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Check if reviewed exercise is within time window
    const now = new Date()
    if (now < reviewedExercise.startTime || now > reviewedExercise.endTime) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise is not currently available', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Check if student already has a submission for this reviewed exercise
    // TODO: consider to allow student to submit multiple times for the same reviewed exercise
    const existingSubmission = await this.reviewedExerciseSubmissionRepository.findOne({
      where: {
        studentId: currentUser.id,
        reviewedExerciseId: reviewedExerciseId
      }
    })

    if (existingSubmission) {
      throw new ValidationException(ErrorCode.V004, 'Student already has a submission for this reviewed exercise', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Randomly select a question set from the reviewed exercise's question sets
    const availableQuestionSets = reviewedExercise.questionSets
    if (availableQuestionSets.length === 0) {
      throw new ValidationException(ErrorCode.V004, 'No question sets available for this reviewed exercise', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }
    const randomIndex = Math.floor(Math.random() * availableQuestionSets.length)
    const selectedQuestionSet = availableQuestionSets[randomIndex]

    // Create reviewed exercise submission
    const submission = this.reviewedExerciseSubmissionRepository.create({
      studentId: currentUser.id,
      reviewedExerciseId: reviewedExerciseId,
      questionSetId: selectedQuestionSet.questionSetId,
      attemptStatus: AttemptStatus.IN_PROGRESS,
      score: null,
      answered: null,
      penalty: null,
      note: null,
      submittedAt: null
    })

    const savedSubmission = await this.reviewedExerciseSubmissionRepository.save(submission)

    return plainToInstance(ReviewedExerciseSubmissionResponseDto, savedSubmission)
  }

  async getReviewedExercises(queryDto: GetReviewedExercisesQueryDto) {
    const query = this.reviewedExerciseRepository.createQueryBuilder('reviewed_exercise')

    query.leftJoinAndSelect('reviewed_exercise.questionSets', 'questionSets')
    query.leftJoinAndSelect('reviewed_exercise.lesson', 'lesson')
    query.leftJoinAndSelect('reviewed_exercise.lecturer', 'lecturer')
    query.leftJoinAndSelect('reviewed_exercise.createdBy', 'createdBy')
    query.leftJoinAndSelect('reviewed_exercise.updatedBy', 'updatedBy')
    query.leftJoinAndSelect('createdBy.role', 'role')

    // Lesson filter
    if (queryDto.lessonId) {
      query.andWhere('reviewed_exercise.lessonId = :lessonId', { lessonId: queryDto.lessonId })
    }

    // Status filter
    if (queryDto.status) {
      query.andWhere('reviewed_exercise.status = :status', { status: queryDto.status })
    }

    // Lecturer filter
    if (queryDto.lecturerId) {
      query.andWhere('reviewed_exercise.lecturerId = :lecturerId', { lecturerId: queryDto.lecturerId })
    }

    // Sorting
    const validSortFields = ['status', 'startTime', 'endTime', 'createdAt', 'updatedAt']
    const sortMapping: Record<string, string> = {
      status: 'status',
      start_time: 'startTime',
      end_time: 'endTime',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    }
    const rawSort = queryDto.sort_by || 'created_at'
    const mappedSort = sortMapping[rawSort]
    const sortField = validSortFields.includes(mappedSort) ? mappedSort : 'createdAt'
    query.orderBy(`reviewed_exercise.${sortField}`, queryDto.order)

    // Pagination
    const [reviewedExercises, metaDto] = await paginate<ReviewedExerciseEntity>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    const mappedReviewedExercises = reviewedExercises.map((re) =>
      plainToInstance(ReviewedExerciseResponseDto, {
        ...re,
        lessonId: re.lessonId,
        lecturerId: re.lecturerId,
        questionSets: re.questionSets.map((qs) => qs.questionSetId)
      })
    )

    return {
      reviewed_exercises: mappedReviewedExercises,
      pagination: metaDto
    }
  }

  async getReviewedExerciseById(reviewedExerciseId: string): Promise<ReviewedExerciseResponseDto> {
    const reviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId },
      relations: ['lesson', 'lecturer', 'questionSets', 'createdBy', 'updatedBy']
    })

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    return plainToInstance(ReviewedExerciseResponseDto, {
      ...reviewedExercise,
      lessonId: reviewedExercise.lessonId,
      lecturerId: reviewedExercise.lecturerId,
      questionSets: reviewedExercise.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async getLatestActiveReviewedExerciseForStudent(lessonId: string): Promise<ReviewedExerciseResponseDto | null> {
    const now = new Date()

    // Find the latest active reviewed exercise for the lesson that is currently within the time window
    const reviewedExercise = await this.reviewedExerciseRepository
      .createQueryBuilder('reviewed_exercise')
      .leftJoinAndSelect('reviewed_exercise.questionSets', 'questionSets')
      .leftJoinAndSelect('reviewed_exercise.lesson', 'lesson')
      .leftJoinAndSelect('reviewed_exercise.lecturer', 'lecturer')
      .leftJoinAndSelect('reviewed_exercise.createdBy', 'createdBy')
      .leftJoinAndSelect('reviewed_exercise.updatedBy', 'updatedBy')
      .where('reviewed_exercise.lessonId = :lessonId', { lessonId })
      .andWhere('reviewed_exercise.status = :status', { status: ExamStatus.ACTIVE })
      .andWhere('reviewed_exercise.startTime <= :now', { now })
      .andWhere('reviewed_exercise.endTime >= :now', { now })
      .orderBy('reviewed_exercise.startTime', 'DESC')
      .getOne()

    if (!reviewedExercise) {
      // If no reviewed exercise found within time window, try to find the latest ACTIVE reviewed exercise for the lesson regardless of time
      const latestActiveExercise = await this.reviewedExerciseRepository
        .createQueryBuilder('reviewed_exercise')
        .leftJoinAndSelect('reviewed_exercise.questionSets', 'questionSets')
        .leftJoinAndSelect('reviewed_exercise.lesson', 'lesson')
        .leftJoinAndSelect('reviewed_exercise.lecturer', 'lecturer')
        .leftJoinAndSelect('reviewed_exercise.createdBy', 'createdBy')
        .leftJoinAndSelect('reviewed_exercise.updatedBy', 'updatedBy')
        .where('reviewed_exercise.lessonId = :lessonId', { lessonId })
        .andWhere('reviewed_exercise.status = :status', { status: ExamStatus.ACTIVE })
        .orderBy('reviewed_exercise.startTime', 'DESC')
        .getOne()

      if (!latestActiveExercise) return null

      return plainToInstance(ReviewedExerciseResponseDto, {
        ...latestActiveExercise,
        lessonId: latestActiveExercise.lessonId,
        lecturerId: latestActiveExercise.lecturerId,
        questionSets: latestActiveExercise.questionSets.map((qs) => qs.questionSetId)
      })
    }

    return plainToInstance(ReviewedExerciseResponseDto, {
      ...reviewedExercise,
      lessonId: reviewedExercise.lessonId,
      lecturerId: reviewedExercise.lecturerId,
      questionSets: reviewedExercise.questionSets.map((qs) => qs.questionSetId)
    })
  }

  async softDeleteReviewedExercise(reviewedExerciseId: string, currentUser: User) {
    // Find the reviewed exercise with question sets
    const reviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId },
      relations: ['questionSets']
    })

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Get question set IDs to set isInUse = false
    const questionSetIds = reviewedExercise.questionSets.map((qs) => qs.questionSetId)

    // Set isInUse = false for all question sets used in this reviewed exercise
    if (questionSetIds.length > 0) {
      await this.questionSetRepository.update({ questionSetId: In(questionSetIds) }, { isInUse: false })
    }

    // Set updatedBy before soft delete
    await this.reviewedExerciseRepository.update(reviewedExerciseId, {
      updatedBy: currentUser
    })

    // Perform soft delete
    await this.reviewedExerciseRepository.softDelete(reviewedExerciseId)

    return { message: 'Reviewed exercise deleted successfully' }
  }

  // TODO: consider to implement logic for student to do reviewed exercise multiple times for the same reviewed exercise
  async submitReviewedExercise(
    reviewedExerciseId: string,
    questionSetId: string,
    submitDto: SubmitReviewedExerciseDto,
    currentUser: User
  ): Promise<ReviewedExerciseSubmissionResponseDto> {
    // Find the submission
    const submission = await this.reviewedExerciseSubmissionRepository.findOne({
      where: { reviewedExerciseId, questionSetId, studentId: currentUser.id },
      relations: ['student', 'reviewedExercise', 'questionSet']
    })

    if (!submission) {
      throw new ValidationException(ErrorCode.V004, 'Submission not found', [
        { property: 'submissionId', code: ErrorCode.V004 }
      ])
    }

    // Check if submission belongs to current user
    if (submission.studentId !== currentUser.id) {
      throw new ValidationException(ErrorCode.V004, 'Unauthorized access to submission', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    // Check if submission is still in progress
    if (submission.attemptStatus !== AttemptStatus.IN_PROGRESS) {
      throw new ValidationException(ErrorCode.V004, 'Submission has already been completed', [
        { property: 'submissionId', code: ErrorCode.V004 }
      ])
    }

    // Validate that all submitted questions belong to the question set
    const questionIds = submission.questionSet.questions
    const submittedQuestionIds = submitDto.answered.map((answer) => answer.questionId)
    const invalidQuestions = submittedQuestionIds.filter((id) => !questionIds.includes(id))

    if (invalidQuestions.length > 0) {
      throw new ValidationException(ErrorCode.Q001, 'Invalid question IDs in submission', [
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
      throw new ValidationException(ErrorCode.Q001, 'Invalid answer IDs in submission', [
        { property: 'answered', code: ErrorCode.Q001, message: `Invalid answer IDs: ${missingAnswers.join(', ')}` }
      ])
    }

    // Validate answer-question relationships
    for (const submittedAnswer of submitDto.answered) {
      const answer = answers.find((a) => a.answerId === submittedAnswer.answerId)
      if (answer && answer.question.questionId !== submittedAnswer.questionId) {
        throw new ValidationException(ErrorCode.Q001, 'Answer does not belong to the specified question', [
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

    const savedSubmission = await this.reviewedExerciseSubmissionRepository.save(submission)

    // Update streak for student
    try {
      await this.streakService.updateStreak(currentUser.id, savedSubmission.submittedAt)
    } catch (error) {
      // Log error but don't fail the submission
      console.error('Failed to update streak:', error)
    }

    return plainToInstance(ReviewedExerciseSubmissionResponseDto, savedSubmission)
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

  async getReviewedExerciseScoreSpectrum(reviewedExerciseId: string): Promise<ReviewedExerciseScoreSpectrumDto> {
    // Find the reviewed exercise
    const reviewedExercise = await this.reviewedExerciseRepository.findOne({
      where: { reviewedExerciseId },
      select: ['reviewedExerciseId', 'lessonId']
    })

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    /**
     * TODO: Below logic should be considered to be moved to background logic for better performance & reliability
     * */
    // Get all submitted entries for this reviewed exercise
    const submissions = await this.reviewedExerciseSubmissionRepository.find({
      where: {
        reviewedExerciseId,
        attemptStatus: AttemptStatus.SUBMITTED
      },
      select: ['score']
    })

    if (submissions.length === 0) {
      return {
        reviewedExerciseId: reviewedExercise.reviewedExerciseId,
        lessonId: reviewedExercise.lessonId,
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
      reviewedExerciseId: reviewedExercise.reviewedExerciseId,
      lessonId: reviewedExercise.lessonId,
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

  async getStudentGradeList(
    reviewedExerciseId: string,
    queryDto: GetStudentGradesQueryDto | undefined,
    currentUser: User
  ): Promise<StudentGradeListResponseDto> {
    // Ensure queryDto has default values if not provided
    // Create a new DTO with proper defaults to avoid readonly property issues
    const paginationDto: GetStudentGradesQueryDto = queryDto
      ? Object.assign(new GetStudentGradesQueryDto(), {
          limit: queryDto.limit || 10,
          page: queryDto.page || 1,
          order: queryDto.order || 'ASC',
          q: queryDto.q,
          attemptStatus: queryDto.attemptStatus
        })
      : new GetStudentGradesQueryDto()
    // Get reviewed exercise with lesson, module, and class
    const reviewedExercise = await this.reviewedExerciseRepository
      .createQueryBuilder('reviewedExercise')
      .leftJoinAndSelect('reviewedExercise.lesson', 'lesson')
      .leftJoinAndSelect('lesson.module', 'module')
      .leftJoinAndSelect('module.class', 'class')
      .where('reviewedExercise.reviewedExerciseId = :reviewedExerciseId', { reviewedExerciseId })
      .getOne()

    if (!reviewedExercise) {
      throw new ValidationException(ErrorCode.V004, 'Reviewed exercise not found', [
        { property: 'reviewedExerciseId', code: ErrorCode.V004 }
      ])
    }

    const userRole = extractUserRole(currentUser)

    // Get all submissions for this reviewed exercise with student info
    let submissionsQuery = this.reviewedExerciseSubmissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.student', 'student')
      .leftJoinAndSelect('student.role', 'studentRole')
      .where('submission.reviewedExerciseId = :reviewedExerciseId', { reviewedExerciseId })

    // If lecturer, filter to only show students in their assigned modules
    if (userRole === RoleInAccount.Lecturer) {
      const moduleId = reviewedExercise.lesson.module?.moduleId

      if (!moduleId) {
        throw new ValidationException(ErrorCode.V004, 'Module not found for this reviewed exercise', [
          { property: 'reviewedExerciseId', code: ErrorCode.V004 }
        ])
      }

      // Check if lecturer is assigned to this module
      const teachingModule = await this.teachingModuleRepository.findOne({
        where: {
          module: { moduleId },
          lecturer: { id: currentUser.id },
          isActive: true
        }
      })

      if (!teachingModule) {
        throw new ValidationException(
          ErrorCode.V000,
          'You are not assigned to teach this module. You can only view grades for students in your assigned modules.',
          [{ property: 'reviewedExerciseId', code: ErrorCode.V000 }]
        )
      }

      // Get the class ID from the module
      const classId = reviewedExercise.lesson.module?.class?.classId

      if (!classId) {
        throw new ValidationException(ErrorCode.V004, 'Class not found for this module', [
          { property: 'reviewedExerciseId', code: ErrorCode.V004 }
        ])
      }

      // Filter submissions to only include students enrolled in this class
      submissionsQuery = submissionsQuery.innerJoin(
        ClassEnrolment,
        'enrolment',
        'enrolment.studentId = student.id AND enrolment.classId = :classId',
        { classId }
      )
    }

    // Admin and Principal can see all students
    // No additional filtering needed

    // Apply search filter if provided
    if (paginationDto.q) {
      submissionsQuery.andWhere('(student.name ILIKE :search OR student.email ILIKE :search)', {
        search: `%${paginationDto.q}%`
      })
    }

    if (paginationDto.attemptStatus) {
      submissionsQuery.andWhere('submission.attemptStatus = :attemptStatus', {
        attemptStatus: paginationDto.attemptStatus
      })
    }

    // Apply sorting
    submissionsQuery.orderBy('student.name', paginationDto.order || 'ASC')
    submissionsQuery.addOrderBy('submission.submittedAt', 'DESC')

    // Apply pagination
    const [submissions, metaDto] = await paginate<ReviewedExerciseSubmissionEntity>(submissionsQuery, paginationDto, {
      skipCount: false,
      takeAll: false
    })

    // Transform to response DTO
    const studentGrades: StudentGradeItemDto[] = submissions.map((submission) => ({
      studentId: submission.student.id,
      studentName: submission.student.name,
      studentEmail: submission.student.email,
      studentAvatar: submission.student.avatar,
      submissionId: submission.reviewedExerciseSubmissionId,
      score: submission.score,
      attemptStatus: submission.attemptStatus,
      submittedAt: submission.submittedAt,
      note: submission.note,
      penalty: submission.penalty
    }))

    return plainToInstance(StudentGradeListResponseDto, {
      reviewedExerciseId,
      students: studentGrades,
      pagination: metaDto
    })
  }
}
