import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../features/cryptoSlice";
import { RootState } from "../store";


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