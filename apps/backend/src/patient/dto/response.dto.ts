import { BloodType, Gender } from '@prisma/client';

export class ResponsePatientDto {
  readonly id: string;
  readonly user_id: string;
  readonly weight: number;
  readonly height: number;
  readonly age: number;
  readonly blood_type: BloodType;
  readonly gender: Gender;
  readonly declaration_id: number;
  readonly identity_card_key: string;
  readonly country: string;
  readonly state?: string;
  readonly city: string;
  readonly street: string;
  readonly apartment?: string;
  readonly zip_zode?: number;
}
