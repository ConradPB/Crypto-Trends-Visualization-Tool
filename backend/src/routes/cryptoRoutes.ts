import { Router } from 'express';
import { 
    getCryptoPrices, 
    getHistoricalData, 
    getTrendingCoins, 
    getMarketData 
} from '../controllers/cryptoController';
import { validate } from '../middleware/validation';
import { cryptoLimiter } from '../middleware/rateLimit';
import { cacheMiddleware } from '../middleware/Cache';

const router = Router();

router.get('/prices', 
    cryptoLimiter,
    validate('prices'),
    cacheMiddleware,
    getCryptoPrices
);

router.get('/historical', 
    cryptoLimiter,
    validate('historical'),
    cacheMiddleware,
    getHistoricalData
);

router.get('/trending', 
    cryptoLimiter,
    cacheMiddleware,
    getTrendingCoins
);

router.get('/markets', 
    cryptoLimiter,
    validate('markets'),
    cacheMiddleware,
    getMarketData
);

export default router;