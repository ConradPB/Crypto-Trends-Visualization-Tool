import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
