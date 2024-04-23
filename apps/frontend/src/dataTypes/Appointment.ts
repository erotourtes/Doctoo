import type { IDoctor } from './Doctor';

export enum AppointmentStatus {
  PLANNED = 'Planned',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface IAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  notes: string;
  status: AppointmentStatus;
  videoRecordKey: string;
  paymentInvoiceKey: string;
  paymentReceiptKey: string;
}

export interface IPlanedAppointment {
  id: string;
  date: string;
  notes: string;
  doctor: IDoctor;
}
