import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { RootState, AppDispatch } from "../store";
import { Box, Typography, CircularProgress } from "@mui/material";

const CryptoPrices = () => {
  const dispatch: AppDispatch = useDispatch();
  const { prices, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    console.log("CryptoPrices component mounted");

    dispatch(fetchCryptoPrices("bitcoin,ethereum"));
  }, [dispatch]);
  console.log("Current state:", { prices, loading, error });


  if (loading) {
    console.log("Loading state active");
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.log("Error state active:", error);
    return (
      <Typography color="error" mt={4} textAlign="center">
        {error}
      </Typography>
    );
  }
  console.log("Rendering prices:", prices);

  if (Object.keys(prices).length === 0) {
    return (
      <Typography mt={4} textAlign="center">
        No prices available
      </Typography>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Cryptocurrency Prices
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {Object.entries(prices).map(([coin, price]) => (
          <Typography key={coin}>
            {coin.toUpperCase()}: ${price?.toFixed(2) || "N/A"}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default CryptoPrices;
