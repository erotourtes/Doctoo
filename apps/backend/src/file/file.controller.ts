import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { MinioService } from '../minio/minio.service';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { ResponseFileDto } from './dto/response.dto';

@ApiTags('File Endpoints')
@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ResponseFileDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ description: 'The file to be uploaded.' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.minioService.upload(file);

    return response;
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get file' })
  @ApiOkResponse({ type: ResponseFileDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'name', example: `${randomUUID()}.png`, description: 'Unique file name.' })
  async getFileByName(@Param('name') name: string) {
    const response = await this.minioService.getFileByName(name);

    return response;
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Delete file' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'name', example: `${randomUUID()}.png`, description: 'Unique file name.' })
  async deleteFileByName(@Param('name') name: string) {
    return await this.minioService.deleteFileByName(name);
  }
}
