import { Injectable } from '@nestjs/common'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { MaterialService } from './material.service'
import { CreateMaterialResDto } from './dto/create-material.res.dto'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { CloudinaryResponse } from '@cloudinary/dtos/cloudinary-response'
import * as streamifier from 'streamifier'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { MaterialType } from '@common/enums/material.enum'

export type UploadMaterialDto = {
  material_name: string
  material_type: MaterialType
  lecturer_id: string
}

@Injectable()
export class MaterialUploadService extends CloudinaryService {
  constructor(
    private readonly materialService: MaterialService,
    @InjectRepository(TeachingMaterial)
    private readonly teachingMaterialRepository: Repository<TeachingMaterial>
  ) {
    super()
  }

  async uploadAndCreateMaterial(
    file: Express.Multer.File,
    uploadData: UploadMaterialDto
  ): Promise<CreateMaterialResDto> {
    let cloudinaryResult: CloudinaryResponse | null = null

    try {
      // Upload file to Cloudinary
      cloudinaryResult = await this.uploadFile(file)

      if (!cloudinaryResult.secure_url) {
        throw new Error('Tải tệp lên Cloudinary thất bại')
      }

      // Create material record in database
      const material = await this.materialService.create({
        material_name: uploadData.material_name,
        material_type: uploadData.material_type,
        material_path: cloudinaryResult.secure_url,
        lecturer_id: uploadData.lecturer_id
      })

      return plainToInstance(CreateMaterialResDto, material)
    } catch (error) {
      // If database creation fails, clean up uploaded file
      if (cloudinaryResult?.public_id) {
        await this.deleteFile(cloudinaryResult.public_id)
      }
      throw error
    }
  }

  async uploadAndCreateMaterialWithCustomFolder(
    file: Express.Multer.File,
    uploadData: UploadMaterialDto,
    folder: string = 'materials'
  ): Promise<CreateMaterialResDto> {
    let cloudinaryResult: CloudinaryResponse | null = null

    try {
      // Upload file to Cloudinary with custom folder
      cloudinaryResult = await this.uploadFileToFolder(file, folder)

      if (!cloudinaryResult.secure_url) {
        throw new Error('Tải tệp lên Cloudinary thất bại')
      }

      // Create material record in database
      const material = await this.materialService.create({
        material_name: uploadData.material_name,
        material_type: uploadData.material_type,
        material_path: cloudinaryResult.secure_url,
        lecturer_id: uploadData.lecturer_id
      })
      return plainToInstance(CreateMaterialResDto, material)
    } catch (error) {
      // If database creation fails, clean up uploaded file
      if (cloudinaryResult?.public_id) {
        await this.deleteFile(cloudinaryResult.public_id)
      }
      throw error
    }
  }

  private async uploadFileToFolder(file: Express.Multer.File, folder: string): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error: Error | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve(result)
        }
      )

      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
  }

  async deleteMaterialAndFile(materialId: string): Promise<void> {
    try {
      // Get material to extract public_id from URL
      const material = await this.materialService.findById(materialId)
      if (!material) {
        throw new Error('Không tìm thấy tài liệu')
      }

      // Delete all teaching materials associated with this material
      await this.teachingMaterialRepository.delete({ material: { materialId: materialId } })

      // Extract public_id from Cloudinary URL
      const publicId = this.extractPublicIdFromUrl(material.materialPath)

      if (publicId) {
        // Delete file from Cloudinary
        await this.deleteFile(publicId)
      }

      // Delete material record from database
      await this.materialService.delete(materialId)
    } catch (error) {
      throw error
    }
  }

  private extractPublicIdFromUrl(url: string): string | null {
    try {
      // Extract public_id from Cloudinary URL
      // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
      const urlParts = url.split('/')
      const uploadIndex = urlParts.findIndex((part) => part === 'upload')

      if (uploadIndex === -1 || uploadIndex + 2 >= urlParts.length) {
        return null
      }

      const publicIdWithVersion = urlParts[uploadIndex + 2]
      // Remove version prefix (v1234567890) if present
      const publicId = publicIdWithVersion.replace(/^v\d+_/, '')

      return publicId
    } catch {
      return null
    }
  }
}
