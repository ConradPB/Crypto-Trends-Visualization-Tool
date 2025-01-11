import { Router } from 'express';
import { getCryptoPrices, } from '../controllers/cryptoController';

const router: Router = Router();

router.get('/prices', getCryptoPrices);

export default router;
