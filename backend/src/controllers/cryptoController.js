"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoPrices = void 0;
const cryptoService_1 = require("../services/cryptoService");
const getCryptoPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, vs_currencies } = req.query;
    if (!ids || !vs_currencies) {
        res.status(400).json({ error: 'Missing required query parameters: ids, vs_currencies' });
        return; // Ensure the function exits here without returning anything.
    }
    try {
        const data = yield (0, cryptoService_1.fetchCryptoPrices)(ids, vs_currencies);
        res.json(data); // Send the response and ensure there's no return.
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage }); // Send the error response without returning.
    }
});
exports.getCryptoPrices = getCryptoPrices;
