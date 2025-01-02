import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        // Input validation
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;
        
        if (!ids || typeof ids !== 'string') {
            return res.status(400).json({ 
                error: 'Invalid cryptocurrency IDs provided' 
            });
        }

        // Add rate limiting headers
        const headers = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip,deflate,compress'
        };

        // Make the API call to CoinGecko with timeout
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids, 
                vs_currencies 
            },
            headers,
            timeout: 10000 // 10 second timeout
        });

        // Validate response data
        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(404).json({ 
                error: 'No data found for the specified cryptocurrencies' 
            });
        }

        // Return the API response
        return res.status(200).json(response.data);

    } catch (error) {
        // Enhanced error handling
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return res.status(axiosError.response.status).json({
                    error: `CoinGecko API error: ${axiosError.response.data}`,
                    status: axiosError.response.status
                });
            } else if (axiosError.request) {
                // The request was made but no response was received
                return res.status(503).json({
                    error: 'Unable to reach CoinGecko API. Please try again later.',
                    details: 'Network error or service unavailable'
                });
            } else if (axiosError.code === 'ECONNABORTED') {
                return res.status(408).json({
                    error: 'Request timeout',
                    details: 'The request to CoinGecko API timed out'
                });
            }
        }

        // Generic error handler
        console.error('Unexpected error:', error);
        return res.status(500).json({
            error: 'An unexpected error occurred while fetching crypto prices',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
