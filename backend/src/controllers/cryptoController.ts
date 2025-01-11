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


export const getHistoricalData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id = 'bitcoin', days = '7', interval = 'daily' } = req.query;

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days,
                interval,
            },
            headers: {
                'accept': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching historical data:', error.message);
        res.status(500).json({ error: 'Failed to fetch historical data' });
    }
};

export const getTrendingCoins = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending', {
            headers: {
                'accept': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching trending coins:', error.message);
        res.status(500).json({ error: 'Failed to fetch trending coins' });
    }
};

export const getMarketData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { vs_currency = 'usd', order = 'market_cap_desc', per_page = 10, page = 1, sparkline = false } = req.query;

        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency,
                order,
                per_page,
                page,
                sparkline,
            },
            headers: {
                'accept': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching market data:', error.message);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
};