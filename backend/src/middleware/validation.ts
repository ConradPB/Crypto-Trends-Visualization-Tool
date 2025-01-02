import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const cryptoSchema = Joi.object({
    ids: Joi.string().required(),
    vs_currencies: Joi.string().default('usd')
});

export const validateCryptoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validated = await cryptoSchema.validateAsync(req.query);
        req.query = validated;
        next();
    } catch (err) {
        res.status(400).json({ error: (err as any).message });
    }
};