import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CryptoState {
  prices: Record<string, number>;
  historicalData: Record<string, { date: string; price: number }[]>;
  trendingCoins: { id: string; name: string; symbol: string; marketCapRank: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  prices: {},
  historicalData: {},
  trendingCoins: [],
  loading: false,
  error: null,
};

// Async Thunks for API calls
export const fetchCryptoPrices = createAsyncThunk(
  'crypto/fetchCryptoPrices',
  async (ids: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/crypto/prices?ids=${ids}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || 'Failed to fetch prices');
      }
      return rejectWithValue('Failed to fetch prices');
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
    'crypto/fetchHistoricalData',
    async (params: { id: string; days: string }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/api/crypto/historical?id=${params.id}&days=${params.days}`);
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data || 'Failed to fetch historical data');
        }
        return rejectWithValue('Failed to fetch historical data');
      }
    }
  );
  
  export const fetchTrendingCoins = createAsyncThunk(
    'crypto/fetchTrendingCoins',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/api/crypto/trending');
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data || 'Failed to fetch trending coins');
        }
        return rejectWithValue('Failed to fetch trending coins');
      }
    }
  );
  
  