import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Review, ReviewState } from './types.ts'; 
import { BASE_URL } from '../../scripts/utils.ts';

const initialState : ReviewState = {
  reviews: [] as Review[],
  loading: false,
  error: null,
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
  },
});

//создание отзыва
export const submitReview = createAsyncThunk('review/create', async (object: Review) => {
  const data = (await axios.post(BASE_URL + '/reviews', object)).data;
  return data;
});

export const { actions } = reviewSlice;
export default reviewSlice.reducer;
