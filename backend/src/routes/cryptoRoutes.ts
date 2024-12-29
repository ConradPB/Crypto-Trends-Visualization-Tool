import express from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = express.Router();

// Define the route with properly typed parameters
router.get('/prices', (req: express.Request, res: express.Response) => {
    getCryptoPrices(req, res);
});

export default router;
