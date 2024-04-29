import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { Condition, TPatient } from '@/dataTypes/Patient';
import type { IUser } from '@/dataTypes/User';
import type { IAllergy } from '@/dataTypes/Allergy';

type Patient = TPatient &
  IUser & { conditions: Condition[]; vaccinations: string[]; allergies: IAllergy[]; twoFactorAuthToggle: boolean };

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
    avatarKey: '',
    weight: 75,
    height: 175,
    age: 75,
    bloodType: 'O_PLUS',
    gender: 'MALE',
    identityCardKey: '',
    country: '',
    state: '',
    city: '',
    street: '',
    apartment: '',
    zipCode: 0,
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

export const patientData = (state: RootState) => state.patient.data;

export default patientSlice.reducer;
