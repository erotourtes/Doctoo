import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../utils/errorResponses';
import { CreateHospitalDto } from './dto/create.dto';
import { PatchHospitalDto } from './dto/patch.dto';
import { ResponseHospitalDto } from './dto/response.dto';
import { HospitalService } from './hospital.service';

@ApiTags('Hospital')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiOperation({
    summary: 'Create a new hospital',
    description: 'This endpoint creates a new hospital.',
  })
  @ApiBody({ type: CreateHospitalDto })
  @ApiCreatedResponse({ type: ResponseHospitalDto, description: 'Hospital created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post()
  createHospital(@Body() body: CreateHospitalDto) {
    return this.hospitalService.createHospital(body);
  }

  @ApiOperation({
    summary: 'Get a list of hospitals',
    description: 'This endpoint retrieves a list of hospital objects.',
  })
  @ApiOkResponse({ type: ResponseHospitalDto, description: 'Hospitals exist' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get()
  getHospitals() {
    return this.hospitalService.getHospitals();
  }

  @ApiOperation({
    summary: 'Get a hospital by ID',
    description: 'This endpoint retrieves a hospital object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Hospital ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseHospitalDto, description: 'Hospital exists' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Hospital not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':id')
  getHospital(@Param('id') id: string) {
    return this.hospitalService.getHospital(id);
  }

  @ApiOperation({
    summary: 'Update a hospital by ID',
    description: 'This endpoint updates a hospital object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: PatchHospitalDto })
  @ApiOkResponse({ type: ResponseHospitalDto, description: 'Hospital updated' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Hospital not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Patch(':id')
  patchHospital(@Param('id') id: string, @Body() body: PatchHospitalDto) {
    return this.hospitalService.patchHospital(id, body);
  }

  @ApiOperation({
    summary: 'Delete a hospital by ID',
    description: 'This endpoint deletes a hospital object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Hospital ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'Hospital deleted' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Hospital not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete(':id')
  deleteHospital(@Param('id') id: string) {
    return this.hospitalService.deleteHospital(id);
  }
}
