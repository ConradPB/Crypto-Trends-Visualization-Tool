import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

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
  "crypto/fetchCryptoPrices",
  async (ids: string, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.get(`/crypto/prices?ids=${ids}`);
          return response.data;
      } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
              return rejectWithValue(error.response.data || "Failed to fetch prices");
          }
          return rejectWithValue("Failed to fetch prices");
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
  "crypto/fetchTrendingCoins",
  async (_, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.get("/crypto/trending");
          return response.data;
      } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
              return rejectWithValue(error.response.data || "Failed to fetch trending coins");
          }
          return rejectWithValue("Failed to fetch trending coins");
      }
  }
);
  

// Slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Crypto Prices
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Historical Data
      .addCase(fetchHistoricalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.loading = false;
        state.historicalData = action.payload;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Trending Coins
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingCoins = action.payload;
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cryptoSlice.reducer;
