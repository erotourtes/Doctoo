import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFavorite(body: CreateFavoriteDto) {
    const favorite = await this.prismaService.favorite.create({ data: body });

    return favorite;
  }

  async getFavorites() {
    // TODO use authorized object from request.
    const favorites = await this.prismaService.favorite.findMany({ include: { doctor: true } });

    return favorites;
  }

  async getFavorite(id: string) {
    const favorite = await this.prismaService.favorite.findUnique({ where: { id: id }, include: { doctor: true } });

    return favorite;
  }

  async deleteFavorite(id: string) {
    await this.prismaService.favorite.delete({ where: { id } });
  }
}
