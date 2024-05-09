import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from 'src/utils/BadRequestResponse';
import { ClassicNestResponse } from 'src/utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { ConditionService } from './condition.service';
import { CreateConditionDto } from './dto/create.dto';
import { ResponseCondtionDto } from './dto/response.dto';
import { UpdateConditionDto } from './dto/update.dto';

@ApiTags('Condition Endpoints')
@Controller('condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new condition' })
  @ApiOkResponse({ type: ResponseCondtionDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateConditionDto })
  create(@Body() body: CreateConditionDto) {
    return this.conditionService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all conditions' })
  @ApiOkResponse({ type: ResponseCondtionDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getConditions() {
    return this.conditionService.getConditions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a condition by ID' })
  @ApiOkResponse({ type: ResponseCondtionDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', description: 'Unique condition id.', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  getCondition(@Param('id') id: string) {
    return this.conditionService.getCondition(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a condition' })
  @ApiOkResponse({ type: ResponseCondtionDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', description: 'Unique condition id.', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiBody({ type: UpdateConditionDto })
  patch(@Param('id') id: string, @Body() body: UpdateConditionDto) {
    return this.conditionService.patch(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a condition' })
  @ApiOkResponse({ type: ResponseCondtionDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', description: 'Unique condition id.', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  delete(@Param('id') id: string) {
    return this.conditionService.delete(id);
  }
}
