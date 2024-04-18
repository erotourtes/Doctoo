import { Controller, Get, Post, Param, Delete, UploadedFile, UseInterceptors, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';

@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.minioService.createBucketIfNotExists();

    try {
      const fileName = await this.minioService.uploadFile(file);
      return `File ${fileName} uploaded successfully`;
    } catch (error) {
      throw error;
    }
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    try {
      const fileUrl = await this.minioService.getFileUrl(fileName);
      return fileUrl;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    try {
      await this.minioService.deleteFile(fileName)
      return `File ${fileName} deleted successfully`;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
