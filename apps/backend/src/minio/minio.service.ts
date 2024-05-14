import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Client } from 'minio';
import { ResponseFileDto } from '../file/dto/response.dto';
import { Tesseract } from 'tesseract.ts';

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

  private async isValidForeignPassport(text: string): Promise<boolean> {
    const namePattern = /Ім'я\/ Given Names\s+\S+.*?/;
    const hasName = namePattern.test(text);

    const passportNumberPattern = /(?:УКРАЇНА|YKPAIHA)\/UKRAINE\s+\S+.*?/;
    const hasPassportNumber = passportNumberPattern.test(text);
    const datePattern = /Дата видачі\/ Date of issue\s+(?:[^\n]*?\/[^\n]*)/;
    const hasValidDate = datePattern.test(text);

    return hasName && hasPassportNumber && hasValidDate;
  }

  private async isValidDrivingLicence(text: string): Promise<boolean> {
    const pattern = /(?:UKRAINE DRIVING LICENCE|UKRAINE PERMIS DE CONDUIRE|DRIVING LICENCE\sUKRAINE)/i;
    const hasLicenseText = pattern.test(text);

    const datePattern = /\b\d{2}\.\d{2}\.\d{4}\b/;
    const hasValidDate = datePattern.test(text);

    const namePattern = /[A-ZА-ЯЁ]{2,}\s[A-ZА-ЯЁ]{2,}/;
    const hasName = namePattern.test(text);

    const licenseNumberPattern = /\b\d{6}\b/;
    const hasLicenseNumber = licenseNumberPattern.test(text);

    return hasLicenseText && hasValidDate && hasName && hasLicenseNumber;
  }

  private async isValidPassport(text) {
    const datePattern = /(\b\d{2}\s\d{2}\s\d{4}\b|\b\d{2}[-]\d{2}[-]\d{4}\b)/;
    const hasValidDate = datePattern.test(text);

    const namePattern = /[A-ZА-ЯЁ]{2,}\s[A-ZА-ЯЁ]{2,}/i;
    const hasName = namePattern.test(text);

    const passportNumberPattern = /\b\d{6,9}\b/;
    const hasPassportNumber = passportNumberPattern.test(text);

    return hasValidDate && hasName && hasPassportNumber;
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
      if (!this.isProductionMode) {
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: {
                AWS: ['*'],
              },
              Action: ['s3:GetObject'],
              Resource: [
                `arn:aws:s3:::${this.configService.get('MINIO_BUCKET_NAME')}`,
                `arn:aws:s3:::${this.configService.get('MINIO_BUCKET_NAME')}/*`,
              ],
            },
          ],
        };

        await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
      }
    }
  }

  async upload(file: Express.Multer.File): Promise<ResponseFileDto> {
    if (!file) throw new BadRequestException('file must be provided.');

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

  async uploadIdentityCard(file: Express.Multer.File, identityCardType: string): Promise<ResponseFileDto> {
    if (!file) throw new BadRequestException('file must be provided.');
    const type = Object.values(identityCardType).join('');
    let text = '';
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG and PNG files are allowed.');
    }
    await Tesseract.recognize(file.buffer, 'ukr+eng', {})
      .then(result => {
        console.log('OCR Result:', result.data.text);
        text = result.data.text;
      })
      .catch(err => {
        console.error('Error during OCR processing:', err);
        throw new BadRequestException('Failed to process image with OCR.');
      });

    if (type === 'ID card') {
      if (!(await this.isValidPassport(text))) {
        throw new BadRequestException('Invalid passport.');
      }
    } else if (type === 'Driver license') {
      if (!(await this.isValidDrivingLicence(text))) {
        throw new BadRequestException('Invalid driving licence.');
      }
    } else if (type === 'International passport') {
      if (!(await this.isValidForeignPassport(text))) {
        throw new BadRequestException('Invalid Foreign passport.');
      }
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

  async uploadByUrl(imageUrl: string): Promise<ResponseFileDto> {
    let response: Response;

    try {
      response = await fetch(imageUrl);
    } catch (err) {
      throw new BadRequestException('Invalid image url.');
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const fileType = response.headers.get('content-type').split('/').pop();
    const fileName = `${randomUUID()}.${fileType}`;

    await this.minioClient.putObject(this.bucketName, fileName, buffer);

    const url = await this.getFileByName(fileName);

    return plainToInstance(ResponseFileDto, { name: fileName, ...url });
  }
}
