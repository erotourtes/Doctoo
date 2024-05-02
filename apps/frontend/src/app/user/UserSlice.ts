import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import { type components } from '../../api';

interface UserData {
  data: {
    role?: components['schemas']['MeResponseDto']['role'];
  };
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
    role: undefined,
  },
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData['data']>) => {
      state.data = action.payload;
    },
    setUserState: (state, action: PayloadAction<Partial<UserData['state']>>) => {
      state.state = {
        ...state.state,
        ...action.payload,
      };
    },
  },
});

export const { setUserData, setUserState } = userSlice.actions;

export default userSlice.reducer;
