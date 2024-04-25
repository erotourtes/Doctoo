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
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';
import { PatientService } from './patient.service';
import { ResponsePatientConditionDto } from './dto/responsePatientCondition.dto';
import { CreatePatientConditionDto } from './dto/createPatientCondition.dto';
import { ResponseCondtionDto } from './dto/responseCondition.dto';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({
    summary: 'Get a patient by ID',
    description: 'This endpoint retrieves a patient object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponsePatientDto, description: 'Patient exists' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return this.patientService.getPatient(id);
  }

  @ApiOperation({
    summary: 'Create a new patient',
    description: 'This endpoint creates a new patient.',
  })
  @ApiBody({ type: CreatePatientDto })
  @ApiCreatedResponse({ type: ResponsePatientDto, description: 'Patient created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post()
  async createPatient(@Body() body: CreatePatientDto) {
    return this.patientService.createPatient(body);
  }

  @ApiOperation({
    summary: 'Update a patient by ID',
    description: 'This endpoint updates a patient object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: PatchPatientDto })
  @ApiOkResponse({ type: ResponsePatientDto, description: 'Patient updated' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Patch(':id')
  async patchPatient(@Param('id') id: string, @Body() body: PatchPatientDto) {
    return this.patientService.patchPatient(id, body);
  }

  @ApiOperation({
    summary: 'Delete a patient by ID',
    description: 'This endpoint deletes a patient object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'Patient deleted' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Delete(':id')
  async deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }

  @ApiOperation({
    summary: 'Create a new patient condition',
    description: 'This endpoint creates a new patient condition.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponsePatientConditionDto, description: 'Patient condition created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @ApiBody({ type: CreatePatientConditionDto })
  @Post(':id/condition')
  async createPatientCondition(@Param('id') patientId: string, @Body('conditionId') conditionId: string) {
    return this.patientService.createPatientCondition(patientId, conditionId);
  }

  @ApiOperation({
    summary: 'Get conditions by patient ID',
    description: 'This endpoint retrieves conditions by patient ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseCondtionDto, isArray: true, description: 'Patient conditions exist' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':id/condition')
  async getConditionsByPatientId(@Param('id') patientId: string) {
    return this.patientService.findConditionsByPatientId(patientId);
  }
}
