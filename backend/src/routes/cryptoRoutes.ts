import express from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = express.Router();

// Route definition
router.get('/prices', getCryptoPrices);

export default router;
