import { configureStore } from '@reduxjs/toolkit';
import { doctorSlice } from './doctor/DoctorSlice';
import { patientSlice } from './patient/PatientSlice';

export const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
    patient: patientSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
