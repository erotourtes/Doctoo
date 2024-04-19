import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentGuard } from './guards/getAppointment.guard';
import { GetPatientGuard } from 'src/patient/guards/get.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @UseGuards(GetPatientGuard)
  @Get('all-by-patient/:id')
  findAllByPatientId(@Param('id') patient_id: string) {
    return this.appointmentService.findAllByPatientId(patient_id);
  }

  @Get('all-by-doctor/:id')
  findAllByDoctorId(@Param('id') doctor_id: string) {
    return this.appointmentService.findAllByDoctorId(doctor_id);
  }

  @UseGuards(GetAppointmentGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(GetAppointmentGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAppointmentDto) {
    return this.appointmentService.update(id, body);
  }

  @UseGuards(GetAppointmentGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
