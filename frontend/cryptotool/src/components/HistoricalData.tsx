import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../features/cryptoSlice";
import { RootState } from "../store";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const HistoricalData: React.FC = () => {
    const dispatch = useDispatch();
    const { HistoricalData, loading, error } = useSelector((state: RootState) => state.crypto);
  
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [timeRange, setTimeRange] = useState('7');
  
    // Fetching historical data on coin or time range change
    useEffect(() => {
      dispatch(fetchHistoricalData({ id: selectedCoin, days: timeRange }));
    }, [selectedCoin, timeRange, dispatch]);
    // Format data for the chart
    const formattedData = historicalData[selectedCoin]?.prices?.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString(), price,
    })) || [];

    return (
        <Box padding={4}>
          <Typography variant="h4" gutterBottom>
            Historical Data
          </Typography>
    
          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <InputLabel id="coin-select-label">Cryptocurrency</InputLabel>
            <Select
              labelId="coin-select-label"
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              <MenuItem value="bitcoin">Bitcoin</MenuItem>
              <MenuItem value="ethereum">Ethereum</MenuItem>
            </Select>
          </FormControl>
    
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="time-range-select-label">Time Range</InputLabel>
            <Select
              labelId="time-range-select-label"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7">7 Days</MenuItem>
              <MenuItem value="30">30 Days</MenuItem>
            </Select>
          </FormControl>
    
          {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Box mt={4} height={400}>
          <ResponsiveContainer>
            <LineChart data={formattedData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};
    
    export default HistoricalData;