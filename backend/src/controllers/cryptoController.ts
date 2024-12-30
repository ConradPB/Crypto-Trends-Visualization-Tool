import { Request, Response } from 'express';
import axios from 'axios';
import Joi from 'joi';

const schema = Joi.object({
    ids: Joi.string().default('bitcoin,ethereum'),
    vs_currencies: Joi.string().default('usd')
});

const apiUrl = process.env.COINGECKO_API_URL;

export const getCryptoPrices = async (req: Request, res: Response) => {
    try {
        console.log('Simulating API response');
        const mockResponse = {
            bitcoin: { usd: 50000 },
            ethereum: { usd: 4000 },
        };
        return res.status(200).json(mockResponse);
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};