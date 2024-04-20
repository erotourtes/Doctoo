import { AppointmentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  readonly doctorId: string;

  @IsNotEmpty()
  readonly patientId: string;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @IsString()
  notes: string;

  @IsString()
  assignedAt: string;

  @IsNotEmpty()
  @IsString({ message: 'Invoice key must be a string' })
  readonly paymentInvoiceKey: string;

  @IsString({ message: 'Receipt key must be a string' })
  readonly paymentReceiptKey: string;
}
