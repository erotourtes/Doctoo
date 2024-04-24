import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import type { IAppointment } from '@/dataTypes/Appointment';

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
    setAppointments: (state, action: PayloadAction<IAppointment[]>) => {
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

export const {
  setAppointments,
  setAppointmentCompleted,
  setAppointmentCanceled,
  setNewAppointment,
  deleteAppointment,
} = appointmentSlice.actions;

export const appointmentData = (state: RootState) => state.appointment.appointments;

export default appointmentSlice.reducer;
