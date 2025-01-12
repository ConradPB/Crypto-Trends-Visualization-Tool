import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const key = req.originalUrl;

    // Check if response is cached
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        res.json(cachedResponse);
    } else {
        // Capture the response body
        const originalSend = res.send.bind(res);

        res.send = (body: any) => {
            // Cache the response
            cache.set(key, JSON.parse(body));
            return originalSend(body);
        };

        next();
    }
};
