import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { CreateAllergyDto } from './dto/create.dto';
import { UpdateAllergyDto } from './dto/update.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from 'src/utils/errorResponses';
import { ResponseAllergyDto } from './dto/response.dto';

@Controller('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @ApiOperation({ summary: 'Create a new allergy', description: 'This endpoint creates an allergy.' })
  @ApiOkResponse({ type: ResponseAllergyDto, description: 'Allergy created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @ApiBody({ type: CreateAllergyDto })
  @Post()
  create(@Body() body: CreateAllergyDto) {
    return this.allergyService.create(body);
  }

  @ApiOperation({ summary: 'Get all allergies', description: 'This endpoint retrieves all allergies.' })
  @ApiOkResponse({ type: ResponseAllergyDto, isArray: true, description: 'Allergies found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get()
  findAll() {
    return this.allergyService.findAll();
  }

  @ApiOperation({ summary: 'Get allergy by ID', description: 'This endpoint retrieves an allergy by ID.' })
  @ApiOkResponse({ type: ResponseAllergyDto, description: 'Allergy found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Allergy ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allergyService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an allergy', description: 'This endpoint updates an allergy.' })
  @ApiParam({ name: 'id', description: 'Allergy ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseAllergyDto, description: 'Allergy updated' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Allergy not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @ApiBody({ type: UpdateAllergyDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAllergyDto) {
    return this.allergyService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete an allergy', description: 'This endpoint deletes an allergy.' })
  @ApiOkResponse({ description: 'Allergy deleted' })
  @ApiParam({ name: 'id', description: 'Allergy ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Allergy not found' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergyService.remove(id);
  }
}
