import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation schemas for different endpoints
const schemas = {
    prices: Joi.object({
        ids: Joi.string()
            .required()
            .pattern(/^[a-z0-9-,]+$/)
            .message('Cryptocurrency IDs must be lowercase, comma-separated values'),
        vs_currencies: Joi.string()
            .default('usd')
            .pattern(/^[a-z,]+$/)
            .message('Currencies must be lowercase, comma-separated values')
    }),

    historical: Joi.object({
        id: Joi.string()
            .required()
            .pattern(/^[a-z0-9-]+$/)
            .message('Cryptocurrency ID must be lowercase alphanumeric'),
        days: Joi.string()
            .pattern(/^[0-9]+$/)
            .default('7')
            .message('Days must be a number'),
        interval: Joi.string()
            .valid('daily', 'hourly')
            .default('daily')
    }),

    markets: Joi.object({
        page: Joi.number()
            .integer()
            .min(1)
            .default(1),
        per_page: Joi.number()
            .integer()
            .min(1)
            .max(250)
            .default(100),
        sparkline: Joi.boolean()
            .default(true)
    })
};

// Create validation middleware factory
export const validate = (schemaName: keyof typeof schemas) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schemas[schemaName].validateAsync(req.query, {
                abortEarly: false,
                stripUnknown: true // Remove any unknown parameters
            });
            req.query = validated;
            next();
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                const errorMessages = error.details.map(detail => detail.message);
                return res.status(400).json({
                    error: 'Validation Error',
                    details: errorMessages
                });
            }
            next(error);
        }
    };
};