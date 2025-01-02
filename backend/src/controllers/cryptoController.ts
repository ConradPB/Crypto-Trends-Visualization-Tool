import { Request, Response } from 'express';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        // Extract query parameters
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;

        // Make the API call to CoinGecko
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies },
        });

        // Return the API response
        res.status(200).json(response.data);
    } catch (error) {
        // Handle error
        console.error('Error fetching crypto prices:', error instanceof Error ? error.message : error);
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};
