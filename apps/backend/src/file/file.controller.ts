import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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

// TODO: Use new code-style
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
    try {
      const fileName = await this.minioService.uploadFile(file);

      // TODO: Return uploaded object.
      return `File ${fileName} uploaded successfully`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Get a link for a file by name',
    description: 'This endpoint retrieves a link for a file by name.',
  })
  @ApiParam({ name: 'fileName', description: 'File name', example: 'file.pdf' })
  @ApiOkResponse({ type: String, description: 'The link for the file' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'File not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    try {
      const fileUrl = await this.minioService.getFileUrl(fileName);

      return fileUrl;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Delete a file by name',
    description: 'This endpoint deletes a file by name.',
  })
  @ApiParam({ name: 'fileName', description: 'File name', example: 'file.pdf' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'File not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    try {
      return await this.minioService.deleteFile(fileName);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
