import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        console.log('1. Request received with query params:', req.query);

        // Input validation
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;
        console.log('2. Parsed parameters:', { ids, vs_currencies });
        
        if (!ids || typeof ids !== 'string') {
            console.log('3. Input validation failed');
            return res.status(400).json({ 
                error: 'Invalid cryptocurrency IDs provided' 
            });
        }

        // Add rate limiting headers
        const headers = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip,deflate,compress'
        };
        
        const url = 'https://api.coingecko.com/api/v3/simple/price';
        console.log('4. Making request to:', url, {
            params: { ids, vs_currencies },
            headers
        });

        // Make the API call to CoinGecko with timeout
        const response = await axios.get(url, {
            params: { 
                ids, 
                vs_currencies 
            },
            headers,
            timeout: 10000 // 10 second timeout
        });

        console.log('5. Received response:', response.status, response.statusText);
        console.log('6. Response data:', response.data);

        // Validate response data
        if (!response.data || Object.keys(response.data).length === 0) {
            console.log('7. No data found in response');
            return res.status(404).json({ 
                error: 'No data found for the specified cryptocurrencies' 
            });
        }

        // Return the API response
        console.log('8. Sending successful response');
        return res.status(200).json(response.data);

    } catch (error) {
        console.log('ERROR CAUGHT:', error);
        
        // Enhanced error handling
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.log('Axios Error Details:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
                code: axiosError.code
            });
            
            if (axiosError.response) {
                return res.status(axiosError.response.status).json({
                    error: `CoinGecko API error: ${JSON.stringify(axiosError.response.data)}`,
                    status: axiosError.response.status
                });
            } else if (axiosError.request) {
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