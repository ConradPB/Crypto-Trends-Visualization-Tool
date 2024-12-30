import express from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = express.Router();

router.get('/prices', (req: express.Request, res: express.Response) => {
    console.log('Route handler called');
    try {
        getCryptoPrices(req, res).catch(error => {
            console.error('Controller error:', error);
            res.status(500).json({ error: 'Failed to fetch crypto prices' });
        });
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({ error: 'Route handler failed' });
    }
});

export default router;