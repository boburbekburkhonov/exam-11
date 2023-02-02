"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../error/errorHandler");
exports.default = (scheme) => {
    return (req, res, next) => {
        const { error, value } = scheme.validate(req.body);
        if (error) {
            return next(new errorHandler_1.ErrorHandler(error.message, 422));
        }
        req.filtered = value;
        next();
    };
};
