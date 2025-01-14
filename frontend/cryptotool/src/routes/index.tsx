import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import CryptoPrices from '../components/CryptoPrices';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/crypto" element={<CryptoPrices />} />
        </Routes>
    </Router>
);

export default AppRoutes;
