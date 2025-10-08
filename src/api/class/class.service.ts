import { Inject, Injectable } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { ClassType } from '@common/enums/class-types.enum'
import { paginate } from '@utils/offset-pagination'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const { classCode } = createClassDto

      const existingClass = await this.classRepository.findOne({ where: { classCode } })

      if (existingClass) {
        throw new ValidationException(ErrorCode.CLASS001, 'Class code already exists', [
          {
            property: 'classCode',
            code: ErrorCode.CLASS001
          }
        ])
      }

      const classEntity = this.classRepository.create(createClassDto)

      const newClass = await this.classRepository.save(classEntity)
      if (!newClass) {
        throw new ValidationException(ErrorCode.CLASS002)
      }
      return newClass
    } catch (error) {
      throw error
    }
  }

  async getClasses(queryDto: GetClassesQueryDto) {
    const query = this.classRepository.createQueryBuilder('class')

    // Search filter
    if (queryDto.q) {
      query.andWhere('(class.className ILIKE :search OR class.classCode ILIKE :search)', { search: `%${queryDto.q}%` })
    }

    // Class type filter
    if (queryDto.classType) {
      query.andWhere('class.classType = :classType', { classType: queryDto.classType })
    }

    // Sorting
    const sortBy = queryDto.sortBy || 'createdAt'
    const validSortFields = ['className', 'classCode', 'createdAt', 'updatedAt', 'startDate', 'endDate']
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'
    query.orderBy(`class.${sortField}`, queryDto.order)

    // Pagination
    const [classes, metaDto] = await paginate(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      classes,
      meta: metaDto
    }
  }

  async getClassById(classId: string) {
    const classEntity = await this.classRepository.findOne({ where: { classId } })

    if (!classEntity) {
      throw new ValidationException(ErrorCode.CLASS003, 'Class not found', [
        { property: 'classId', code: ErrorCode.CLASS003 }
      ])
    }

    /**
     * TODO: wait for others to finish the implementation - will fetch all the relations of the class
     */

    return classEntity
  }
}
