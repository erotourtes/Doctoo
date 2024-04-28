import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { IDoctor } from '@/dataTypes/Doctor';

interface DoctorData {
  doctors: IDoctor[];
}

const initialState: DoctorData = {
  doctors: [],
};

export const doctorSlice = createAppSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action: PayloadAction<IDoctor[]>) => {
      state.doctors = action.payload;
    },
  },
});

export const { setDoctorData } = doctorSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default doctorSlice.reducer;
