import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  createHospital(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.createHospital(createHospitalDto);
  }

  @Get()
  findManyHospitals() {
    return this.hospitalService.findManyHospitals();
  }

  @Get(':id')
  findHospitalById(@Param('id') id: string) {
    return this.hospitalService.findHospitalById(id);
  }

  @Patch(':id')
  updateHospital(@Param('id') id: string, @Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalService.updateHospital(id, updateHospitalDto);
  }

  @Delete(':id')
  deleteHospital(@Param('id') id: string) {
    return this.hospitalService.deleteHospital(id);
  }
}
