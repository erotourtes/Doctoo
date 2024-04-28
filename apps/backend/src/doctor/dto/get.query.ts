import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class GetDoctorsQuery {
  @ApiProperty({ required: false, description: 'ID of the hospital to filter doctors by' })
  @IsOptional()
  @IsUUID(4, { message: 'hospitalId should be a UUID' })
  readonly hospitalId?: string;

  @ApiProperty({ required: false, description: 'ID of the specialization to filter doctors by' })
  @IsOptional()
  @IsUUID(4, { message: 'specializationId should be a UUID' })
  readonly specializationId?: string;

  @ApiProperty({ required: false, description: 'Search string' })
  @IsOptional()
  @IsNotEmptyString()
  readonly search?: string;
}
