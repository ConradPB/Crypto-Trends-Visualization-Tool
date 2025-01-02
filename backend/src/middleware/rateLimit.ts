import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Add type definition for the rate limit info
interface RateLimitInfo {
    resetTime: Date;
}

// Extend Express Request type
declare module 'express' {
    export interface Request {
        rateLimit?: RateLimitInfo;
    }
}

export const cryptoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes'
    },
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: 'Rate limit exceeded',
            // Use optional chaining since we declared rateLimit as optional
            retryAfter: req.rateLimit?.resetTime 
                ? Math.ceil(req.rateLimit.resetTime.getTime() - Date.now()) / 1000 
                : 900 // 15 minutes in seconds as fallback
        });
    }
});