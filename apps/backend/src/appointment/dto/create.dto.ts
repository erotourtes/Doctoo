import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'The ID of the doctor the appointment is created with' })
  @IsNotEmpty()
  readonly doctorId: string;

  @ApiProperty({ description: 'The ID of the patient who created the appointment' })
  @IsNotEmpty()
  readonly patientId: string;

  @IsISO8601({ strict: true }, { message: 'assignedAt must be a valid ISO8601 date' })

  @ApiProperty({
    type: 'Date string in ISO8601 format',
    description: 'The date and time of the appointment in ISO8601 fromat',
  })
  @IsNotEmpty()
  assignedAt: string;

  @ApiProperty({ enum: AppointmentStatus, description: 'The status of the appointment' })
  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @ApiProperty({ description: 'Notes for the appointment' })
  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsString({ message: 'Invoice key must be a string' })
  readonly paymentInvoiceKey: string;

  @IsString({ message: 'Receipt key must be a string' })
  readonly paymentReceiptKey: string;
}
