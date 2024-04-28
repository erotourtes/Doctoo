import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Client } from 'minio';
import { ResponseFileDto } from '../file/dto/response.dto';

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

  private async isFileExists(name: string): Promise<boolean> {
    try {
      await this.minioClient.statObject(this.bucketName, name);
    } catch (err) {
      throw new NotFoundException('Requested file not found.');
    }

    return true;
  }

  private minioClient: Client;
  private bucketName: string;
  private isProductionMode = this.configService.get('NODE_ENV') === 'production';

  async onModuleInit() {
    const isBucketExist = await this.minioClient.bucketExists(this.bucketName);

    if (!isBucketExist) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async upload(file: Express.Multer.File): Promise<ResponseFileDto> {
    const allowedTypes = ['image/', 'video/', 'application/pdf'];

    if (!allowedTypes.some(format => file.mimetype.startsWith(format))) {
      throw new BadRequestException('Supports only images, videos and documents files.');
    }

    const fileType = file.originalname.split('.').pop();
    const fileName = `${randomUUID()}.${fileType}`;

    await this.minioClient.putObject(this.bucketName, fileName, file.buffer);

    const url = await this.getFileByName(fileName);

    return plainToInstance(ResponseFileDto, { name: fileName, ...url });
  }

  async getFileByName(name: string): Promise<ResponseFileDto> {
    await this.isFileExists(name);

    await this.minioClient.statObject(this.bucketName, name);

    const presignedUrl = await this.minioClient.presignedGetObject(this.bucketName, name);

    const url = this.isProductionMode ? presignedUrl.split('?')[0] : presignedUrl;

    return plainToInstance(ResponseFileDto, { name, url });
  }

  async deleteFileByName(name: string): Promise<void> {
    await this.isFileExists(name);

    await this.minioClient.statObject(this.bucketName, name);
    await this.minioClient.removeObject(this.bucketName, name);
  }

  async uploadByUrl(url: string): Promise<string> {
    let response: Response;

    try {
      response = await fetch(url);
    } catch (err) {
      throw new BadRequestException('Invalid image url.');
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const fileName = randomUUID();

    await this.minioClient.putObject(this.bucketName, fileName, buffer);

    return fileName;
  }
}
