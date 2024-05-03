import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'How long appointment has been.' })
  @IsNotEmpty()
  readonly appointmentDuration: number;

  @ApiProperty({ example: 200, description: 'Doctor hourly payrate.' })
  @IsNotEmpty()
  readonly pricePerHour: number;
}
