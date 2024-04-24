import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPaymentIntent = createAsyncThunk(
  'payment',
  async (data: {
    userId: string;
    doctorId: string;
    date: Date | string | number;
    appointmentDuration: number;
    pricePerHour: number;
  }) => {
    try {
      const response = await instance.post('/payment', {
        userId: data.userId,
        doctorId: data.doctorId,
        date: data.date,
        appointmentDuration: data.appointmentDuration,
        pricePerHour: data.pricePerHour,
      });
      return response.data.client_secret;
    } catch (error) {
      throw error;
    }
  },
);
