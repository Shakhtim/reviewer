import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector } from 'react-redux';
import review from './redux/review/index.ts';
import admin from './redux/admin/index.ts';
import autosalons from './redux/admin/autosalon/index.ts';

const store = configureStore({
  reducer: {
    review,
    admin,
    autosalon: autosalons,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
