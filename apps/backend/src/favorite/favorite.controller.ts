import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get('all-by-user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.favoriteService.findAllByPatientId(id);
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.favoriteService.findOneById(id);
  }

  @Delete(':id')
  deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
