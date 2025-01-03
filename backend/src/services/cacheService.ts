import NodeCache from 'node-cache';

// Initialize cache with a 5 minute TTL (Time To Live)
export const cache = new NodeCache({
    stdTTL: 300, // 5 minutes in seconds
    checkperiod: 60 // Check for expired entries every 60 seconds
});