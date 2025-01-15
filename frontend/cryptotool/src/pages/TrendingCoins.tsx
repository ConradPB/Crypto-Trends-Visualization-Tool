import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingCoins } from "../features/cryptoSlice";
import { AppDispatch, RootState } from "../store";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material";

const TrendingCoins = () => {
  const dispatch: AppDispatch = useDispatch();
  const { trendingCoins, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchTrendingCoins());
  }, [dispatch]);

  return (
    <Box padding={4}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Trending Coins
      </Typography>

      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box mt={4}>
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} mt={2}>
          {trendingCoins.map((coin) => (
            <Grid item xs={12} sm={6} md={4} key={coin.id}>
              <Card
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <CardContent>
                  <Avatar
                    src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}
                    alt={coin.name}
                    sx={{
                      width: 56,
                      height: 56,
                      margin: "0 auto 16px",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Market Cap Rank: {coin.marketCapRank}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrendingCoins;
