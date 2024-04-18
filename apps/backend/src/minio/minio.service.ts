import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const allowedFormats = ['image/', 'video/', 'application/pdf'];

    if (!allowedFormats.some(format => file.mimetype.startsWith(format))) {
      throw new BadRequestException('Invalid file format');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    await this.minioClient.putObject(this.bucketName, fileName, file.buffer, file.size);
    return fileName;
  }

  async getFileUrl(fileName: string) {
    try {
      await this.minioClient.statObject(this.bucketName, fileName);
      return await this.minioClient.presignedGetObject(this.bucketName, fileName);
    } catch (error) {
      throw new NotFoundException(`File not found: ${fileName}`);
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.minioClient.statObject(this.bucketName, fileName);
      return await this.minioClient.removeObject(this.bucketName, fileName);
    } catch (error) {
      throw new NotFoundException(`File not found: ${fileName}`);
    }
  }
}
