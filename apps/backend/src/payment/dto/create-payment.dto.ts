import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The appointment duration in hour', example: 1 })
  readonly appointmentDuration: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'The price per hour', example: 50 })
  readonly pricePerHour: number;
}
