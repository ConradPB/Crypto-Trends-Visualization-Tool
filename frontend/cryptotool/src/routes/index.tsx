import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import CryptoPrices from '../components/CryptoPrices';
import HistoricalData from '../components/HistoricalData';
import TrendingCoins from '../pages/TrendingCoins';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/crypto" element={<CryptoPrices />} />
            <Route path="/trending" element={<TrendingCoins />} />
            <Route path="/historical" element={<HistoricalData />} />

        </Routes>
    </Router>
);

export default AppRoutes;
