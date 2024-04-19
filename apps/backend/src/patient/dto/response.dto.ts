import { BloodType, Gender } from '@prisma/client';

export class ResponsePatientDto {
  readonly id: string;
  readonly userId: string;
  readonly weight: number;
  readonly height: number;
  readonly age: number;
  readonly bloodType: BloodType;
  readonly gender: Gender;
  readonly identityCardKey: string;
  readonly country: string;
  readonly state?: string;
  readonly city: string;
  readonly street: string;
  readonly apartment?: string;
  readonly zipCode?: number;
}
