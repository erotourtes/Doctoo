import { createAppSlice } from '../createAppSlice';
import type { ICondition } from '@/dataTypes/Condition';
import type { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';

type ConditionData = {
  data: ICondition[];
};

const initialState: ConditionData = {
  data: [],
};

export const conditionSlice = createAppSlice({
  name: 'condition',
  initialState,
  reducers: {
    setConditionData: (state, action: PayloadAction<ICondition[]>) => {
      state.data = action.payload;
      console.log(state.data);
    },
    addCondtionData: (state, action: PayloadAction<ICondition>) => {
      state.data.push(action.payload);
    },
  },
});

export const { setConditionData, addCondtionData } = conditionSlice.actions;

export const conditionData = (data: RootState) => data.condition.data;

export default conditionSlice.reducer;
