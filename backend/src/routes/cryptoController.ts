import { Request, Response } from 'express';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids: req.query.ids || 'bitcoin,ethereum',
                vs_currencies: req.query.vs_currencies || 'usd'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching prices:', error.message);
        res.status(500).json({ error: 'Failed to fetch prices' });
    }
};
