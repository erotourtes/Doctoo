import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'The ID of the doctor the appointment is created with' })
  @IsNotEmpty()
  readonly doctorId: string;

  @ApiProperty({ description: 'The ID of the patient who created the appointment' })
  @IsNotEmpty()
  readonly patientId: string;

  @ApiProperty({
    type: 'Date string in ISO8601 format',
    description: 'The date and time of the appointment in ISO8601 fromat',
  })
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ enum: AppointmentStatus, description: 'The status of the appointment' })
  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @ApiProperty({ description: 'Notes for the appointment' })
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
