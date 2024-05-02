import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  readonly appointmentDuration: number;

  @IsNotEmpty()
  readonly pricePerHour: number;
}
