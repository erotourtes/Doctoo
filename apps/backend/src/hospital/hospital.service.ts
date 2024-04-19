import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHospitalDto } from './dto/create.dto';
import { PatchHospitalDto } from './dto/patch.dto';
import { ResponseHospitalDto } from './dto/response.dto';

@Injectable()
export class HospitalService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHospital(body: CreateHospitalDto): Promise<ResponseHospitalDto> {
    const { adress, ...data } = body;

    const { id } = await this.prismaService.adress.create({ data: adress });

    const hospital = await this.prismaService.hospital.create({ data: { ...data, adressId: id } });

    return plainToInstance(ResponseHospitalDto, hospital);
  }

  async getHospitals(): Promise<ResponseHospitalDto[]> {
    const hospitals = this.prismaService.hospital.findMany();

    return plainToInstance(Array<ResponseHospitalDto>, hospitals);
  }

  async getHospital(id: string): Promise<ResponseHospitalDto> {
    const hospital = await this.prismaService.hospital.findUnique({ where: { id } });

    if (!hospital) throw new NotFoundException({ message: `Hospital with id ${id} does not exist` });

    return plainToInstance(ResponseHospitalDto, hospital);
  }

  async patchHospital(id: string, body: PatchHospitalDto): Promise<ResponseHospitalDto> {
    const hospital = await this.getHospital(id);

    const patchedHospital = await this.prismaService.hospital.update({
      where: { id: hospital.id },
      data: body,
    });

    return plainToInstance(ResponseHospitalDto, patchedHospital);
  }

  async deleteHospital(id: string) {
    const hospital = await this.getHospital(id);

    await this.prismaService.hospital.delete({ where: { id: hospital.id } });
  }
}
