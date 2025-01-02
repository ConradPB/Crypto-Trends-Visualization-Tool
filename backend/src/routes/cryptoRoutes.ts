import { Router } from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

// Create router instance
const router = Router();


 router.get('/prices', async (req, res, next) => {
     try {
         await getCryptoPrices(req, res);
     } catch (error) {
         next(error);
     }
 });

export default router;