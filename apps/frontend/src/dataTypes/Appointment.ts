import type { IDoctor } from './Doctor';
import type { TPatient } from './Patient';

export enum AppointmentStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PLANNED = 'PLANNED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface IAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  createdAt: string;
  notes: string;
  status?: AppointmentStatus | any;
  videoRecordKey: string;
  paymentInvoiceKey?: string;
  paymentReceiptKey?: string;
  startedAt: string;
  endedAt: string;
  doctor?: IDoctor;
  patient?: TPatient;
}

export interface IPlannedAppointment {
  id: string;
  createdAt: string;
  notes: string;
}

export interface ICreateAppointment {
  doctorId: string;
  patientId: string;
  createdAt: string;
  status: AppointmentStatus;
  startedAt: string;
  endedAt: string;
}
