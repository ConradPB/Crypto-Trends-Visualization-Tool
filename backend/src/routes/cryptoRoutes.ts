import { Router } from 'express';
import { getCryptoPrices, getHistoricalData, getTrendingCoins, } from '../controllers/cryptoController';

const router: Router = Router();

router.get('/prices', getCryptoPrices);
router.get('/historical', getHistoricalData);
router.get('/trending', getTrendingCoins);



export default router;
