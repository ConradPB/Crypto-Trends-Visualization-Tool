import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

// Create a wrapper function for logging
const logError = (error: any) => {
    console.error('=== Error Details Start ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error:', error);
    if (error.stack) console.error('Stack:', error.stack);
    console.error('=== Error Details End ===');
};

export const getCryptoPrices = async (req: Request, res: Response) => {
    // Force immediate console output
    console.log('Controller started:', new Date().toISOString());

    // Wrap everything in a try-catch at the highest level
    try {
        const baseURL = 'https://api.coingecko.com/api/v3';
        const endpoint = '/simple/price';
        
        // Extract and log query parameters
        const ids = req.query.ids?.toString() || 'bitcoin,ethereum';
        const vs_currencies = req.query.vs_currencies?.toString() || 'usd';
        
        console.log('Making request with params:', { ids, vs_currencies });

        // Test the API connection first
        try {
            const pingResponse = await axios.get(`${baseURL}/ping`);
            console.log('CoinGecko API ping response:', pingResponse.status);
        } catch (pingError) {
            console.error('Ping failed:', pingError);
            throw new Error('Failed to connect to CoinGecko API');
        }

        // Make the main API request
        const response = await axios({
            method: 'get',
            url: `${baseURL}${endpoint}`,
            params: {
                ids,
                vs_currencies
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 5000,
            validateStatus: (status) => status === 200 // Only accept 200 as valid
        });

        // Validate response
        if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error('Empty response received from CoinGecko');
        }

        console.log('Successful response:', response.data);
        return res.status(200).json(response.data);

    } catch (error) {
        // Log the full error details
        logError(error);

        // Handle specific error types
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            
            // Log specific Axios error details
            console.error('Axios Error Config:', axiosError.config);
            console.error('Axios Error Response:', axiosError.response?.data);

            if (axiosError.response) {
                return res.status(axiosError.response.status).json({
                    error: 'CoinGecko API error',
                    details: axiosError.response.data,
                    status: axiosError.response.status
                });
            }

            return res.status(503).json({
                error: 'Service temporarily unavailable',
                details: axiosError.message
            });
        }

        // Generic error response
        return res.status(500).json({
            error: 'Failed to fetch crypto prices',
            details: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};