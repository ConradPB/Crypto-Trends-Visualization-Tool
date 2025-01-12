import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(
            { ...req.body, ...req.params, ...req.query },
            { abortEarly: false }
        );

        if (error) {
            res.status(400).json({
                error: 'Validation Error',
                details: error.details.map((detail) => detail.message),
            });
        } else {
            next();
        }
    };
};
