import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';
import { RatingStatusFilters } from './RatingStatusFilters';
import { Type } from 'class-transformer';

export class GetDoctorsQuery {
  @ApiPropertyOptional({ required: false, description: 'ID of the hospital to filter doctors by' })
  @IsOptional()
  @IsUUID(4, { message: 'hospitalId should be a UUID' })
  readonly hospitalId?: string;

  @ApiPropertyOptional({ required: false, description: 'Status to filter doctors by', type: RatingStatusFilters })
  @IsOptional()
  @IsEnum(RatingStatusFilters)
  readonly status?: RatingStatusFilters;

  @ApiPropertyOptional({ required: false, description: 'ID of the specialization to filter doctors by' })
  @IsOptional()
  @IsUUID(4, { message: 'specializationId should be a UUID' })
  readonly specializationId?: string;

  @ApiPropertyOptional({ required: false, description: 'Search string' })
  @IsOptional()
  @IsNotEmptyString()
  readonly search?: string;

  @ApiPropertyOptional({ required: false, description: 'Page number' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly page?: number;

  @ApiPropertyOptional({ required: false, description: 'Items per page count' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly itemsPerPage?: number;
}
