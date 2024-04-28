import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { Expose, Transform, plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ResponseDoctorDto } from 'src/doctor/dto/response.dto';

export class ResponseAppointmentDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique appointment id.' })
  id: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  patientId: string;

  @ApiProperty({ example: new Date(), description: 'The date on which the meeting is scheduled.' })
  assignedAt: Date;

  @ApiProperty({ enum: AppointmentStatus, description: 'Current status of the appointment.' })
  status: AppointmentStatus;

  @ApiProperty({
    example: 'Get some blood pressure pills.',
    description: 'Additional comments left by the patient or doctor.',
  })
  notes: string;

  @ApiProperty({ example: randomUUID(), description: 'The unique id of the billed payment.' })
  paymentInvoiceKey: string;

  @ApiProperty({ description: 'The unique id from the receipt file for the appointment.' })
  paymentReceiptKey?: string;

  @ApiProperty({ example: `${randomUUID()}.mp4`, description: 'The unique id of the video chat recording.' })
  videoRecordKey: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'The time when the appointment should start.' })
  readonly startedAt: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'The time when the appointment should end.' })
  readonly endedAt: string;

  @Expose()
  @Transform(({ value }) => plainToInstance(ResponseDoctorDto, value))
  doctor?: ResponseDoctorDto;
}
