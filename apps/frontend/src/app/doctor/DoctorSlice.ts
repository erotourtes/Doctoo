import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { IDoctor } from '@/dataTypes/Doctor';
import type { GetDoctorDataPayload } from './DoctorThunks';

interface DoctorData {
  doctors: IDoctor[];
  totalCount: number;
}

const initialState: DoctorData = {
  doctors: [],
  totalCount: 0,
};

export const doctorSlice = createAppSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctorData: (state, action: PayloadAction<GetDoctorDataPayload>) => {
      state.doctors = action.payload.doctors;
      state.totalCount = action.payload.count;
    },

    setPatientDoctorData: (state, action: PayloadAction<IDoctor[]>) => {
      state.doctors = action.payload;
    },

    setNewDoctor: (state, action: PayloadAction<IDoctor>) => {
      state.doctors.push(action.payload);
    },

    setPatchDoctorData: (state, action: PayloadAction<{ id: string; data: Partial<IDoctor> }>) => {
      const { id, data } = action.payload;
      const doctorIndex = state.doctors.findIndex(doctor => doctor.id === id);
      if (doctorIndex !== -1) {
        state.doctors[doctorIndex] = { ...state.doctors[doctorIndex], ...data };
      }
    },

    setDeleteDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
    },
  },
});

export const { setDoctorData, setNewDoctor, setDeleteDoctor, setPatchDoctorData, setPatientDoctorData } =
  doctorSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default doctorSlice.reducer;
