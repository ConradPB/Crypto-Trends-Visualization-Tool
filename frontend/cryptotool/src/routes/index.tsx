import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import CryptoPrices from "../components/CryptoPrices";
import HistoricalData from "../components/HistoricalData";
import TrendingCoins from "../pages/TrendingCoins";
import PriceAlerts from "../components/PriceAlerts";
import AlertHistory from "../components/AlertHistory";
import SupportMe from "../pages/SupportMe";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/alerts" element={<PriceAlerts />} />
    <Route path="/crypto" element={<CryptoPrices />} />
    <Route path="/support-me" element={<SupportMe />} />
    <Route path="/trending" element={<TrendingCoins />} />
    <Route path="/historical" element={<HistoricalData />} />
    <Route path="/alerts-history" element={<AlertHistory />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
