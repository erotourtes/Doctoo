import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { RootState } from '../store';

interface PaymentData {
  data: {
    date: string;
    doctorName: string;
    doctorSpecialization: string;
    appointmentDuration: number;
    pricePerHour: number;
  };
}

const initialState: PaymentData = {
  data: {
    date: '1739835600000',
    doctorName: 'Dr. Sarah Chang',
    doctorSpecialization: 'cardiologist',
    appointmentDuration: 1.5,
    pricePerHour: 100,
  },
};

export const paymentSlice = createAppSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentData>) => {
      state.data = action.payload.data;
    },
  },
});

export const { setPaymentData } = paymentSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default paymentSlice.reducer;
