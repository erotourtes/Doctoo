import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateSpecializationDto } from './dto/create.dto';
import { ResponseSpecializationDto } from './dto/response.dto';
import { UpdateSpecializationDto } from './dto/update.dto';
import { SpecializationService } from './specialization.service';

@ApiTags('Spesialization')
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @ApiBody({ type: CreateSpecializationDto })
  @ApiOkResponse({ type: ResponseSpecializationDto, description: 'Spesialization created' })
  @Post()
  create(@Body() body: CreateSpecializationDto) {
    return this.specializationService.createSpecialization(body);
  }

  @ApiOkResponse({ type: ResponseSpecializationDto, isArray: true, description: 'Return specializations list' })
  @Get()
  getSpecializations() {
    return this.specializationService.getSpecializations();
  }

  @ApiParam({ name: 'id', example: '1', description: 'Spesialization id' })
  @ApiOkResponse({ type: ResponseSpecializationDto, description: 'Spesialization object' })
  @Get(':id')
  getSpecialization(@Param('id') id: string) {
    return this.specializationService.getSpecialization(id);
  }

  @ApiBody({ type: UpdateSpecializationDto })
  @ApiParam({ name: 'id', example: '1', description: 'Spesialization id' })
  @ApiOkResponse({ type: ResponseSpecializationDto, description: 'Spesialization updated' })
  @Patch(':id')
  updateSpecialization(@Param('id') id: string, @Body() body: UpdateSpecializationDto) {
    return this.specializationService.updateSpecialization(id, body);
  }

  @ApiParam({ name: 'id', example: '1', description: 'Spesialization id' })
  @Delete(':id')
  deleteSpecialization(@Param('id') id: string) {
    return this.specializationService.deleteSpecialization(id);
  }
}
