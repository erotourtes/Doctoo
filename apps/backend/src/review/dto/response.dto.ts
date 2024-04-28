import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponseReviewDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique rating id.' })
  id: string;

  @ApiProperty({ example: 4, description: 'The rate in review.' })
  rate: number;

  @ApiProperty({ example: 'Experienced doctor with a focus on patient care.', description: 'Text in review.' })
  text: string | null;

  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  doctorId: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'The date when the review was created.' })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: 'The date when the review was updated.' })
  updatedAt: Date;
}
