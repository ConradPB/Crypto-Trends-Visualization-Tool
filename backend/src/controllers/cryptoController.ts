import { Request, Response } from 'express';
import axios from 'axios';

const DEBUG = true;

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        if (DEBUG) console.log('Attempting API call to CoinGecko');

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids: req.query.ids || 'bitcoin',
                vs_currencies: req.query.vs_currencies || 'usd'
            },
            headers: {
                'accept': 'application/json',
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY
            }
        });

        if (DEBUG) console.log('Response received:', response.data);
        res.json(response.data);

    } catch (error: any) {
        if (DEBUG) {
            console.error('API Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }

        if (error.response?.status === 429) {
            res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            return;
        }

        res.status(500).json({ 
            error: 'Failed to fetch crypto prices',
            details: error.response?.data?.error || error.message
        });
    }
};