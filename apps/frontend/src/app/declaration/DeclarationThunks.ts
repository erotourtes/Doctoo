import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDeclaration } from './DeclarationSlice';
import api from '../api';
import type { IDeclaration } from '../../dataTypes/Declaration';

export const getMyDeclarations = createAsyncThunk('declaration', async (_, { dispatch }) => {
  try {
    const { error, data } = await api.GET('/declaration/my');

    if (!error) {
      const res: IDeclaration[] = data;
      dispatch(setDeclaration(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
