import { configureStore } from '@reduxjs/toolkit';
import { doctorSlice } from './doctor/DoctorSlice';

export const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
