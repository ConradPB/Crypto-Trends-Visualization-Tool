import { Request, Response, RequestHandler } from 'express';
import { fetchCryptoPrices } from '../services/cryptoService';

export const getCryptoPrices: RequestHandler = async (req, res) => {
    console.log('Inside getCryptoPrices');
    const { ids, vs_currencies } = req.query;

    if (!ids || !vs_currencies) {
        res.status(400).json({ error: 'Missing required query parameters: ids, vs_currencies' });
        return;
    }

    try {
        const axios = require('axios');
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies }
        });
        console.log('CoinGecko API Response:', response.data); // Log the response
        res.json(response.data);
    } catch (error) {
        console.error('Error calling CoinGecko API:', error);
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};

