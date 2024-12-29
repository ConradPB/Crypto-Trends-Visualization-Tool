"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoController_1 = require("../controllers/cryptoController");
const router = (0, express_1.Router)();
// router.use((req, res, next) => {
// console.log(`Crypto route handler: ${req.method} ${req.url}`);
// next();
//}); 
// Log when the route is hit
router.get('/prices', (req, res, next) => {
    console.log('Crypto prices route accessed');
    next();
}, cryptoController_1.getCryptoPrices);
exports.default = router;
