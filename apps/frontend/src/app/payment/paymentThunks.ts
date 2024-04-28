import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPaymentIntent = createAsyncThunk(
  'payment',
  async (data: { appointmentDuration: number; pricePerHour: number }) => {
    const { appointmentDuration, pricePerHour } = data;
    const response = await axios.post('/payment', {
      body: {
        appointmentDuration,
        pricePerHour,
      },
    });

    return response.data;
  },
);
