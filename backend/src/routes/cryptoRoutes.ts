import { Router } from 'express';
import { 
    getCryptoPrices, 
    getHistoricalData, 
    getTrendingCoins, 
    getMarketData 
} from '../controllers/cryptoController';
import { validateCryptoRequest } from '../middleware/validation';
import { cryptoLimiter } from '../middleware/rateLimit';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

router.get('/prices', cryptoLimiter, validateCryptoRequest, cacheMiddleware, getCryptoPrices);
router.get('/historical', cryptoLimiter, cacheMiddleware, getHistoricalData);
router.get('/trending', cryptoLimiter, cacheMiddleware, getTrendingCoins);
router.get('/markets', cryptoLimiter, cacheMiddleware, getMarketData);

export default router;