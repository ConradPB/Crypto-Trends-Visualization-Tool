import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice';
import alertsReducer from '../features/alertsSlice';
import logger from 'redux-logger';

// Configure the main store
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

// Function to create a mock store for testing
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      crypto: cryptoReducer,
      alerts: alertsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV !== 'production'
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;