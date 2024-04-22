import { AppointmentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  readonly doctorId: string;

  @IsNotEmpty()
  readonly patientId: string;

  @IsISO8601({ strict: true }, { message: 'assignedAt must be a valid ISO8601 date' })
  @IsNotEmpty()
  assignedAt: string;

  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsString({ message: 'Invoice key must be a string' })
  readonly paymentInvoiceKey: string;

  @IsString({ message: 'Receipt key must be a string' })
  readonly paymentReceiptKey: string;
}
