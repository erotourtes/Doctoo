import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { IDoctor } from '@/dataTypes/Doctor';

interface DoctorData {
  data: IDoctor;
}

const initialState: DoctorData = {
  data: {
    photo: '',
    name: '',
    specialization: '',
    reviews: 0,
    hospital: '',
  },
};

export const doctorSlice = createAppSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action: PayloadAction<IDoctor>) => {
      state.data = action.payload;
    },
  },
});

export const { setDoctorData } = doctorSlice.actions;

export const doctorData = (state: RootState) => state.doctor.data;

export default doctorSlice.reducer;
