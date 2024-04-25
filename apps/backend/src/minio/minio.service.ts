import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: Number(this.configService.get<number>('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });

    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  private minioClient: Client;
  private bucketName: string;

  private async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
    }
  }

  async onModuleInit() {
    await this.createBucketIfNotExists();
  }

  async upload(file: Express.Multer.File) {
    const allowedFormats = ['image/', 'video/', 'application/pdf'];

    if (!allowedFormats.some(format => file.mimetype.startsWith(format))) {
      throw new BadRequestException('Invalid file format');
    }

    const fullFileName = `${randomUUID()}.${file.originalname.split('.').pop()}`;

    await this.minioClient.putObject(this.bucketName, fullFileName, file.buffer);

    const url = await this.getFileByName(fullFileName);

    return { name: fullFileName, ...url };
  }

  async getFileByName(name: string) {
    try {
      await this.minioClient.statObject(this.bucketName, name);

      const url = await this.minioClient.presignedGetObject(this.bucketName, name);

      return { url };
    } catch (err) {
      throw new NotFoundException('Request file not found.');
    }
  }

  async deleteFileByName(name: string) {
    try {
      await this.minioClient.statObject(this.bucketName, name);
      await this.minioClient.removeObject(this.bucketName, name);
    } catch (err) {
      throw new NotFoundException('Request file not found');
    }
  }
}
