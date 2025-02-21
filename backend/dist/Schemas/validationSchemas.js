"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketSchema = exports.trendingSchema = exports.historicalSchema = exports.pricesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.pricesSchema = joi_1.default.object({
    ids: joi_1.default.string()
        .pattern(/^[a-z0-9,-]+$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid cryptocurrency IDs format. Use comma-separated lowercase IDs.',
    }),
    vs_currencies: joi_1.default.string()
        .pattern(/^[a-z,]+$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid currencies format. Use comma-separated currency codes.',
    }),
});
exports.historicalSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'any.required': 'Cryptocurrency ID is required.',
    }),
    days: joi_1.default.string()
        .pattern(/^\d+$/)
        .required()
        .messages({
        'string.pattern.base': 'Days must be a number.',
    }),
    interval: joi_1.default.string()
        .valid('daily', 'hourly', 'minute')
        .optional(),
});
exports.trendingSchema = joi_1.default.object({});
exports.marketSchema = joi_1.default.object({
    vs_currency: joi_1.default.string().required().messages({
        'any.required': 'Currency is required.',
    }),
    order: joi_1.default.string().optional(),
    per_page: joi_1.default.number().optional(),
    page: joi_1.default.number().optional(),
    sparkline: joi_1.default.boolean().optional(),
});
//# sourceMappingURL=validationSchemas.js.map