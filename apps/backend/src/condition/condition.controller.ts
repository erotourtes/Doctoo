import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { CreateConditionDto } from './dto/create.dto';
import { UpdateConditionDto } from './dto/update.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseCondtionDto } from './dto/response.dto';

@ApiTags('condition')
@Controller('condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @ApiBody({ type: CreateConditionDto })
  @ApiOkResponse({ type: ResponseCondtionDto, description: 'Condition created' })
  @Post()
  create(@Body() body: CreateConditionDto) {
    return this.conditionService.createCondition(body);
  }

  @ApiOkResponse({ type: ResponseCondtionDto, isArray: true, description: 'Return conditions list' })
  @Get()
  findAll() {
    return this.conditionService.findAllConditions();
  }

  @ApiOkResponse({ type: ResponseCondtionDto, description: 'Return condition by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionService.findCondition(id);
  }

  @ApiBody({ type: UpdateConditionDto })
  @ApiOkResponse({ type: ResponseCondtionDto, description: 'Condition updated' })
  @ApiParam({ name: 'id', description: 'Condition id', example: '1' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateConditionDto) {
    return this.conditionService.updateCondition(id, body);
  }

  @ApiOkResponse({ type: ResponseCondtionDto, description: 'Condition deleted' })
  @ApiParam({ name: 'id', description: 'Condition id', example: '1' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conditionService.removeCondition(id);
  }
}
