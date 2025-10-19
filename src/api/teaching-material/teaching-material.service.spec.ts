import { Test, TestingModule } from '@nestjs/testing'
import { TeachingMaterialService } from './teaching-material.service'

describe('TeachingMaterialService', () => {
  let service: TeachingMaterialService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachingMaterialService]
    }).compile()

    service = module.get<TeachingMaterialService>(TeachingMaterialService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
