import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetPatientGuard } from '../patient/guards/get.guard';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create.dto';
import { PatchAppointmentDto } from './dto/patch.dto';
import { GetAppointmentGuard } from './guards/getAppointment.guard';

// TODO: Recode it.
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @UseGuards(GetPatientGuard)
  @Get('all-by-patient/:id')
  findAllByPatientId(@Param('id') id: string) {
    return this.appointmentService.findAllByPatientId(id);
  }

  @Get('all-by-doctor/:id')
  findAllByDoctorId(@Param('id') id: string) {
    return this.appointmentService.findAllByDoctorId(id);
  }

  @UseGuards(GetAppointmentGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(GetAppointmentGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: PatchAppointmentDto) {
    return this.appointmentService.update(id, body);
  }

  @UseGuards(GetAppointmentGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
