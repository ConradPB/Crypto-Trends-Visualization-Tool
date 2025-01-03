import { Request, Response } from 'express';
import axios from 'axios';

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids: req.query.ids || 'bitcoin',
                vs_currencies: req.query.vs_currencies || 'usd',
                include_24hr_change: true,
                include_market_cap: true
            },
            headers: {
                'accept': 'application/json',
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
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