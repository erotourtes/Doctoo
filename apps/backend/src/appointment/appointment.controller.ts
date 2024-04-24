import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
import { GetPatientGuard } from '../patient/guards/get.guard';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../utils/errorResponses';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { ResponseAppointmentDto } from './dto/response.dto';
import { GetAppointmentGuard } from './guards/getAppointment.guard';

// TODO: Recode it.
@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({
    summary: 'Create a new appointment',
    description: 'This endpoint creates a new appointment.',
  })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiCreatedResponse({ type: ResponseAppointmentDto, description: 'Appointment created' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post()
  create(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @ApiOperation({
    summary: 'Get a list of all appointments',
    description: 'This endpoint retrieves a list of all appointment objects.',
  })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: 'Appointments exist' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internalserver error' })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @ApiOperation({
    summary: 'Get a list of appointments of the patient',
    description: "This endpoint retrieves a list of appointment objects of the patient by it's ID.",
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: 'Appointments exist' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetPatientGuard)
  @Get('all-by-patient/:id')
  findAllByPatientId(@Param('id') id: string) {
    return this.appointmentService.findAllByPatientId(id);
  }

  @ApiOperation({
    summary: 'Get a list of appointments of the doctor',
    description: "This endpoint retrieves a list of appointment objects of the doctor by it's ID.",
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: 'Appointments exist' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get('all-by-doctor/:id')
  findAllByDoctorId(@Param('id') id: string) {
    return this.appointmentService.findAllByDoctorId(id);
  }

  @ApiOperation({
    summary: 'Get an appointment by ID',
    description: 'This endpoint retrieves an appointment object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Appointment ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: 'Appointment exists' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Appointment not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetAppointmentGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update an appointment by ID',
    description: 'This endpoint updates an appointment object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Appointment ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: PatchAppointmentDto })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: 'Appointment updated' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Appointment not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetAppointmentGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: PatchAppointmentDto) {
    return this.appointmentService.update(id, body);
  }

  @ApiOperation({
    summary: 'Delete an appointment by ID',
    description: 'This endpoint deletes an appointment object by ID.',
  })
  @ApiParam({ name: 'id', description: 'Appointment ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'Appointment deleted' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Appointment not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @UseGuards(GetAppointmentGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
