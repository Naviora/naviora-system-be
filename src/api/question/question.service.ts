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

      // Create answers for this question
      const newAnswers = []
      for (const answer of createQuestionDto.answers) {
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

  async findAll(): Promise<QuestionResponseDto[]> {
    try {
      const questions = await this.questionRepository.find({
        relations: ['answers']
      })

      return plainToInstance(QuestionResponseDto, questions, {
        excludeExtraneousValues: true
      })
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
      const question = await this.questionRepository.findOne({
        where: { questionId: id },
        relations: ['answers']
      })
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }

      // Update question fields
      Object.assign(question, {
        lessonId: updateQuestionDto.lesson_id || question.lessonId,
        content: updateQuestionDto.content || question.content,
        type: updateQuestionDto.type || question.type,
        difficulty: updateQuestionDto.difficulty || question.difficulty,
        additionalImage: updateQuestionDto.additional_image || question.additionalImage
      })

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
        where: { questionId: id },
        relations: ['answers']
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
