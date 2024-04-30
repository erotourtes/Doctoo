import { configureStore } from '@reduxjs/toolkit';
import { doctorSlice } from './doctor/DoctorSlice';
import { appointmentSlice } from './appointment/AppointmentSlice';
import { patientSlice } from './patient/PatientSlice';
import paymentSlice from './payment/paymentSlice';
import { allergySlice } from './allergy/AllergySlice';
import conditionSlice from './condition/ConditionSlice';
import reviewSlice from './review/ReviewSlice';
import userSlice from './user/UserSlice';

export const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
    appointment: appointmentSlice.reducer,
    patient: patientSlice.reducer,
    payment: paymentSlice,
    allergy: allergySlice.reducer,
    condition: conditionSlice,
    review: reviewSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
