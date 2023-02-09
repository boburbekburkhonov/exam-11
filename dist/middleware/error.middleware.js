"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorHandler_1 = require("../error/errorHandler");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof errorHandler_1.ErrorHandler) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
    }
    res.status(500).json({
        message: "Internal Server Error",
        status: 500,
    });
};
exports.errorMiddleware = errorMiddleware;
