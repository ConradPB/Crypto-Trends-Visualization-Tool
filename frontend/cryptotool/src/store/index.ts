import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice';
import alertsReducer from '../features/alertsSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    alerts: alertsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;