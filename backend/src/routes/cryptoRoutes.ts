import { Router } from 'express';
import { 
    getCryptoPrices, 
    getHistoricalData, 
    getTrendingCoins, 
    getMarketData 
} from '../controllers/cryptoController';
import { validateRequest } from '../middleware/validation';
import { pricesSchema, historicalSchema, trendingSchema, marketSchema } from '../Schemas/validationSchemas';
import { cryptoLimiter } from '../middleware/rateLimit';
import { cacheMiddleware } from '../middleware/cache';

const router: Router = Router();

router.get('/prices',
    cryptoLimiter,
    validateRequest(pricesSchema),
    cacheMiddleware,
    getCryptoPrices
);

router.get('/historical',
    cryptoLimiter,
    validateRequest(historicalSchema),
    cacheMiddleware,
    getHistoricalData
);

router.get('/trending',
    cryptoLimiter,
    validateRequest(trendingSchema),
    cacheMiddleware,
    getTrendingCoins
);

router.get('/markets',
    cryptoLimiter,
    validateRequest(marketSchema),
    cacheMiddleware,
    getMarketData
);

export default router;
