import { Request, Response } from 'express-serve-static-core';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response) => {
    const { ids, vs_currencies } = req.query as { ids: string; vs_currencies: string };

    if (!ids || !vs_currencies) {
        return res.status(400).json({ error: 'Missing required query parameters: ids and vs_currencies' });
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies },
        });

        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching data from CoinGecko:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};
