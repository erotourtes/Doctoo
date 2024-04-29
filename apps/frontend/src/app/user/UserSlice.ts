import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { IUser } from '@/dataTypes/User';

interface UserData {
  data: IUser;
  state: {
    isLoading: boolean;
    isFetched: boolean;
  };
}

const initialState: UserData = {
  state: {
    isLoading: false,
    isFetched: false,
  },
  data: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    avatarKey: '',
  },
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export const doctorData = (state: RootState) => state.doctor.doctors;

export default userSlice.reducer;
