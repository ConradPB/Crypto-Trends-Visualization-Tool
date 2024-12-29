import { Request, Response } from 'express';
import axios from 'axios';
import Joi from 'joi';

const schema = Joi.object({
    ids: Joi.string().required().messages({
        'string.base': `"ids" should be a string`,
        'string.empty': `"ids" cannot be an empty field`,
        'any.required': `"ids" is a required field`,
    }),
    vs_currencies: Joi.string().required().messages({
        'string.base': `"vs_currencies" should be a string`,
        'string.empty': `"vs_currencies" cannot be an empty field`,
        'any.required': `"vs_currencies" is a required field`,
    }),
});

export const getCryptoPrices = async (req: Request, res: Response) => {
    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { ids, vs_currencies } = req.query;

    try {
        const response = await axios.get('https://api.fakeurl.com/sile/price', {
            params: { ids, vs_currencies },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
};
