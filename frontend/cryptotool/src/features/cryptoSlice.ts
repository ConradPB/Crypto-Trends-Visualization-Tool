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

// Type the API response for prices
interface PricesResponse {
  [coin: string]: CryptoPriceData | number; // Allow both { usd: number } or flat number
}

export const fetchCryptoPrices = createAsyncThunk(
  "crypto/fetchCryptoPrices",
  async (ids: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<PricesResponse>(
        "/crypto/prices",
        {
          params: { ids, vs_currencies: "usd" },
        }
      );
      console.log("Crypto Prices API Response:", response.data);
      // Normalize: Ensure every value is { usd: number }
      const normalizedPrices: Record<string, CryptoPriceData> =
        Object.fromEntries(
          Object.entries(response.data).map(([coin, value]) => [
            coin,
            typeof value === "number"
              ? { usd: value }
              : { usd: (value as CryptoPriceData).usd },
          ])
        );
      return normalizedPrices;
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
      const response = await axiosInstance.get<
        Record<string, { date: string; price: number }[]>
      >("/crypto/historical", {
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
      const response = await axiosInstance.get<{
        coins: {
          id: string;
          name: string;
          symbol: string;
          marketCapRank: number;
        }[];
      }>("/crypto/trending");
      console.log("Trending Coins API Response:", response.data);
      return response.data.coins || [];
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

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.trendingCoins = action.payload;
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.trendingCoins = [];
      });
  },
});

export default cryptoSlice.reducer;
