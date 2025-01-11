import { Router } from 'express';
import { getCryptoPrices, getHistoricalData, } from '../controllers/cryptoController';

const router: Router = Router();

router.get('/prices', getCryptoPrices);
router.get('/historical', getHistoricalData);


export default router;
