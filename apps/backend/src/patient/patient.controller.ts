import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { GetPatientGuard } from './guards/get.guard';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(GetPatientGuard)
  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return this.patientService.getPatient(id);
  }

  @Post()
  async createPatient(@Body() body: CreatePatientDto) {
    return this.patientService.createPatient(body);
  }

  @UseGuards(GetPatientGuard)
  @Patch(':id')
  async patchPatient(@Param('id') id: string, @Body() body: PatchPatientDto) {
    return this.patientService.patchPatient(id, body);
  }

  @UseGuards(GetPatientGuard)
  @Delete(':id')
  async deletePatient(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}
