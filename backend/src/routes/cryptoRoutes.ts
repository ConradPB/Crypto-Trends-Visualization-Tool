import { Router } from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';
import { validateCryptoRequest } from '../middleware/validation';

const router = Router();

router.get('/prices', validateCryptoRequest, getCryptoPrices);

export default router;