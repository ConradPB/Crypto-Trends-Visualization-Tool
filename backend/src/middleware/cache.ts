import { Request, Response, NextFunction } from 'express';
import { cache } from '../services/cacheService';

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Create a cache key from the request query parameters
    const key = `crypto-${req.query.ids}-${req.query.vs_currencies}`;
    
    // Try to get data from cache
    const cachedData = cache.get(key);
    
    if (cachedData) {
        console.log('Cache hit for:', key);
        return res.json(cachedData);
    }

    // Store the original send function
    const originalSend = res.json;
    
    // Override res.json to cache the data before sending
    res.json = function (body) {
        // Cache the response data
        cache.set(key, body);
        return originalSend.call(this, body);
    };

    next();
};