import { Router } from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = Router();

// Log when the route is hit
router.get('/prices', (req, res, next) => {
    console.log('Crypto prices route accessed');
    next();
}, getCryptoPrices);

export default router;
