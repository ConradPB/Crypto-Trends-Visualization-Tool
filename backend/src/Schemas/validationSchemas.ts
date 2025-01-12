import Joi from 'joi';

export const pricesSchema = Joi.object({
    ids: Joi.string()
        .pattern(/^[a-z0-9,-]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid cryptocurrency IDs format. Use comma-separated lowercase IDs.',
        }),
    vs_currencies: Joi.string()
        .pattern(/^[a-z,]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid currencies format. Use comma-separated currency codes.',
        }),
});

export const historicalSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'Cryptocurrency ID is required.',
    }),
    days: Joi.string()
        .pattern(/^\d+$/)
        .required()
        .messages({
            'string.pattern.base': 'Days must be a number.',
        }),
    interval: Joi.string()
        .valid('daily', 'hourly', 'minute')
        .optional(),
});

export const trendingSchema = Joi.object({});

export const marketSchema = Joi.object({
    vs_currency: Joi.string().required().messages({
        'any.required': 'Currency is required.',
    }),
    order: Joi.string().optional(),
    per_page: Joi.number().optional(),
    page: Joi.number().optional(),
    sparkline: Joi.boolean().optional(),
});
