import { ApiProperty } from '@nestjs/swagger';

export class ResponseReviewDto {
  @ApiProperty({ description: 'The ID of the review', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  id: string;

  @ApiProperty({ description: 'The rate in review', example: 4 })
  rate: number;

  @ApiProperty({
    description: 'Text in review',
    example: 'Experienced doctor with a focus on patient care',
  })
  text: string | null;

  @ApiProperty({
    description: 'The ID of the doctor',
    example: 'acde070d-8c4c-4f0d-9d8a-162843c10333',
  })
  doctorId: string;

  @ApiProperty({
    description: 'The date and time when the review was created',
    example: '2023-03-16T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the review was last updated',
    example: '2023-03-16T12:00:00.000Z',
  })
  updatedAt: Date;
}

export class ResponseReviewDtoWithNames {
  @ApiProperty({ description: 'The ID of the review', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  id: string;

  @ApiProperty({ description: 'The rate in review', example: 4 })
  rate: number;

  @ApiProperty({
    description: 'Text in review',
    example: 'Experienced doctor with a focus on patient care',
  })
  text: string | null;

  @ApiProperty({
    description: 'The ID of the doctor',
    example: 'acde070d-8c4c-4f0d-9d8a-162843c10333',
  })
  doctorId: string;

  @ApiProperty({
    description: 'The names of the doctor, when icnludesName=true',
    required: false,
    example: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
  })
  doctor?: {
    user: {
      firstName: string;
      lastName: string;
    };
  };

  @ApiProperty({
    description: 'The names of the patient, when icnludesName=true',
    required: false,
    example: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
  })
  patient?: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export class AvgRateResponse {
  @ApiProperty({
    description: 'The average rating',
    example: 4.5,
  })
  avg: number;

  @ApiProperty({
    description: 'The number of reviews',
    example: 10,
  })
  count: number;
}
