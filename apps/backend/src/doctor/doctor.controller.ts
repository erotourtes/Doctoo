import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create.dto';
import { PatchDoctorDto } from './dto/patch.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  createDoctor(@Body() body: CreateDoctorDto) {
    return this.doctorService.createDoctor(body);
  }

  @Get()
  getDoctors() {
    return this.doctorService.getDoctors();
  }

  @Get(':id')
  getDoctor(@Param('id') id: string) {
    return this.doctorService.getDoctor(id);
  }

  @Patch(':id')
  patchDoctor(@Param('id') id: string, @Body() body: PatchDoctorDto) {
    return this.doctorService.patchDoctor(id, body);
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}
