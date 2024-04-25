// import type { RootState } from '@/app/store';
// import type { ICondition } from '@/dataTypes/Condition';
// import { createAppSlice } from '../createAppSlice';

// interface ConditionData {
//   data: ICondition[];
// }

// const initialState: ConditionData = {
//   data: [
//     {
//       id: '1',
//       name: '',
//     },
//   ],
// };

// export const conditionSlice = createAppSlice({
//   name: 'condition',
//   initialState,
//   reducers: {
//     setConditionData: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// export const { setConditionData } = conditionSlice.actions;

// export const conditionData = (state: RootState) => state.condtion.data;

// export default conditionSlice.reducer;
