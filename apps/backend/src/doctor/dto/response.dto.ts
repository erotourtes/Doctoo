import { ApiProperty } from '@nestjs/swagger';

export class ResponseDoctorDto {
  @ApiProperty({ description: 'The ID of the doctor',  example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  id: string;

  @ApiProperty({ description: 'The pay rate of the doctor', example: 100 })
  payrate: number;

  @ApiProperty({
    description: 'About section of the doctor',
    example: 'Experienced doctor with a focus on patient care',
  })
  about: string;

  @ApiProperty({ description: 'The ID of the user associated with the doctor', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  userId: string;
}
