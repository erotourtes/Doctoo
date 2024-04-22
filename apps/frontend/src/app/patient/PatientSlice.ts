import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import { BloodType, Gender, type IPatient } from '@/dataTypes/Patient';

interface PatientData {
  data: IPatient;
}

const initialState: PatientData = {
  data: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+38 066 765 12 87',
    email: 'john.doe@gmail.com',
    avatarKey: '',
    weight: 60,
    height: 170,
    age: 20,
    bloodType: BloodType.O_PLUS,
    gender: Gender.MALE,
    declarationId: 12345678,
    country: '',
    conditions: [],
    allergies: [],
    city: '',
    street: '',
  },
};

export const patientSlice = createAppSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<IPatient>) => {
      state.data = action.payload;
    },
  },
});

export const { setPatientData } = patientSlice.actions;

export const doctorData = (state: RootState) => state.doctor.data;

export default patientSlice.reducer;
