import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../../utils/errorResponses';
import { DoctorDto } from './dto/doctor.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: 'Create a new doctor',
    description: 'Creates a new doctor profile',
  })
  @ApiBody({ type: CreateDoctorDto })
  @ApiOkResponse({ type: DoctorDto, description: 'Doctor created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @ApiOperation({
    summary: 'Get all doctors',
    description: 'This endpoint retrieves all doctors.',
  })
  @ApiOkResponse({type: DoctorDto, isArray: true, description: 'All doctors' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get()
  findAll() {
    return this.doctorService.findMany();
  }

  @ApiOperation({
    summary: 'Get a doctor by ID',
    description: 'This endpoint retrieves a doctor by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: DoctorDto, description: 'A doctor object got by ID' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a doctor by ID',
    description: 'This endpoint updates a doctor object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiOkResponse({type: DoctorDto, description: 'Doctor updated'})
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @ApiOperation({
    summary: 'Delete a doctor by ID',
    description: 'This endpoint deletes a doctor object by ID.',
  })
  @ApiOkResponse({description: 'Doctor deleted' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
