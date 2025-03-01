import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { RootState, AppDispatch } from "../store";
import axiosInstance from "../api/axiosInstance";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<{
    coinId: string;
    price: number;
  } | null>(null);
  const [searchError, setSearchError] = useState("");

  const SYMBOL_TO_ID_MAP: Record<string, string> = {
    btc: "bitcoin",
    eth: "ethereum",
    doge: "dogecoin",
    ada: "cardano",
    sol: "solana",
    xrp: "ripple",
    ltc: "litecoin",
    link: "chainlink",
    dot: "polkadot",
    bnb: "binancecoin",
    shib: "shiba-inu",
    pepe: "pepe",
  };

  useEffect(() => {
    dispatch(
      fetchCryptoPrices(
        "bitcoin,ethereum,dogecoin,cardano,solana,xrp,litecoin,chainlink,polkadot,binancecoin"
      )
    );
  }, [dispatch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const userInput = searchTerm.toLowerCase().trim();
      const coinId = SYMBOL_TO_ID_MAP[userInput] || userInput;

      console.log("Searching for coin ID:", coinId);
      const response = await axiosInstance.get("/api/crypto/prices", {
        params: { ids: coinId, vs_currencies: "usd" },
      });
      console.log("Search API Response:", response.data);

      if (Object.keys(response.data).length === 0) {
        setSearchError("Cryptocurrency not found");
        setSearchResult(null);
      } else if (response.data[coinId]) {
        setSearchResult({
          coinId: coinId,
          price: response.data[coinId].usd,
        });
        setSearchError("");
      } else {
        setSearchError("Failed to fetch cryptocurrency data");
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
      <Typography variant="h4" textAlign="center" mb={4}>
        Cryptocurrency Prices
      </Typography>
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
      {searchResult && (
        <Box mb={4} display="flex" justifyContent="center">
          <Card
            sx={{
              padding: 2,
              boxShadow: 2,
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.02)" },
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
      {searchError && (
        <Box mb={4} display="flex" justifyContent="center">
          <Typography variant="body1" color="error">
            {searchError}
          </Typography>
        </Box>
      )}
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
      {error && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      )}
      <Grid container spacing={3} justifyContent="center">
        {Object.entries(prices).map(([coin, priceData]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={coin}>
            <Card
              sx={{
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
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
