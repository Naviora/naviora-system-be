import { Injectable } from '@nestjs/common'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { plainToInstance } from 'class-transformer'
import { QuestionResponseDto, CreateQuestionResponseDto } from './dto/question-response.dto'
import { QuestionType } from '@common/enums/question.enum'
import { paginate } from '@utils/offset-pagination'
import { ListQuestionReqDto } from '@api/question/dto/list-question.req.dto'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,

    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,

    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>
  ) {}
  async create(createQuestionDto: CreateQuestionDto): Promise<CreateQuestionResponseDto> {
    try {
      // 1. Check if the lesson exists
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: createQuestionDto.lesson_id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      const newQuestion = this.questionRepository.create({
        lessonId: createQuestionDto.lesson_id,
        content: createQuestionDto.content,
        type: createQuestionDto.type,
        difficulty: createQuestionDto.difficulty,
        additionalImage: createQuestionDto.additional_image
      })

      const savedQuestion = await this.questionRepository.save(newQuestion)

      // 2. Create answers for this question

      // 2.1 Check if the question type is Multiple
      if (createQuestionDto.type === QuestionType.MULTI_CHOICE) {
        if (createQuestionDto.answers.length < 2) {
          throw new ValidationException(ErrorCode.Q002, 'Multiple choice question must have 4 answers')
        }
      }

      // 2.2 Check if more than 1 answer is correct
      if (createQuestionDto.answers.filter((answer) => answer.isCorrect).length > 1) {
        throw new ValidationException(ErrorCode.Q003, 'Multiple choice question must have only 1 correct answer')
      }

      // TODO: Check another question type in the future

      const newAnswers = []
      // Validate unique content for each provided answer (case-insensitive, trimmed)
      const seenContents = new Set<string>()
      for (const answer of createQuestionDto.answers) {
        const normalized = (answer.content || '').trim().toLowerCase()
        if (!normalized) {
          throw new ValidationException(ErrorCode.V004, 'Answer content must not be empty')
        }
        if (seenContents.has(normalized)) {
          throw new ValidationException(ErrorCode.Q004, 'Answer content must be unique')
        }
        seenContents.add(normalized)

        const newAnswer = this.answerRepository.create({
          question: savedQuestion,
          content: answer.content,
          isCorrect: answer.isCorrect
        })
        newAnswers.push(await this.answerRepository.save(newAnswer))
      }

      // Update correct answer ID in question
      const correctAnswer = newAnswers.find((answer) => answer.isCorrect)
      if (correctAnswer) {
        savedQuestion.correctAnswerId = correctAnswer.answerId
        await this.questionRepository.save(savedQuestion)
      }
      const responseData = {
        question: savedQuestion,
        answers: newAnswers
      }

      return plainToInstance(CreateQuestionResponseDto, responseData, {
        excludeExtraneousValues: true
      })
    } catch (error) {
      throw error
    }
  }

  async findAll(reqDto: ListQuestionReqDto) {
    try {
      // Find list answer for each question
      const query = this.questionRepository
        .createQueryBuilder('questions')
        .orderBy('questions.createdAt', 'DESC')
        .leftJoinAndSelect('questions.answers', 'answers')

      const [questions, metaDto] = await paginate<QuestionEntity>(query, reqDto, {
        skipCount: false,
        takeAll: false
      })

      return {
        questions,
        pagination: metaDto
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<QuestionResponseDto> {
    try {
      const question = await this.questionRepository.findOne({
        where: { questionId: id },
        relations: ['answers']
      })
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }

      return plainToInstance(QuestionResponseDto, question, {
        excludeExtraneousValues: true
      })
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<QuestionResponseDto> {
    try {
      // 1. Check if the question exists
      const question = await this.questionRepository.findOne({
        where: { questionId: id },
        relations: ['answers']
      })
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }

      // 2. Check if the lesson exists
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: updateQuestionDto.lesson_id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      // 3. Update question fields
      Object.assign(question, {
        lessonId: updateQuestionDto.lesson_id || question.lessonId,
        content: updateQuestionDto.content || question.content,
        type: updateQuestionDto.type || question.type,
        difficulty: updateQuestionDto.difficulty || question.difficulty,
        additionalImage: updateQuestionDto.additional_image || question.additionalImage
      })

      //4. Update content answers if client provides new content of answers
      if (updateQuestionDto.answers) {
        // Validate uniqueness across provided updates combined with untouched existing answers
        const normalizedExisting = new Set<string>()
        // Add all current answers (that will remain) using their final content after updates
        const finalContentsById = new Map<string, string>()
        for (const ans of question.answers) {
          finalContentsById.set(ans.answerId, ans.content)
        }
        // Apply incoming changes in-memory to compute final contents
        for (const incoming of updateQuestionDto.answers) {
          const current = finalContentsById.get(incoming.answer_id)
          if (current !== undefined) {
            finalContentsById.set(incoming.answer_id, incoming.content)
          }
        }
        // Now validate uniqueness (case-insensitive, trimmed)
        for (const [, content] of finalContentsById) {
          const normalized = (content || '').trim().toLowerCase()
          if (!normalized) {
            throw new ValidationException(ErrorCode.V004, 'Answer content must not be empty')
          }
          if (normalizedExisting.has(normalized)) {
            throw new ValidationException(ErrorCode.Q004, 'Answer content must be unique')
          }
          normalizedExisting.add(normalized)
        }

        // Proceed with applying updates after validation
        for (const answer of updateQuestionDto.answers) {
          const existingAnswer = question.answers.find((a) => a.answerId === answer.answer_id)
          if (existingAnswer) {
            existingAnswer.content = answer.content
            existingAnswer.isCorrect = answer.is_correct
          }
        }
      }

      const updatedQuestion = await this.questionRepository.save(question)

      return plainToInstance(QuestionResponseDto, updatedQuestion, {
        excludeExtraneousValues: true
      })
    } catch (error) {
      throw error
    }
  }

  async remove(id: string): Promise<QuestionResponseDto> {
    try {
      const question = await this.questionRepository.findOne({
        where: { questionId: id }
      })
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }

      await this.questionRepository.remove(question)

      return plainToInstance(QuestionResponseDto, question, {
        excludeExtraneousValues: true
      })
    } catch (error) {
      throw error
    }
  }
}
