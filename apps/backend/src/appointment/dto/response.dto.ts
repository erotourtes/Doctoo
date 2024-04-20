import { AppointmentStatus } from '@prisma/client';

export class ResponseAppointmentDto {
  id: string;
  doctorId: string;
  patientId: string;
  date: Date;
  notes: string;
  status: AppointmentStatus;
  videoRecordKey: string;
  paymentInvoiceKey: string;
  paymentReceiptKey: string;
}
