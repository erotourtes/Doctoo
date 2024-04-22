import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { GetPatientGuard } from './guards/get.guard';
import { PatientService } from './patient.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ResponsePatientDto } from './dto/response.dto';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../../utils/errorResponses';

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
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetPatientGuard)
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
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
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
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetPatientGuard)
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
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Patient not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetPatientGuard)
  @Delete(':id')
  async deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}
