import express from 'express';
import { getCryptoPrices } from '../controllers/cryptoController';

const router = express.Router();

router.get('/prices', getCryptoPrices);

export default router;
