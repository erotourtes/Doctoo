import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';

export class ResponseAppointmentDto {
  @ApiProperty({ description: 'The ID of the appointment' })
  id: string;

  @ApiProperty({ description: 'The ID of the doctor the appointment is created with' })
  doctorId: string;

  @ApiProperty({ description: 'The ID of the patient who created the appointment' })
  patientId: string;
   
  @ApiProperty({ description: 'assingedAt for the appointment' })
  @IsNotEmpty()
  assignedAt: Date;

  @ApiProperty({ description: 'Notes for the appointment' })
  notes: string;

  @ApiProperty({ enum: AppointmentStatus, description: 'The status of the appointment' })
  status: AppointmentStatus;

  @ApiProperty({ description: 'The key of the video record of the appointment' })
  videoRecordKey: string;

  @ApiProperty({ description: 'The key of the file with the invoice for the appointment' })
  paymentInvoiceKey: string;

  @ApiProperty({ description: 'The key of the file with the receipt for payment for the appointment' })
  paymentReceiptKey: string;
}
