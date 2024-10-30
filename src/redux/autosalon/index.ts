import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Autosalon, AutosalonState } from './types.ts'; 
import { BASE_URL } from '../../scripts/utils.ts';

const initialState : AutosalonState = {
  autosalons: [] as Autosalon[],
  loading: false,
  error: null,
}

const autosalonSlice = createSlice({
  name: 'autosalon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAutosalon.fulfilled, (state, action) => {
        state.autosalons.push(action.payload);
      })
  },
});

//создание отзыва
export const submitAutosalon = createAsyncThunk('autosalon/create', async (object: Autosalon) => {
  const data = (await axios.post(BASE_URL + '/autosalons', object)).data;
  return data;
});

export const { actions } = autosalonSlice;
export default autosalonSlice.reducer;
