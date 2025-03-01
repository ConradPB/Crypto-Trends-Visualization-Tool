import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export interface CryptoPriceData {
  usd: number;
}
interface CryptoState {
  prices: Record<string, CryptoPriceData>;
  historicalData: Record<string, { date: string; price: number }[]>;
  trendingCoins: {
    id: string;
    name: string;
    symbol: string;
    marketCapRank: number;
  }[];
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
      // Add the `vs_currencies=usd` parameter to the URL
      const response = await axiosInstance.get("/crypto/prices", {
        params: { ids, vs_currencies: "usd" },
      });
      console.log("Crypto Prices API Response:", response.data);
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
  "crypto/fetchHistoricalData",
  async (
    params: { id: string; days: string; start?: string; end?: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Fetching historical data with params:", params);
      const response = await axiosInstance.get("/crypto/historical", {
        params: {
          id: params.id,
          days: params.days,
          start: params.start,
          end: params.end,
        },
      });
      console.log("Historical data response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching historical data:", error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || "Failed to fetch historical data"
        );
      }
      return rejectWithValue("Failed to fetch historical data");
    }
  }
);

export const fetchTrendingCoins = createAsyncThunk(
  "crypto/fetchTrendingCoins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/crypto/trending");
      console.log("Trending Coins API Response:", response.data);
      return response.data.coins;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || "Failed to fetch trending coins"
        );
      }
      return rejectWithValue("Failed to fetch trending coins");
    }
  }
);

// Slice
const cryptoSlice = createSlice({
  name: "crypto",
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
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingCoins = action.payload as {
          id: string;
          name: string;
          symbol: string;
          marketCapRank: number;
        }[];
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.trendingCoins = [];
      });
  },
});

export default cryptoSlice.reducer;
