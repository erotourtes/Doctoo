import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUSer } from '@/dataTypes/User';
import { createAppSlice } from '../createAppSlice';
import { BloodType, Gender, type IPatient } from '@/dataTypes/Patient';

export type Patient = IPatient & IUSer;
interface PatientData {
  data: Patient;
}

const initialState: PatientData = {
  data: {
    id: '78a3a566-f274-432f-8b7b-6969ad3a8438',
    userId: '411625f4-c7c6-4916-a287-a3173ec060e4',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    emailVerified: false,
    googleId: '',
    avatarKey: '',
    weight: 0,
    height: 0,
    age: 0,
    bloodType: BloodType.O_PLUS,
    gender: Gender.MALE,
    identityCardKey: '',
    country: '',
    state: '',
    city: '',
    street: '',
    apartment: '',
    zipCode: '',
    conditions: [],
    vaccinations: [],
    allergies: [],
  },
};

export const patientSlice = createAppSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<Patient>) => {
      state.data = action.payload;
    },
    updatePatientData: (state, action: PayloadAction<Partial<Patient>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setPatientData, updatePatientData } = patientSlice.actions;

export const doctorData = (state: RootState) => state.doctor.data;

export default patientSlice.reducer;
