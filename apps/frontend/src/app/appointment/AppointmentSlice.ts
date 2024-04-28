import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { AppointmentStatus } from '@/dataTypes/Appointment';
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

    setChangeAppointmentStatus: (state, action: PayloadAction<{ status: AppointmentStatus; id: string }>) => {
      const appointment = state.appointments.find(appointment => appointment.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },

    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
  },
});

export const { setAppointments, setNewAppointment, deleteAppointment, setChangeAppointmentStatus } =
  appointmentSlice.actions;

export const appointmentData = (state: RootState) => state.appointment.appointments;

export default appointmentSlice.reducer;
