import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { IsEnum, IsISO8601, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateAppointmentDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  @IsUUID(4)
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  @IsUUID(4)
  readonly patientId: string;

  @ApiProperty({ example: new Date(), description: 'The date on which the meeting is scheduled.' })
  @IsISO8601({ strict: true })
  assignedAt: string;

  @ApiProperty({
    enum: AppointmentStatus,
    example: AppointmentStatus.PLANNED,
    description: 'Current status of the appointment.',
  })
  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @ApiProperty({
    example: 'Get some blood pressure pills.',
    description: 'Additional comments left by the patient or doctor.',
  })
  @IsOptional()
  @IsNotEmptyString()
  notes: string;

  @ApiProperty({ example: randomUUID(), description: 'The unique id of the billed payment.' })
  @IsUUID(4)
  readonly paymentInvoiceKey: string;

  @ApiProperty({ example: randomUUID(), description: 'The unique id from the receipt file for the appointment.' })
  @IsUUID(4)
  readonly paymentReceiptKey: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'The time when the appointment should start.' })
  @IsOptional()
  @IsISO8601({ strict: true })
  readonly startedAt: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'The time when the appointment should end.' })
  @IsOptional()
  @IsISO8601({ strict: true })
  readonly endedAt: string;
}
