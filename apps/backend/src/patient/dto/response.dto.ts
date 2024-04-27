import { BloodType, Gender, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class ResponsePatientDto {
  @ApiProperty({ description: 'The ID of the patient' })
  readonly id: string;

  @ApiProperty({ description: 'The ID of the user associated with the patient' })
  readonly userId: string;

  @ApiProperty({ description: 'The weight of the patient' })
  readonly weight: number;

  @ApiProperty({ description: 'The height of the patient' })
  readonly height: number;

  @ApiProperty({ description: 'The age of the patient' })
  readonly age: number;

  @ApiProperty({ description: 'The blood type of the patient', type: 'enum', enum: BloodType })
  readonly bloodType: BloodType;

  @ApiProperty({ description: 'The gender of the patient', type: 'enum', enum: Gender })
  readonly gender: Gender;

  @ApiProperty({ description: 'The identity card key of the patient' })
  readonly identityCardKey: string;

  @ApiProperty({ description: 'The country of residence of the patient' })
  readonly country: string;

  @ApiProperty({ description: 'The state of residence of the patient', required: false })
  readonly state?: string;

  @ApiProperty({ description: 'The city of residence of the patient' })
  readonly city: string;

  @ApiProperty({ description: 'The street address of the patient' })
  readonly street: string;

  @ApiProperty({ description: 'The apartment number of the patient', required: false })
  readonly apartment?: string;

  @ApiProperty({ description: 'The zip code of the patient', required: false })
  readonly zipCode?: number;

  @ApiProperty({ description: 'The email notification toggle of the patient' })
  emailNotificationToggle: boolean;

  @ApiProperty({ description: 'The two factor authentication toggle of the patient' })
  requestBillPaymentApproval: boolean;

  @ApiProperty({ description: 'The two factor authentication toggle of the patient' })
  twoFactorAuthToggle: boolean;

  @Expose()
  @Transform(({ obj }) => obj.user && obj.user.firstName)
  @ApiProperty({
    description: 'First name of the doctor',
    example: 'John',
  })
  readonly firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.user && obj.user.lastName)
  @ApiProperty({
    description: 'Last name of the doctor',
    example: 'Doe',
  })
  readonly lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.user && obj.user.avatarKey)
  @ApiProperty({
    description: 'Key of the avatar of the doctor',
    example: 'acde070d-8c4c-4f0d-9d8a-162843c10333.jpg',
  })
  readonly avatarKey: string;

  @Expose()
  @Transform(({ obj }) => obj.user && obj.user.phone)
  @ApiProperty({
    description: 'The phone of the doctor',
    example: '+38099561735634',
  })
  readonly phone: string;

  @Expose()
  @Transform(({ obj }) => obj.user && obj.user.email)
  @ApiProperty({
    description: 'Email of the doctor',
    example: 'johndoe@mail.com',
  })
  readonly email: string;

  @Exclude()
  readonly user: User;
}
