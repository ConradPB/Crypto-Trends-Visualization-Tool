import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import { fetchTrendingCoins } from "../features/cryptoSlice";
import { AppDispatch, RootState } from "../store";

const TrendingCoins = () => {
  const dispatch: AppDispatch = useDispatch();
  const { trendingCoins, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    console.log("Fetching trending coins...");
    dispatch(fetchTrendingCoins());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!trendingCoins || trendingCoins.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6">No trending coins available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Trending Cryptocurrencies
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {trendingCoins.map((coin) => (
          <Card
            key={coin.id}
            sx={{
              padding: 3,
              width: 280,
              boxShadow: 3,
              textAlign: "center",
              borderRadius: 2,
              background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              "&:hover": {
                transform: 'translateY(-5px)',
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              {coin.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {coin.symbol.toUpperCase()}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                mt: 2,
                p: 1,
                borderRadius: 1,
                backgroundColor: 'primary.light',
                color: 'white'
              }}
            >
              Market Cap Rank: #{coin.marketCapRank || 'N/A'}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TrendingCoins;