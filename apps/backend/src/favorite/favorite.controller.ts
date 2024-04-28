import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { CreateFavoriteDto } from './dto/create.dto';
import { ResponseFavoriteDto } from './dto/response.dto';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorite Endpoints')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({ summary: 'Create favorite' })
  @ApiOkResponse({ type: ResponseFavoriteDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateFavoriteDto })
  createFavorite(@Body() body: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get favorites' })
  @ApiOkResponse({ type: ResponseFavoriteDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getFavorites() {
    return this.favoriteService.getFavorites();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get favorite' })
  @ApiOkResponse({ type: ResponseFavoriteDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' }) // TODO: doctor id??
  getFovorite(@Param('id') id: string) {
    return this.favoriteService.getFavorite(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete favorite' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' })
  deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
