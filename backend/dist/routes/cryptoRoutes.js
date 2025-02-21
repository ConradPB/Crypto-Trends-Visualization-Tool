"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoController_1 = require("../controllers/cryptoController");
const validation_1 = require("../middleware/validation");
const validationSchemas_1 = require("../Schemas/validationSchemas");
const rateLimit_1 = require("../middleware/rateLimit");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/prices', rateLimit_1.cryptoLimiter, (0, validation_1.validateRequest)(validationSchemas_1.pricesSchema), cache_1.cacheMiddleware, cryptoController_1.getCryptoPrices);
router.get('/historical', rateLimit_1.cryptoLimiter, (0, validation_1.validateRequest)(validationSchemas_1.historicalSchema), cache_1.cacheMiddleware, cryptoController_1.getHistoricalData);
router.get('/trending', rateLimit_1.cryptoLimiter, (0, validation_1.validateRequest)(validationSchemas_1.trendingSchema), cache_1.cacheMiddleware, cryptoController_1.getTrendingCoins);
router.get('/markets', rateLimit_1.cryptoLimiter, (0, validation_1.validateRequest)(validationSchemas_1.marketSchema), cache_1.cacheMiddleware, cryptoController_1.getMarketData);
exports.default = router;
//# sourceMappingURL=cryptoRoutes.js.map