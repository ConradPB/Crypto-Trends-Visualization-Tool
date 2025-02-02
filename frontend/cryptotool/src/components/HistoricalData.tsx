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
import { Grid, TextField } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      tooltip: {
        date: string;
        price: string;
      };
    };
  }>;
}

const HistoricalData = () => {
  const dispatch: AppDispatch = useDispatch();
  const { historicalData, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  // State for selected coin, time range, and custom date range
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("7");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(7, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // Fetch historical data based on selected options
  useEffect(() => {
    if (timeRange === "custom") {
      if (!startDate || !endDate) return;

      const start = startDate.format("YYYY-MM-DD");
      const end = endDate.format("YYYY-MM-DD");

      console.log(
        "Fetching custom historical data for:",
        selectedCoin,
        start,
        end
      );
      dispatch(
        fetchHistoricalData({ id: selectedCoin, days: "custom", start, end })
      );
    } else {
      console.log("Fetching historical data for:", selectedCoin, timeRange);
      dispatch(fetchHistoricalData({ id: selectedCoin, days: timeRange }));
    }
  }, [selectedCoin, timeRange, startDate, endDate, dispatch]);

  // Format data for the chart
  const formattedData =
    historicalData[selectedCoin]?.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      price: parseFloat(entry.price.toFixed(2)),
      tooltip: {
        date: new Date(entry.date).toLocaleString(),
        price: `$${entry.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      },
    })) || [];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
          <Typography variant="subtitle2">
            {payload[0].payload.tooltip.date}
          </Typography>
          <Typography variant="body1" color="primary">
            Price: {payload[0].payload.tooltip.price}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Cryptocurrency Historical Data
      </Typography>

      {/* Controls */}
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
          {/* Cryptocurrency Selector */}
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
                <MenuItem value="dogecoin">Dogecoin</MenuItem>
                <MenuItem value="cardano">Cardano</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Time Range Selector */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="time-range-select-label">Time Range</InputLabel>
              <Select
                labelId="time-range-select-label"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="1">24 Hours</MenuItem>
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
                <MenuItem value="90">90 Days</MenuItem>
                <MenuItem value="365">1 Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Custom Date Range Picker */}
          {timeRange === "custom" && (
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Chart */}
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
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <ResponsiveContainer>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2196f3"
                strokeWidth={2}
                dot={false}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default HistoricalData;
