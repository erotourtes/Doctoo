import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { TPatient } from '@/dataTypes/Patient';
import type { IAllergy } from '@/dataTypes/Allergy';
import type { TCondition } from '@/dataTypes/Condition';

type Patient = TPatient & { allergies: IAllergy[] };

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
    addPatientCondition: (state, action: PayloadAction<TCondition[]>) => {
      action.payload.forEach(condition => {
        if (state.data.conditions.some(a => a.id === condition.id)) return;

        state.data.conditions.push(condition);
      });
    },
    setPatientState: (state, action: PayloadAction<Partial<PatientData['state']>>) => {
      state.state = { ...state.state, ...action.payload };
    },
  },
});

export const { setPatientData, updatePatientData, setPatientState, addPatientCondition } = patientSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default patientSlice.reducer;
