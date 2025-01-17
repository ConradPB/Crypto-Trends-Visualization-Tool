import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { RootState } from "../store";
import { Box, Typography } from "@mui/material";

const CryptoPrices = () => {
  const dispatch: AppDispatch = useDispatch();
  const { prices, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCryptoPrices("bitcoin,ethereum")); // Include the required coins
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5">Cryptocurrency Prices</Typography>
      {Object.entries(prices).length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        <Box>
          {Object.entries(prices).map(([coin, priceData]) => (
            <Typography key={coin}>
              {coin}: ${priceData}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CryptoPrices;
