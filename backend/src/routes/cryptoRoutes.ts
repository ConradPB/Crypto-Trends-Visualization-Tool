import { Router } from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';
import { validateCryptoRequest } from '../middleware/validation';
import { cryptoLimiter } from '../middleware/rateLimit';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

router.get('/prices', 
    cryptoLimiter,
    validateCryptoRequest,
    cacheMiddleware,
    getCryptoPrices
);

export default router;