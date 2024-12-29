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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    ids: joi_1.default.string().required().messages({
        'string.base': `"ids" should be a string`,
        'string.empty': `"ids" cannot be an empty field`,
        'any.required': `"ids" is a required field`,
    }),
    vs_currencies: joi_1.default.string().required().messages({
        'string.base': `"vs_currencies" should be a string`,
        'string.empty': `"vs_currencies" cannot be an empty field`,
        'any.required': `"vs_currencies" is a required field`,
    }),
});
const getCryptoPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { ids, vs_currencies } = req.query;
    try {
        const response = yield axios_1.default.get('https://api.fakeurl.com/sile/price', {
            params: { ids, vs_currencies },
        });
        res.json(response.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
});
exports.getCryptoPrices = getCryptoPrices;
