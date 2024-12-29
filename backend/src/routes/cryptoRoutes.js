"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cryptoController_1 = require("../controllers/cryptoController");
const router = express_1.default.Router();
// Define the route with properly typed parameters
router.get('/prices', (req, res) => {
    (0, cryptoController_1.getCryptoPrices)(req, res);
});
exports.default = router;
