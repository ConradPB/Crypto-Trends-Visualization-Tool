import { Request, Response } from 'express';
import axios from 'axios';

// Define the controller
export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;

        // Make the external API request
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies },
        });

        // Send response back to client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in getCryptoPrices:', error instanceof Error ? error.message : error);
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};
