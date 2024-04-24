import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPatient(id: string): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.findUnique({ where: { id } });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async getPatientByUserId(userId: string): Promise<ResponsePatientDto> {
    // TODO: only 1 patient for user
    const patient = await this.prismaService.patient.findFirst({
      where: { user: { id: userId } },
    });

    return plainToInstance(ResponsePatientDto, patient);
  }

  // TODO: Does we really need to add adress immediatly?
  async createPatient(body: CreatePatientDto): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.create({ data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async patchPatient(id: string, body: PatchPatientDto): Promise<ResponsePatientDto> {
    const patient = await this.prismaService.patient.update({ where: { id }, data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async deletePatient(id: string) {
    await this.prismaService.patient.delete({ where: { id } });
  }
}
