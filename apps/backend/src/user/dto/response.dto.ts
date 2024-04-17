import { Doctor, Patient } from '@prisma/client';

export class ResponseUserDto {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly phone: string;
  readonly email: string;
  readonly email_verified: boolean;
  readonly password: string;
  readonly google_id: string;
  readonly avatar_key: string;
  readonly doctors: Doctor[]; // TODO: Use Doctor dto instead of prisma model.
  readonly patients: Patient[]; // TODO: use Patient dto instead of prisma model.
}
