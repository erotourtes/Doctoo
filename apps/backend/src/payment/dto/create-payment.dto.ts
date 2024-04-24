import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreatePaymentDto {
  @IsNotEmptyString()
  readonly userId: string;

  @IsNotEmptyString()
  readonly doctorId: string;

  @IsNotEmpty()
  @Type(() => Date)
  readonly date: Date;

  @IsNotEmpty()
  readonly appointmentDuration: number;

  @IsNotEmpty()
  readonly pricePerHour: number;
}
