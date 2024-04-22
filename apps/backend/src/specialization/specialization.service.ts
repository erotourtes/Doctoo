import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseSpecializationDto } from './dto/response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateSpecializationDto } from './dto/update.dto';

@Injectable()
export class SpecializationService {
  constructor(private prismaService: PrismaService) {}
  async createSpecialization(dto: CreateSpecializationDto): Promise<ResponseSpecializationDto> {
    const specialization = await this.prismaService.specialization.create({ data: dto });
    return plainToInstance(ResponseSpecializationDto, specialization);
  }

  async getSpecializations(): Promise<ResponseSpecializationDto[]> {
    const specializations = await this.prismaService.specialization.findMany();
    return plainToInstance(ResponseSpecializationDto, specializations);
  }

  async getSpecialization(id: string): Promise<ResponseSpecializationDto> {
    const specialization = await this.prismaService.specialization.findUnique({ where: { id } });
    if (!specialization) throw new NotFoundException({ message: `Specialization with id ${id} does not exist` });
    return plainToInstance(ResponseSpecializationDto, specialization);
  }

  async updateSpecialization(id: string, dto: UpdateSpecializationDto): Promise<ResponseSpecializationDto> {
    const specialization = await this.getSpecialization(id);
    const updatedSpecialization = await this.prismaService.specialization.update({
      where: { id: specialization.id },
      data: dto,
    });
    return plainToInstance(ResponseSpecializationDto, updatedSpecialization);
  }

  async deleteSpecialization(id: string) {
    const specialization = await this.getSpecialization(id);

    await this.prismaService.specialization.delete({ where: { id: specialization.id } });
  }
}
