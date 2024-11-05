import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Review, ReviewState } from './types.ts'; 
import { BASE_URL } from '../../scripts/utils.ts';

const initialState : ReviewState = {
  reviews: [] as Review[],
  status: 'idle',
  error: null,
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(getReviews.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.reviews = action.payload;
      })
      .addCase(getReviewBySalon.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(getBestReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
  },
});

//создание отзыва
export const createReview = createAsyncThunk('review/create', async (object: Review) => {
  const response = (await axios.post(BASE_URL + '/reviews', object)).data;
  return response;
});

//получение отзывов по автосалону
export const getReviewBySalon = createAsyncThunk('review/getBySalon', async (nameSalon: String) => {
  const response = (await axios.get(BASE_URL + `/reviews/getBySalon/${nameSalon}`)).data;
  return response;
});

//получение отзывов
export const getReviews = createAsyncThunk('review/get', async () => {
  const response = await axios.get(BASE_URL + '/reviews/get');
  return response.data;
});

//получение отзывов с максимальным рейтингом
export const getBestReviews = createAsyncThunk('review/getBest', async () => {
  const response = await axios.get(BASE_URL + '/reviews/getBest');
  return response.data;
});

export const { actions } = reviewSlice;
export default reviewSlice.reducer;
