import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;
        
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { 
                ids, 
                vs_currencies 
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            
            if (axiosError.response) {
                res.status(axiosError.response.status).json({
                    error: 'CoinGecko API error',
                    details: axiosError.response.data
                });
                return;
            }
        }
        
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};