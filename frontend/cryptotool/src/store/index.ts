import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice';
import alertsReducer from '../features/alertsSlice';
import logger from 'redux-logger';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  crypto: cryptoReducer,
  alerts: alertsReducer,
});

// Configure the main store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create types for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// Function to create a mock store for testing
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV !== 'production'
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export default store;