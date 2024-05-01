import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create.dto';
import { ResponseFavoriteDto } from './dto/response.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async isFavoriteExists(id: string): Promise<boolean> {
    const favorite = await this.prismaService.favorite.findUnique({ where: { id } });

    if (!favorite) throw new NotFoundException('A favorite with this Id not found.');

    return true;
  }

  async createFavorite(patientId: string, body: CreateFavoriteDto): Promise<ResponseFavoriteDto> {
    const favorite = await this.prismaService.favorite.create({
      data: { doctor: { connect: { id: body.doctorId } }, patient: { connect: { id: patientId } } },
    });

    return plainToInstance(ResponseFavoriteDto, favorite);
  }

  async getFavorites(patientId: string): Promise<ResponseFavoriteDto[]> {
    const favorites = await this.prismaService.favorite.findMany({ where: { patient: { id: patientId } } });

    return plainToInstance(ResponseFavoriteDto, favorites);
  }

  async getFavorite(id: string): Promise<ResponseFavoriteDto> {
    await this.isFavoriteExists(id);

    const favorite = await this.prismaService.favorite.findUnique({ where: { id } });

    return plainToInstance(ResponseFavoriteDto, favorite);
  }

  async deleteFavorite(patientId: string, doctorId: string): Promise<void> {
    await this.prismaService.favorite.deleteMany({ where: { patient: { id: patientId }, doctor: { id: doctorId } } });
  }
}
