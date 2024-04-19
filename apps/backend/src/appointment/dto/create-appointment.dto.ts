import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsNotEmpty()
  readonly doctor_id: string;

  @IsNotEmpty()
  readonly patient_id: string;

  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @IsString()
  notes: string;

  @IsOptional()
  @IsString({ message: 'Video key must be a string' })
  readonly video_key?: string;

  @IsNotEmpty()
  @IsString({ message: 'Invoice key must be a string' })
  readonly invoice_key: string;

  @IsString({ message: 'Receipt key must be a string' })
  readonly receipt_key: string;
}
