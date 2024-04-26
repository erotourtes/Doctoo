import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, plainToInstance } from 'class-transformer';
import { DoctorSpecialization, HospitalDoctor, User } from '@prisma/client';
import { ResponseHospitalDto } from '../../hospital/dto/response.dto';
import { ResponseSpecializationDto } from '../../specialization/dto/response.dto';

export class ResponseDoctorDto {
  @ApiProperty({ description: 'The ID of the doctor', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  id: string;

  @ApiProperty({ description: 'The pay rate of the doctor', example: 100 })
  payrate: number;

  @ApiProperty({
    description: 'About section of the doctor',
    example: 'Experienced doctor with a focus on patient care',
  })
  about: string;

  @Exclude()
  userId: string;

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

  @Expose()
  // TODO: extract into separate function/decorator
  @Transform(({ value }) =>
    value
      ? value.map((h: { hospital: HospitalDoctor }) => plainToInstance(ResponseHospitalDto, { ...h.hospital }))
      : undefined,
  )
  @ApiProperty({
    description: 'An array of hospitals associated with the doctor',
    type: ResponseHospitalDto,
    isArray: true,
  })
  readonly hospitals: ResponseHospitalDto[];

  @Expose()
  @Transform(({ value }) =>
    value
      ? value.map((h: { specialization: DoctorSpecialization }) =>
          plainToInstance(ResponseSpecializationDto, { ...h.specialization }),
        )
      : undefined,
  )
  @ApiProperty({
    description: 'An array of specializations of the doctor',
    type: ResponseSpecializationDto,
    isArray: true,
  })
  readonly specializations: ResponseSpecializationDto[];
}
