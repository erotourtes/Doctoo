import type { RootState } from '@/app/store';
import type { AppointmentStatus, IAppointment } from '@/dataTypes/Appointment';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import dayjs from 'dayjs';

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

    setChangeAppointmentStatus: (state, action: PayloadAction<{ status: AppointmentStatus; id: string }>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },

    setResheduleAppointment: (state, action: PayloadAction<{ id: string; newDate: string }>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload.id);
      if (appointment) {
        appointment.startedAt = action.payload.newDate;
        const startedAt = dayjs(appointment.startedAt);
        appointment.endedAt = startedAt.add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss[Z]');
      }
    },

    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
  },
});

export const {
  setAppointments,
  setNewAppointment,
  deleteAppointment,
  setChangeAppointmentStatus,
  setResheduleAppointment,
} = appointmentSlice.actions;

export const appointmentData = (state: RootState) => state.appointment.appointments;

export default appointmentSlice.reducer;
