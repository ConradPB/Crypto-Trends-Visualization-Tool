import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { RootState, AppDispatch } from "../store";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  Grid,
} from "@mui/material";

const CryptoPrices = () => {
  const dispatch: AppDispatch = useDispatch();
  const { prices, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch prices for multiple cryptocurrencies
    dispatch(fetchCryptoPrices("bitcoin,ethereum,dogecoin,cardano,solana"));
  }, [dispatch]);

  // Filter prices based on search term
  const filteredPrices = Object.entries(prices).filter(([coin]) =>
    coin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6" color="error">
          Failed to fetch prices. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      {/* Title */}
      <Typography variant="h4" textAlign="center" mb={4}>
        Cryptocurrency Prices
      </Typography>

      {/* Search Bar */}
      <Box mb={4} display="flex" justifyContent="center">
        <TextField
          label="Search Cryptocurrency"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "80%",
            maxWidth: 400,
          }}
        />
      </Box>

      {/* Prices List */}
      <Grid container spacing={3} justifyContent="center">
        {filteredPrices.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="h6" color="textSecondary">
              No results found for "{searchTerm}"
            </Typography>
          </Box>
        ) : (
          filteredPrices.map(([coin, priceData]) => (
            <Grid item xs={12} sm={6} md={4} key={coin}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {coin.toUpperCase()}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${priceData.usd.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default CryptoPrices;
