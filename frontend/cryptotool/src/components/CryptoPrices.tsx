import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { RootState, AppDispatch } from "../store";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

const CryptoPrices = () => {
  const dispatch: AppDispatch = useDispatch();
  const { prices, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<{
    coinId: string;
    price: number;
  } | null>(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    // Fetch prices for multiple cryptocurrencies
    dispatch(
      fetchCryptoPrices(
        "bitcoin,ethereum,dogecoin,cardano,solana,xrp,litecoin,chainlink,polkadot,binancecoin"
      )
    );
  }, [dispatch]);

  // Handle search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      // Convert user input to lowercase and replace spaces
      const coinId = searchTerm.toLowerCase().trim();

      // Fetch the price for the searched cryptocurrency
      const response = await fetch(
        `/api/crypto/prices?ids=${coinId}&vs_currencies=usd`
      );
      const data = await response.json();

      if (data[coinId]) {
        setSearchResult({
          coinId: coinId,
          price: data[coinId].usd,
        });
        setSearchError("");
      } else {
        setSearchError("Cryptocurrency not found");
        setSearchResult(null);
      }
    } catch (err) {
      console.error("Error fetching cryptocurrency data:", err);
      setSearchError("Failed to fetch cryptocurrency data");
      setSearchResult(null);
    }
  };

  return (
    <Box mt={4}>
      {/* Title */}
      <Typography variant="h4" textAlign="center" mb={4}>
        Cryptocurrency Prices
      </Typography>

      {/* Search Bar */}
      <Box mb={4} display="flex" justifyContent="center">
        <form onSubmit={handleSearch} style={{ width: "80%", maxWidth: 400 }}>
          <TextField
            label="Search Cryptocurrency"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <button
                  type="submit"
                  style={{ border: "none", background: "transparent" }}
                >
                  🔍
                </button>
              ),
            }}
          />
        </form>
      </Box>

      {/* Display Search Result */}
      {searchResult && (
        <Box mb={4} display="flex" justifyContent="center">
          <Card
            sx={{
              padding: 2,
              boxShadow: 2,
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {searchResult.coinId.toUpperCase()}
              </Typography>
              <Typography variant="body1" color="primary">
                ${searchResult.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Display Search Error */}
      {searchError && (
        <Box mb={4} display="flex" justifyContent="center">
          <Typography variant="body1" color="error">
            {searchError}
          </Typography>
        </Box>
      )}

      {/* Loading State */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      )}

      {/* Prices List */}
      <Grid container spacing={3} justifyContent="center">
        {Object.entries(prices).map(([coin, priceData]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={coin}>
            <Card
              sx={{
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {coin.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="primary">
                  ${priceData.usd.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CryptoPrices;
