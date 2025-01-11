import { Router } from 'express';
import { getCryptoPrices, getHistoricalData, getMarketData, getTrendingCoins, } from '../controllers/cryptoController';

const router: Router = Router();

router.get('/prices', getCryptoPrices);
router.get('/historical', getHistoricalData);
router.get('/trending', getTrendingCoins);
router.get('/markets', getMarketData);




export default router;
