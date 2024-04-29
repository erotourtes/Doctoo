import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { ResponseAppointmentDto } from './dto/response.dto';
import JWTGuard from 'src/auth/gaurds/jwt.guard';
import { UserDec } from 'src/user/user.decorator';
import { UnauthorizedResponse } from 'src/utils/UnauthorizedResponse';

@ApiTags('Appointment Endpoints')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create an appointment' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateAppointmentDto })
  createAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @Get('patient/:id')
  @ApiOperation({ summary: 'Get all appointments by patient id' })
  @ApiOkResponse({ type: ResponseAppointmentDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique patient id.' })
  getAppointmentsByPatientId(@Param('id') id: string) {
    return this.appointmentService.getAppointmentsByPatientId(id);
  }

  @UseGuards(JWTGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get my appointment' })
  @ApiHeader({ name: 'Cookie', example: 'jwt=eyJhbGci...', description: 'JWT token' })
  @ApiOkResponse({ type: ResponseAppointmentDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getMyAppointments(@UserDec() userInfo) {
    return this.appointmentService.getAppointmentsByPatientId(userInfo.id);
  }

  @Get('doctor/:id')
  @ApiOperation({ summary: 'Get all appointments by doctor id' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' })
  getAppointmentsByDoctorId(@Param('id') id: string) {
    return this.appointmentService.getAppointmentsByDoctorId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique appointment id.' })
  getAppointment(@Param('id') id: string) {
    return this.appointmentService.getAppointment(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiOkResponse({ type: ResponseAppointmentDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique appointment id.' })
  @ApiBody({ type: PatchAppointmentDto })
  patchAppointment(@Param('id') id: string, @Body() body: PatchAppointmentDto) {
    return this.appointmentService.patchAppointment(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique appointment id.' })
  deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }
}
