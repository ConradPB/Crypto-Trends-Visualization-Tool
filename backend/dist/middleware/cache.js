"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 600 });
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        res.json(cachedResponse);
    }
    else {
        const originalSend = res.send.bind(res);
        res.send = (body) => {
            cache.set(key, JSON.parse(body));
            return originalSend(body);
        };
        next();
    }
};
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=cache.js.map