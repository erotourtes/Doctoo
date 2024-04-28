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
import { randomUUID } from 'crypto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { CreatePatientDto } from './dto/create.dto';
import { CreatePatientConditionDto } from './dto/createPatientAllergy.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';
import { ResponseAllergyDto } from './dto/responseAllergy.dto';
import { ResponsePatientAllergyDto } from './dto/responsePatientAllergy.dto';
import { PatientService } from './patient.service';

@ApiTags('Patient Enpoints')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get patient' })
  @ApiOkResponse({ type: ResponsePatientDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: "The patient's unique id." })
  async getPatient(@Param('id') id: string) {
    return this.patientService.getPatient(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create patient' })
  @ApiOkResponse({ type: ResponsePatientDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreatePatientDto })
  async createPatient(@Body() body: CreatePatientDto) {
    return this.patientService.createPatient(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update patient' })
  @ApiOkResponse({ type: ResponsePatientDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: "The patient's unique id." })
  @ApiBody({ type: PatchPatientDto })
  async patchPatient(@Param('id') id: string, @Body() body: PatchPatientDto) {
    return this.patientService.patchPatient(id, body);
  }

  @Post(':id/allergy')
  @ApiOperation({ summary: 'Create patient allergy' })
  @ApiOkResponse({ type: ResponsePatientAllergyDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: "The patient's unique id." })
  @ApiBody({ type: CreatePatientConditionDto })
  async createPatientAllergy(@Param('id') patientId: string, @Body() body: CreatePatientConditionDto) {
    return this.patientService.createPatientAllergy(patientId, body.allergyId);
  }

  @Get(':id/allergy')
  @ApiOperation({ summary: 'Get patient allergies' })
  @ApiOkResponse({ type: ResponseAllergyDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: "The patient's unique id." })
  async getPatientAllergies(@Param('id') patientId: string) {
    return this.patientService.getPatientAllergies(patientId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: "The patient's unique id." })
  async deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}
