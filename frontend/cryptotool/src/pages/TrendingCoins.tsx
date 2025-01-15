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
                Trending Cryptocurrencies
            </Typography>

            {loading ? (
                <Box mt={4} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" mt={4}>
                    {error}
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Symbol</TableCell>
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
