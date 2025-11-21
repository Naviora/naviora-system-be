import { Test, TestingModule } from '@nestjs/testing'
import { TeachingMaterialController } from './teaching-material.controller'
import { TeachingMaterialService } from './teaching-material.service'

describe('TeachingMaterialController', () => {
  let controller: TeachingMaterialController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachingMaterialController],
      providers: [TeachingMaterialService]
    }).compile()

    controller = module.get<TeachingMaterialController>(TeachingMaterialController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
