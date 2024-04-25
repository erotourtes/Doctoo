import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create.dto';
import { UpdateDeclarationDto } from './dto/update.dto';

@ApiTags('Declaration')
@Controller('declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @ApiBody({ type: CreateDeclarationDto })
  @ApiOkResponse({ type: CreateDeclarationDto, description: 'Declaration created' })
  @Post()
  create(@Body() createDeclarationDto: CreateDeclarationDto) {
    return this.declarationService.create(createDeclarationDto);
  }

  @ApiOkResponse({ type: CreateDeclarationDto, isArray: true, description: 'Declarations list' })
  @Get()
  findAll() {
    return this.declarationService.findAll();
  }

  @ApiOkResponse({ type: CreateDeclarationDto, description: 'Get declaration' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.declarationService.findOne(+id);
  }

  @ApiBody({ type: CreateDeclarationDto })
  @ApiParam({ name: 'id', example: '1', description: 'Declaration id' })
  @ApiOkResponse({ type: CreateDeclarationDto, isArray: true, description: 'Updated declaration' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeclarationDto: UpdateDeclarationDto) {
    return this.declarationService.update(+id, updateDeclarationDto);
  }

  @ApiParam({ name: 'id', example: '1', description: 'Declaration id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.declarationService.delete(+id);
  }
}
