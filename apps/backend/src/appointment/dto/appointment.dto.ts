import { AppointmentStatus } from '@prisma/client';

export class AppointmentDto {
  id: string;
  doctor_id: string;
  patient_id: string;
  date: Date;
  notes: string;
  status: AppointmentStatus;
  video_key: string;
  invoice_key: string;
  receipt_key: string;
}
