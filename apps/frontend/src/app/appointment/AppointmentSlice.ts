import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import AppointmentModel from './AppointmentModel';

export enum AppointmentStatus {
  PLANNED = 'Planned',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

type AppointmentData = {
  appointments: AppointmentModel[];
};

type CreateAppointment = {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  notes: string;
  status: AppointmentStatus;
  videoRecordKey: string;
  paymentInvoiceKey: string;
  paymentReceiptKey: string;
};

const initialState: AppointmentData = {
  appointments: [],
};

export const appointmentSlice = createAppSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setCurrentAppointments: (state, action: PayloadAction<AppointmentModel[]>) => {
      state.appointments = action.payload;
    },

    planAppointment: (state, action: PayloadAction<CreateAppointment>) => {
      state.appointments.push(action.payload);
    },

    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload);
      if (appointment) {
        appointment.status = AppointmentStatus.CANCELLED;
      }
    },

    completeAppointment: (state, action: PayloadAction<string>) => {
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

export const { setCurrentAppointments, planAppointment, cancelAppointment, completeAppointment } =
  appointmentSlice.actions;

export const appointmentData = (state: RootState) => state.doctor.data;

export default appointmentSlice.reducer;
