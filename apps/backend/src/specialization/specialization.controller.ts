import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create.dto';
import { UpdateSpecializationDto } from './dto/update.dto';

@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.createSpecialization(createSpecializationDto);
  }

  @Get()
  getSpecializations() {
    return this.specializationService.getSpecializations();
  }

  @Get(':id')
  getSpecialization(@Param('id') id: string) {
    return this.specializationService.getSpecialization(id);
  }

  @Patch(':id')
  updateSpecialization(@Param('id') id: string, @Body() updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationService.updateSpecialization(id, updateSpecializationDto);
  }

  @Delete(':id')
  deleteSpecialization(@Param('id') id: string) {
    return this.specializationService.deleteSpecialization(id);
  }
}
