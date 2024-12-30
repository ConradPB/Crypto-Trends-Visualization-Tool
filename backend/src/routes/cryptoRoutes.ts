import express from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = express.Router();

// Define the route with properly typed parameters
router.get('/prices', (req: express.Request, res: express.Response) => {
    console.log(`Crypto prices route hit with query: ${JSON.stringify(req.query)}`);
    getCryptoPrices(req, res);
});

export default router;
