import { Request, Response } from 'express';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract and validate query parameters
        const ids = req.query.ids as string || 'bitcoin';
        const vs_currencies = req.query.vs_currencies as string || 'usd';

        if (!ids || !vs_currencies) {
            res.status(400).json({ error: 'Missing required query parameters: ids and vs_currencies' });
            return;
        }

        // Send request to CoinGecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids,
                vs_currencies,
            },
            headers: {
                'accept': 'application/json',
                ...(process.env.COINGECKO_API_KEY && { 'x-cg-pro-api-key': process.env.COINGECKO_API_KEY }),
            },
        });

        // Return the data to the client
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching crypto prices:', error.message);
        if (axios.isAxiosError(error) && error.response) {
            // Include more specific error information for debugging
            res.status(error.response.status).json({ 
                error: error.response.data || 'Failed to fetch crypto prices' 
            });
        } else {
            res.status(500).json({ error: 'Failed to fetch crypto prices' });
        }
    }
};


export const getHistoricalData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, days = '7', interval = 'daily' } = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days,
                interval
            },
            headers: {
                'accept': 'application/json',
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch historical data' });
    }
};

export const getTrendingCoins = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending', {
            headers: {
                'accept': 'application/json',
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch trending coins' });
    }
};

export const getMarketData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, per_page = 100, sparkline = true } = req.query;
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                page,
                per_page,
                sparkline,
                price_change_percentage: '1h,24h,7d'
            },
            headers: {
                'accept': 'application/json',
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
};