import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchTrendingCoins } from "../features/cryptoSlice";
import { RootState } from "../store";
import {
    Box,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const TrendingCoins = () => {
    const dispatch: AppDispatch = useDispatch();
    const { trendingCoins, loading, error } = useSelector((state: RootState) => state.crypto);
  
    useEffect(() => {
      dispatch(fetchTrendingCoins());
    }, [dispatch]);
  
    return (
      <Box padding={4}>
        <Typography variant="h4" gutterBottom>
          Trending Coins
        </Typography>
  
        {loading ? (
          <Box mt={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box mt={4}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 4, maxWidth: '100%', mx: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Symbol</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trendingCoins.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>{coin.marketCapRank}</TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  };
  

export default TrendingCoins;
