import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create.dto';
import { ResponseDeclarationDto } from './dto/response.dto';
import { UpdateDeclarationDto } from './dto/update.dto';

@ApiTags('Declaration Endpoints')
@Controller('declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Post()
  @ApiOperation({ summary: 'Create declaration' })
  @ApiOkResponse({ type: ResponseDeclarationDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateDeclarationDto })
  createDeclaration(@Body() body: CreateDeclarationDto) {
    return this.declarationService.createDeclaration(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get declarations' })
  @ApiOkResponse({ type: ResponseDeclarationDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getDeclrations() {
    return this.declarationService.getDeclarations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get declaration' })
  @ApiOkResponse({ type: ResponseDeclarationDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: '1', description: 'Unique declaration id.' })
  getDeclaration(@Param('id') id: string) {
    return this.declarationService.getDeclaration(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update declaration' })
  @ApiOkResponse({ type: ResponseDeclarationDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: '1', description: 'Unique declaration id.' })
  @ApiBody({ type: CreateDeclarationDto })
  patchDeclaration(@Param('id') id: string, @Body() body: UpdateDeclarationDto) {
    return this.declarationService.patchDeclaration(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete declaration' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: '1', description: 'Unique declaration id.' })
  deleteDeclaration(@Param('id') id: string) {
    return this.declarationService.deleteDeclaration(+id);
  }
}
