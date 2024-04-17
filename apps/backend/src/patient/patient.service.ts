import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPatient(id: string): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.findUnique({ where: { id } });

    return patient;
  }

  async createPatient(body: CreatePatientDto): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.create({ data: body });

    return patient;
  }

  async pathPatient(id: string, body: PatchPatientDto): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.update({ where: { id }, data: body });

    return patient;
  }

  async deletePatient(id: string) {
    await this.prismaService.patient.delete({ where: { id } });
  }
}
