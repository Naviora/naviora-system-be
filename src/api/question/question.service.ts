import { Injectable } from '@nestjs/common'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { Repository } from 'typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: Repository<QuestionEntity>) {}
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      // TODO: check lesson exist
      // const lesson = await this.lessonRepository.findOne({ where: { lessonId: createQuestionDto.lessonId } })
      // if (!lesson) {
      //   throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      // }

      // TODO: check correct answer exist
      // const correctAnswer = await this.answerRepository.findOne({ where: { id: createQuestionDto.correctAnswerId } })
      // if (!correctAnswer) {
      //   throw new ValidationException(ErrorCode.A001, 'Correct answer not found')
      // }

      const question = this.questionRepository.create(createQuestionDto)
      return await this.questionRepository.save(question)
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return await this.questionRepository.find()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepository.findOne({ where: { questionId: id } })
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }
      return question
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.findOne(id)
      Object.assign(question, updateQuestionDto)
      return await this.questionRepository.save(question)
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const question = await this.findOne(id)
      if (!question) {
        throw new ValidationException(ErrorCode.Q001, 'Question not found')
      }
      await this.questionRepository.remove(question)
      return question
    } catch (error) {
      throw error
    }
  }
}
