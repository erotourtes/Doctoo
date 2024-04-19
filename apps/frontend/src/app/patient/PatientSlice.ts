import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

export enum BloodType {
  O_PLUS = 'O+',
  O_MINUS = 'O-',
  A_PLUS = 'A+',
  A_MINUS = 'A-',
  B_PLUS = 'B+',
  B_MINUS = 'B-',
  AB_PLUS = 'AB+',
  AB_MINUS = 'AB-',
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarKey: string;
  weight: number;
  height: number;
  age: number;
  bloodType: BloodType;
  gender: Gender;
  declarationId: number;
  conditions: Condition[];
  allergies: Allergy[];
  country: string;
  state?: string;
  city: string;
  street: string;
  apartment?: string;
  zipCode?: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = ' female',
}

export type Condition = {
  id: string;
  name: string;
};

export type Allergy = {
  id: string;
  name: string;
};

interface PatientData {
  data: Patient;
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
    setPatientData: (state, action: PayloadAction<Patient>) => {
      state.data = action.payload;
    },
  },
});

export const { setPatientData } = patientSlice.actions;

export const doctorData = (state: RootState) => state.doctor.data;

export default patientSlice.reducer;
