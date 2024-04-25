import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateDeclarationDto {
  @ApiProperty({ example: randomUUID(), description: 'Doctor Id' })
  @IsNotEmpty()
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Patient Id' })
  @IsNotEmpty()
  readonly patientId: string;
}
