import { AppointmentStatus } from './AppointmentSlice';

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

export default class AppointmentModel implements IAppointment {
  constructor(
    public id: string,
    public patientId: string,
    public doctorId: string,
    public date: string,
    public status: AppointmentStatus,
    public notes: string,
    public videoRecordKey: string,
    public paymentInvoiceKey: string,
    public paymentReceiptKey: string,
  ) {}
}
