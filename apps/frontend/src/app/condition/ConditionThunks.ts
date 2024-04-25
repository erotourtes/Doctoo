// import { instance } from '@/api/axios.api';
// import type { ICondition } from '@/dataTypes/Condition';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { AxiosResponse } from 'axios';
// import { setConditionData } from './ConditionSlice';

// export const getPatientsByPatientId = createAsyncThunk('condition', async (patient_id: string, { dispatch }) => {
//   try {
//     const response: AxiosResponse<any[]> = await instance.get(`/condition/by-patient/${patient_id}`);
//     if (response.status === 200) {
//       const data: ICondition[] = response.data.map(condition => {
//         return {
//           ...condition,
//         };
//       });
//       dispatch(setConditionData(data));
//     }
//   } catch (e) {
//     const error = e as Error;
//     throw error;
//   }
// });
