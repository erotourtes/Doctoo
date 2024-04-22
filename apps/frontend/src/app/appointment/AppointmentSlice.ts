import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

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

type AppointmentData = {
  appointments: IAppointment[];
};

const initialState: AppointmentData = {
  appointments: [],
};

export const appointmentSlice = createAppSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setCurrentAppointments: (state, action: PayloadAction<IAppointment[]>) => {
      state.appointments = action.payload;
    },

    setNewAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointments.push(action.payload);
    },

    setAppointmentCanceled: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload);
      if (appointment) {
        appointment.status = AppointmentStatus.CANCELLED;
      }
    },

    setAppointmentCompleted: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload);
      if (appointment) {
        appointment.status = AppointmentStatus.COMPLETED;
      }
    },

    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
  },
});

export const { setCurrentAppointments, setAppointmentCompleted, setAppointmentCanceled, setNewAppointment } =
  appointmentSlice.actions;

export const appointmentData = (state: RootState) => state.doctor.data;

export default appointmentSlice.reducer;
