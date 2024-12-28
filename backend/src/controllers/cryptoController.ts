import { Request, Response } from 'express';
import { fetchCryptoPrices } from '../services/cryptoService';

export const getCryptoPrices = async (req: Request, res: Response) => {
    const { ids, vs_currencies } = req.query;

    if (!ids || !vs_currencies) {
        return res.status(400).json({ error: 'Missing required query parameters: ids, vs_currencies' });
    }

    try {
        const data = await fetchCryptoPrices(ids as string, vs_currencies as string);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
