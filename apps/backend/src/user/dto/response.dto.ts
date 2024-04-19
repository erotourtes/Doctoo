import { Doctor, Patient } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ResponseUserDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;

  @Exclude()
  readonly password: string;

  readonly emailVerified: boolean;
  readonly googleId: string;
  readonly avatarKey: string;
  readonly doctors: Doctor[]; // TODO: Use Doctor dto instead of prisma model.
  readonly patients: Patient[]; // TODO: use Patient dto instead of prisma model.
}
