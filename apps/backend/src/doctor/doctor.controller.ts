import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';
import { ResponseDoctorDto } from './dto/response.dto';
import { GetDoctorsQuery } from './query/get-doctors.query';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: 'Create a new doctor',
    description: 'Creates a new doctor profile',
  })
  @ApiBody({ type: CreateDoctorDto })
  @ApiOkResponse({ type: ResponseDoctorDto, description: 'Doctor created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post()
  createDoctor(@Body() body: CreateDoctorDto) {
    return this.doctorService.createDoctor(body);
  }

  @ApiOperation({
    summary: 'Get all doctors',
    description: 'This endpoint retrieves all doctors.',
  })
  @ApiOkResponse({ type: ResponseDoctorDto, isArray: true, description: 'All doctors' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get()
  getDoctors(@Query() query: GetDoctorsQuery) {
    return this.doctorService.getDoctors(query);
  }

  @ApiOperation({
    summary: 'Get a doctor by ID',
    description: 'This endpoint retrieves a doctor by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseDoctorDto, description: 'A doctor object got by ID' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get(':id')
  getDoctor(@Param('id') id: string) {
    return this.doctorService.getDoctor(id);
  }

  @ApiOperation({
    summary: 'Update a doctor by ID',
    description: 'This endpoint updates a doctor object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: PatchDoctorDto })
  @ApiOkResponse({ type: ResponseDoctorDto, description: 'Doctor updated' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Patch(':id')
  patchDoctor(@Param('id') id: string, @Body() body: PatchDoctorDto) {
    return this.doctorService.patchDoctor(id, body);
  }

  @ApiOperation({
    summary: 'Delete a doctor by ID',
    description: 'This endpoint deletes a doctor object by ID.',
  })
  @ApiOkResponse({ description: 'Doctor deleted' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}
