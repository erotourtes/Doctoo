import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MinioService } from '../minio/minio.service';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../utils/errorResponses';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}

  @ApiOperation({
    summary: 'Uploading a file',
    description: 'This endpoint is used for the file uploading.',
  })
  @ApiBody({ description: 'Formdata object with a file data' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: String, description: 'Message: File was uploaded successfully' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.minioService.upload(file);

    return response;
  }

  @ApiOperation({
    summary: 'Get a link for a file by name',
    description: 'This endpoint retrieves a link for a file by name.',
  })
  @ApiParam({ name: 'name', description: 'File name', example: 'file.pdf' })
  @ApiOkResponse({ type: String, description: 'The link for the file' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'File not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':name')
  async getFile(@Param('name') name: string) {
    const response = await this.minioService.getFileByName(name);

    return response;
  }

  @ApiOperation({
    summary: 'Delete a file by name',
    description: 'This endpoint deletes a file by name.',
  })
  @ApiParam({ name: 'name', description: 'File name', example: 'file.pdf' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'File not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete(':name')
  async deleteFile(@Param('name') name: string) {
    return await this.minioService.deleteFileByName(name);
  }
}
