import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPaymentIntent = createAsyncThunk(
  'payment',
  async (data: { appointmentDuration: number; pricePerHour: number }) => {
    const response = await instance.post('/payment', {
      appointmentDuration: data.appointmentDuration,
      pricePerHour: data.pricePerHour,
    });
    return response.data.client_secret;
  },
);
