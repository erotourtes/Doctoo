import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create.dto';
import { PatchHospitalDto } from './dto/patch.dto';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  createHospital(@Body() body: CreateHospitalDto) {
    return this.hospitalService.createHospital(body);
  }

  @Get()
  getHospitals() {
    return this.hospitalService.getHospitals();
  }

  @Get(':id')
  getHospital(@Param('id') id: string) {
    return this.hospitalService.getHospital(id);
  }

  @Patch(':id')
  patchHospital(@Param('id') id: string, @Body() body: PatchHospitalDto) {
    return this.hospitalService.patchHospital(id, body);
  }

  @Delete(':id')
  deleteHospital(@Param('id') id: string) {
    return this.hospitalService.deleteHospital(id);
  }
}
