import { Request, Response } from 'express';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching prices in controller:', error instanceof Error ? error.message : error);
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};
