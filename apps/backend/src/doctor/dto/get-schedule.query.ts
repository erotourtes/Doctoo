import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDoctorScheduleQuery {
  @ApiPropertyOptional({ required: false, description: 'Date to get unavailable time slots for.' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly date?: Date;

  @ApiPropertyOptional({ required: false, description: 'Date to get unavailable time slots starting from.' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly fromDate?: Date;

  @ApiPropertyOptional({ required: false, description: 'Date to get unavailable time slots starting until.' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly toDate?: Date;
}
