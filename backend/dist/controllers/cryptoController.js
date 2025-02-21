"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketData = exports.getTrendingCoins = exports.getHistoricalData = exports.getCryptoPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
const getCryptoPrices = async (req, res) => {
    try {
        const response = await axios_1.default.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: req.query.ids || 'bitcoin,ethereum',
                vs_currencies: req.query.vs_currencies || 'usd'
            }
        });
        logger_1.default.info(`Fetched prices for: ${req.query.ids || 'bitcoin,ethereum'}`);
        res.json(response.data);
    }
    catch (error) {
        logger_1.default.error(`Error fetching prices: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch prices' });
    }
};
exports.getCryptoPrices = getCryptoPrices;
const getHistoricalData = async (req, res) => {
    try {
        const { id = 'bitcoin', days = '7', interval = 'daily', start, end } = req.query;
        if (!id) {
            res.status(400).json({ error: 'Cryptocurrency ID is required' });
            return;
        }
        let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
        const params = {
            vs_currency: 'usd',
        };
        if (start && end) {
            params.from = Math.floor(new Date(start).getTime() / 1000);
            params.to = Math.floor(new Date(end).getTime() / 1000);
        }
        else {
            params.days = days;
            params.interval = interval;
        }
        const response = await axios_1.default.get(url, {
            params,
            headers: {
                'accept': 'application/json',
            },
        });
        const prices = response.data.prices.map((item) => ({
            date: new Date(item[0]).toISOString(),
            price: item[1],
        }));
        const formattedData = {
            [id]: prices,
        };
        logger_1.default.info(`Fetched historical data for: ${id}, Days: ${days}, Interval: ${interval}, Start: ${start}, End: ${end}`);
        res.json(formattedData);
    }
    catch (error) {
        logger_1.default.error(`Error fetching historical data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch historical data' });
    }
};
exports.getHistoricalData = getHistoricalData;
const getTrendingCoins = async (_req, res) => {
    try {
        const response = await axios_1.default.get('https://api.coingecko.com/api/v3/search/trending', {
            headers: {
                'accept': 'application/json',
            },
        });
        const transformedData = {
            coins: response.data.coins.map((item) => ({
                id: item.item.id,
                name: item.item.name,
                symbol: item.item.symbol,
                marketCapRank: item.item.market_cap_rank
            }))
        };
        logger_1.default.info('Fetched trending coins');
        res.json(transformedData);
    }
    catch (error) {
        logger_1.default.error(`Error fetching trending coins: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch trending coins' });
    }
};
exports.getTrendingCoins = getTrendingCoins;
const getMarketData = async (req, res) => {
    try {
        const { vs_currency = 'usd', order = 'market_cap_desc', per_page = 10, page = 1, sparkline = false } = req.query;
        const response = await axios_1.default.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency,
                order,
                per_page,
                page,
                sparkline,
            },
            headers: {
                'accept': 'application/json',
            },
        });
        logger_1.default.info(`Fetched market data: VS Currency: ${vs_currency}, Order: ${order}, Page: ${page}, Per Page: ${per_page}`);
        res.json(response.data);
    }
    catch (error) {
        logger_1.default.error(`Error fetching market data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
};
exports.getMarketData = getMarketData;
//# sourceMappingURL=cryptoController.js.map