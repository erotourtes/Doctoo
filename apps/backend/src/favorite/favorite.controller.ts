import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse } from '../../utils/errorResponses';

@ApiTags('Favorites')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({
    summary: 'Add a doctor to favorites',
    description: 'This endpoint addes a doctor to favorites list.',
  })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiCreatedResponse({ description: 'Doctor is added to favorite doctors.' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @ApiOperation({
    summary: 'Get favorite doctors by patient ID',
    description: 'This endpoint retrieves favorite doctors by patient ID.',
  })
  @ApiParam({ name: 'id', description: 'Patient ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ description: 'Favorite doctors by patient ID' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get('all-by-user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.favoriteService.findAllByPatientId(id);
  }

  @ApiOperation({
    summary: 'Get a favorite doctor by ID',
    description: 'This endpoint retrieves a favorite doctor by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ description: 'Favorite doctor by ID exists' })
  @ApiNotFoundResponse({ type: NotFoundResponse, description: 'Favorite doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.favoriteService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Remove the doctor from favorites',
    description: 'This endpoint deletes a doctor from favorite doctors.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'Doctor removed from favorites' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete(':id')
  deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
