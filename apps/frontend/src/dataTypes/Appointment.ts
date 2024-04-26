import type { IDoctor } from './Doctor';

export enum AppointmentStatus {
  PLANNED = 'Planned',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export interface IAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  assignedAt: string;
  notes: string;
  status: AppointmentStatus;
  appointmentDuration: number;
  videoRecordKey: string;
  paymentInvoiceKey: string;
  paymentReceiptKey: string;
  doctor: {
    userId: string;
    payrate: number;
    about: string;
    firstName: string;
    lastName: string;
    avatarKey: string;
    phone: string;
    email: string;
  };
}

export interface IPlannedAppointment {
  id: string;
  assignedAt: string;
  notes: string;
  doctor: IDoctor;
}

export interface ICreateAppointment {
  doctorId: string;
  patientId: string;
  assignedAt: string;
  status: AppointmentStatus;
  notes: string;
}
