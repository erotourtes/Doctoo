import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { CreateFavoriteDto } from './dto/create.dto';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorite')
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
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Post()
  createFavorite(@Body() body: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(body);
  }

  @ApiOperation({
    summary: 'Get favorite doctors',
    description: 'This endpoint retrieves favorite doctors.',
  })
  @ApiOkResponse({ description: 'Favorite doctors' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get()
  getFavorites() {
    return this.favoriteService.getFavorites();
  }

  @ApiOperation({
    summary: 'Get a favorite doctor by ID',
    description: 'This endpoint retrieves a favorite doctor by ID.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiOkResponse({ description: 'Favorite doctor by ID exists' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Favorite doctor not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Get('/:id')
  getFovorite(@Param('id') id: string) {
    return this.favoriteService.getFavorite(id);
  }

  @ApiOperation({
    summary: 'Remove the doctor from favorites',
    description: 'This endpoint deletes a doctor from favorite doctors.',
  })
  @ApiParam({ name: 'id', description: 'Doctor ID', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @ApiNoContentResponse({ description: 'Doctor removed from favorites' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: 'Internal server error' })
  @Delete(':id')
  deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
