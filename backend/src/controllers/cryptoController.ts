import { Request, Response } from 'express';
import axios from 'axios';
import Joi from 'joi';

const schema = Joi.object({
    ids: Joi.string()
        .default('bitcoin,ethereum')
        .messages({
            'string.base': `"ids" should be a string`,
            'string.empty': `"ids" cannot be an empty field`,
        }),
    vs_currencies: Joi.string()
        .default('usd')
        .messages({
            'string.base': `"vs_currencies" should be a string`,
            'string.empty': `"vs_currencies" cannot be an empty field`,
        }),
});

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        // Log incoming request
        console.log('Incoming request query parameters:', req.query);

        // Validate parameters
        const { value, error } = schema.validate(req.query, { stripUnknown: true });
        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { ids, vs_currencies } = value;
        console.log(`Validated parameters - ids: ${ids}, vs_currencies: ${vs_currencies}`);

        // Construct request URL for logging
        const url = 'https://api.coingecko.com/api/v3/simple/price';
        console.log('Making request to:', url, 'with params:', { ids, vs_currencies });

        // Make the API request
        const response = await axios.get(url, {
            params: { ids, vs_currencies },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Crypto Price Fetcher'
            },
            timeout: 5000 // 5 second timeout
        });

        console.log('CoinGecko API response status:', response.status);
        console.log('CoinGecko API response data:', response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error('Empty response from CoinGecko API');
        }

        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error details:');
        if (axios.isAxiosError(err)) {
            console.error('Axios error:', {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                responseData: err.response?.data,
                config: {
                    url: err.config?.url,
                    params: err.config?.params,
                    headers: err.config?.headers
                }
            });
            
            return res.status(err.response?.status || 500).json({ 
                error: 'Failed to fetch crypto prices',
                details: err.response?.data || err.message
            });
        } else {
            console.error('Unexpected error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch crypto prices',
                details: err instanceof Error ? err.message : 'Unknown error occurred'
            });
        }
    }
};