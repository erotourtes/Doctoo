import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = await this.prismaService.favorite.create({ data: createFavoriteDto });
    return favorite;
  }

  async findAllByPatientId(id: string) {
    const favorites = await this.prismaService.favorite.findMany(
      { 
        where: { patient_id: id },
        include: {doctor: true},
    }
    );

    return favorites;
  }

  async findOneById(id: string) {
    const favorites = await this.prismaService.favorite.findUnique(
      { 
        where: { id: id },
        include: {doctor: true},
    }
    );

    return favorites;
  }

  async deleteFavorite(id: string) {
     return await this.prismaService.favorite.delete({ where: { id } });
  }
}
