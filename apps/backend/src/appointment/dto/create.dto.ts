import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { IsEnum, IsISO8601, IsOptional, IsUUID } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';
import { randomUUID } from 'crypto';

export class CreateAppointmentDto {
  @IsUUID(4)
  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  @IsNotEmptyString()
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  @IsUUID(4)
  @IsNotEmptyString()
  readonly patientId: string;

  @ApiProperty({ example: new Date(), description: 'The date on which the meeting is scheduled.' })
  @IsNotEmptyString()
  @IsISO8601({ strict: true })
  assignedAt: string;

  @ApiProperty({
    enum: AppointmentStatus,
    example: AppointmentStatus.PLANNED,
    description: 'Current status of the appointment.',
  })
  @IsEnum(AppointmentStatus)
  readonly status: AppointmentStatus;

  @ApiPropertyOptional({
    example: 'Get some blood pressure pills.',
    description: 'Additional comments left by the patient or doctor.',
  })
  @IsOptional()
  @IsNotEmptyString()
  notes: string;

  @ApiPropertyOptional({ example: randomUUID(), description: 'The unique Id of the billed payment.' })
  @IsOptional()
  @IsNotEmptyString()
  @IsUUID(4)
  readonly paymentInvoiceKey: string;

  @ApiPropertyOptional({ example: randomUUID(), description: 'The unique id of the payment receipt.' })
  @IsOptional()
  @IsNotEmptyString()
  @IsUUID(4)
  readonly paymentReceiptKey: string;

  @ApiPropertyOptional({ description: 'The date and time the appointment started' })
  @IsOptional()
  @IsISO8601({ strict: true })
  @IsNotEmptyString()
  readonly startedAt?: string;

  @ApiPropertyOptional({ description: 'The date and time the appointment ended' })
  @IsOptional()
  @IsISO8601({ strict: true })
  @IsNotEmptyString()
  readonly endedAt?: string;
}
