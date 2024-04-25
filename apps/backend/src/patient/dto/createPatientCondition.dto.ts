import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePatientConditionDto {
  @IsString()
  @ApiProperty({ description: 'Id of condition' })
  readonly connditionId: string;
}
