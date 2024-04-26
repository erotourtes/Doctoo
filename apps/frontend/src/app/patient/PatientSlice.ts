import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/dataTypes/User';
import { createAppSlice } from '../createAppSlice';
import { BloodType, Gender, type IPatient } from '@/dataTypes/Patient';

export type Patient = IPatient & IUser;
interface PatientData {
  data: Patient;
  state: {
    isLoading: boolean;
    isFetched: boolean;
  };
}

const initialState: PatientData = {
  state: {
    isLoading: false,
    isFetched: false,
  },
  data: {
    id: '1',
    userId: '1',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+38098555555',
    email: 'john.doe@gmail.com',
    emailVerified: false,
    googleId: '',
    avatarKey: '',
    weight: 75,
    height: 175,
    age: 75,
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
    emailNotificationToggle: false,
    twoFactorAuthToggle: false,
    requestBillPaymentApproval: false,
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
    setPatientState: (state, action: PayloadAction<Partial<PatientData['state']>>) => {
      state.state = { ...state.state, ...action.payload };
    },
  },
});

export const { setPatientData, updatePatientData, setPatientState } = patientSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default patientSlice.reducer;
