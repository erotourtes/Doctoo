import { configureStore } from '@reduxjs/toolkit';
import { doctorSlice } from './doctor/DoctorSlice';
import { appointmentSlice } from './appointment/AppointmentSlice';
import { patientSlice } from './patient/PatientSlice';
import { conditionSlice } from './condition/ConditionSlice';

export const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
    appointment: appointmentSlice.reducer,
    patient: patientSlice.reducer,
    condtion: conditionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
