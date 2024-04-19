import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  createFavorite(@Body() body: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(body);
  }

  @Get()
  getFavorites() {
    return this.favoriteService.getFavorites();
  }

  @Get('/:id')
  getFovorite(@Param('id') id: string) {
    return this.favoriteService.getFavorite(id);
  }

  @Delete(':id')
  deleteFavorite(@Param('id') id: string) {
    return this.favoriteService.deleteFavorite(id);
  }
}
