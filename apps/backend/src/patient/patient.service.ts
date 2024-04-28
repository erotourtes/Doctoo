import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';
import { ResponseAllergyDto } from './dto/responseAllergy.dto';
import { ResponsePatientAllergyDto } from './dto/responsePatientAllergy.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async isPatientByIdExists(id: string): Promise<boolean> {
    const pattient = await this.prismaService.patient.findUnique({ where: { id } });

    if (!pattient) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }

  async isPatientByUserIdExists(userId: string): Promise<boolean> {
    const patient = await this.prismaService.patient.findFirst({ where: { user: { id: userId } } });

    if (!patient) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }

  async getPatient(id: string): Promise<ResponsePatientDto> {
    await this.isPatientByIdExists(id);

    const patient = await this.prismaService.patient.findUnique({ where: { id } });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async getPatientByUserId(userId: string): Promise<ResponsePatientDto> {
    await this.isPatientByUserIdExists(userId);

    // TODO: only 1 patient for user
    const patient = await this.prismaService.patient.findFirst({ where: { user: { id: userId } } });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async createPatient(body: CreatePatientDto): Promise<ResponsePatientDto> {
    await this.isPatientByUserIdExists(body.userId);

    const patient = await this.prismaService.patient.create({ data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async patchPatient(id: string, body: PatchPatientDto): Promise<ResponsePatientDto> {
    await this.isPatientByIdExists(id);

    const patient = await this.prismaService.patient.update({ where: { id }, data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async createPatientAllergy(id: string, allergyId: string): Promise<ResponsePatientAllergyDto> {
    const isPatientAlreadyHaveAllergy = await this.prismaService.patientAllergy.findUnique({
      where: { id, allergyId },
    });

    if (isPatientAlreadyHaveAllergy) throw new BadRequestException('Patient with this Id already have this allergy.');

    const allergy = await this.prismaService.patientAllergy.create({ data: { patientId: id, allergyId } });

    return plainToInstance(ResponsePatientAllergyDto, allergy);
  }

  async getPatientAllergies(id: string): Promise<ResponseAllergyDto[]> {
    await this.isPatientByIdExists(id);

    const rawAllergies = await this.prismaService.patientAllergy.findMany({
      where: { patientId: id },
      select: { allergy: { select: { name: true, id: true } } },
    });

    const allergies = rawAllergies.map(record => record.allergy);

    return plainToInstance(ResponseAllergyDto, allergies);
  }

  async deletePatient(id: string): Promise<void> {
    await this.isPatientByIdExists(id);

    await this.prismaService.patient.delete({ where: { id } });
  }
}
