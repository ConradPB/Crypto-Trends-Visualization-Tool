import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, Typography } from "@mui/material";
import { fetchTrendingCoins } from "../features/cryptoSlice";
import { AppDispatch, RootState } from "../store";

const TrendingCoins = () => {
  const dispatch: AppDispatch = useDispatch();
  const { trendingCoins, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  // Fetch trending coins on component mount
  useEffect(() => {
    dispatch(fetchTrendingCoins());
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6">Loading trending coins...</Typography>
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6" color="error">
          Failed to fetch trending coins: {error}
        </Typography>
      </Box>
    );
  }

  // Handle case where no coins are available
  if (!Array.isArray(trendingCoins) || trendingCoins.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6">No trending coins available</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={2} p={2}>
      {trendingCoins.map((coin) => {
        const { id, name, symbol, marketCapRank: market_cap_rank } = coin; // Extract relevant data from the `coin` object

        return (
          <Card
            key={id}
            sx={{
              padding: 2,
              width: 250,
              boxShadow: 3,
              textAlign: "center",
              borderRadius: 2,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Symbol: {symbol.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Rank: {market_cap_rank}
            </Typography>
          </Card>
        );
      })}
    </Box>
  );
};

export default TrendingCoins;
