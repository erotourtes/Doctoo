import type { IDoctor } from './Doctor';

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
  assignedAt: string;
  notes: string;
  status?: AppointmentStatus | any;
  videoRecordKey: string;
  paymentInvoiceKey?: string;
  paymentReceiptKey?: string;
  startedAt: string;
  endedAt: string;
  doctor?: IDoctor;
}

export interface IPlannedAppointment {
  id: string;
  assignedAt: string;
  notes: string;
}

export interface ICreateAppointment {
  doctorId: string;
  patientId: string;
  assignedAt: string;
  status: AppointmentStatus;
  startedAt: string;
  endedAt: string;
}
