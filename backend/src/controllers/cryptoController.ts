import { Request, Response } from 'express';
import axios from 'axios';
import logger from '../utils/logger';

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids: req.query.ids || 'bitcoin,ethereum',
                vs_currencies: req.query.vs_currencies || 'usd'
            }
        });
        logger.info(`Fetched prices for: ${req.query.ids || 'bitcoin,ethereum'}`);
        res.json(response.data);
    } catch (error: any) {
        logger.error(`Error fetching prices: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch prices' });
    }
};

export const getHistoricalData = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract query parameters
        const { id = 'bitcoin', days = '7', interval = 'daily', start, end } = req.query;

        // Validate required parameters
        if (!id) {
            res.status(400).json({ error: 'Cryptocurrency ID is required' });
            return;
        }

        // Build the API URL dynamically based on the presence of `start` and `end`
        let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;

        // Construct query parameters
        const params: Record<string, string | number> = {
            vs_currency: 'usd',
        };

        if (start && end) {
            // Use `from` and `to` for custom date ranges
            params.from = Math.floor(new Date(start as string).getTime() / 1000); // Convert to Unix timestamp
            params.to = Math.floor(new Date(end as string).getTime() / 1000);
        } else {
            // Use `days` and `interval` for predefined time ranges
            params.days = days as string;
            params.interval = interval as string;
        }

        // Fetch data from CoinGecko API
        const response = await axios.get(url, {
            params,
            headers: {
                'accept': 'application/json',
            },
        });

        // Format the response data
        const prices = response.data.prices.map((item: [number, number]) => ({
            date: new Date(item[0]).toISOString(),
            price: item[1],
        }));

        // Return formatted data
        const formattedData = {
            [id as string]: prices,
        };

        // Log success
        logger.info(`Fetched historical data for: ${id}, Days: ${days}, Interval: ${interval}, Start: ${start}, End: ${end}`);
        res.json(formattedData);
    } catch (error: any) {
        // Handle errors
        logger.error(`Error fetching historical data: ${error.message}`);
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

        // Transformed the data to match frontend expectations
        const transformedData = {
            coins: response.data.coins.map((item: any) => ({
                id: item.item.id,
                name: item.item.name,
                symbol: item.item.symbol,
                marketCapRank: item.item.market_cap_rank
            }))
        };

        logger.info('Fetched trending coins');
        res.json(transformedData);
    } catch (error: any) {
        logger.error(`Error fetching trending coins: ${error.message}`);
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

        logger.info(`Fetched market data: VS Currency: ${vs_currency}, Order: ${order}, Page: ${page}, Per Page: ${per_page}`);
        res.json(response.data);
    } catch (error: any) {
        logger.error(`Error fetching market data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
};
