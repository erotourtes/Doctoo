import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { TUser } from '@/dataTypes/User';

interface UserData {
  data: TUser;
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
    id: '1',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    avatarKey: '',
    emailVerified: false,
  },
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
