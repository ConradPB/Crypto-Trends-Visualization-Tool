"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });
        if (error) {
            res.status(400).json({
                error: 'Validation Error',
                details: error.details.map((detail) => detail.message),
            });
        }
        else {
            next();
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map