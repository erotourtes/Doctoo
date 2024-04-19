import { Adress, BloodType, Gender } from '@prisma/client';

export class ResponsePatientDto {
  readonly id: string;
  readonly userId: string;
  readonly weight: number;
  readonly height: number;
  readonly age: number;
  readonly bloodType: BloodType;
  readonly gender: Gender;
  readonly identityCardKey: string;
  readonly adress: Adress; // TODO: Use adress DTO instead of Prisma model
}
