import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchHistoricalData } from "../features/cryptoSlice";
import { RootState } from "../store";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { Grid } from '@mui/material';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HistoricalData = () => {
  const dispatch: AppDispatch = useDispatch();
  const { historicalData, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("7");

  // Fetch historical data on coin or time range change
  useEffect(() => {
    dispatch(fetchHistoricalData({ id: selectedCoin, days: timeRange }));
  }, [selectedCoin, timeRange, dispatch]);

  // Format data for the chart
  const formattedData =
    historicalData[selectedCoin]?.map(
      (entry: { date: string; price: number }) => ({
        date: new Date(entry.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        price: entry.price,
      })
    ) || [];

  return (
    <Box padding={4}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Cryptocurrency Historical Data
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {/* Dropdown for Selecting Cryptocurrency */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="coin-select-label">Cryptocurrency</InputLabel>
              <Select
                labelId="coin-select-label"
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                label="Cryptocurrency"
              >
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="ethereum">Ethereum</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Dropdown for Selecting Time Range */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="time-range-select-label">Time Range</InputLabel>
              <Select
                labelId="time-range-select-label"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
                <MenuItem value="90">90 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Chart Section */}
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
        <Box
          mt={4}
          sx={{
            height: 400,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <ResponsiveContainer>
            <LineChart data={formattedData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default HistoricalData;
