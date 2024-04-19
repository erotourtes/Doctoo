import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { PrismaService } from '../prisma.service';
import { plainToInstance } from 'class-transformer';
import { HospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async createHospital(createHospitalDto: CreateHospitalDto) {
    const createdHospiital = await this.prisma.hospital.create({ data: createHospitalDto });
    return plainToInstance(HospitalDto, createdHospiital);
  }

  async findManyHospitals() {
    const hospitals = this.prisma.hospital.findMany();
    return plainToInstance(HospitalDto, hospitals);
  }

  async findHospitalById(id: string) {
    const hospital = await this.prisma.hospital.findUnique({ where: { id } });
    if (!hospital) throw new NotFoundException({ message: `Hospital with id ${id} does not exist` });
    return plainToInstance(HospitalDto, hospital);
  }

  async updateHospital(id: string, updateHospitalDto: UpdateHospitalDto) {
    const hospital = await this.findHospitalById(id);
    const updatedHospital = await this.prisma.hospital.update({
      where: { id: hospital.id },
      data: updateHospitalDto,
    });
    return plainToInstance(HospitalDto, updatedHospital);
  }

  async deleteHospital(id: string) {
    const hospital = await this.findHospitalById(id);
    const deleteResult = await this.prisma.hospital.delete({ where: { id: hospital.id } });
    if (!deleteResult)
      throw new InternalServerErrorException({
        message: `Something went wrong during deleting hospital with id ${id}`,
      });
    return { message: `Hospital with id ${id} was deleted successfully` };
  }
}
