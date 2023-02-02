"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../error/errorHandler");
const verifyToken = (req, res, next) => {
    const { access_token } = req.headers;
    if (!access_token) {
        return next(new errorHandler_1.ErrorHandler("Provide access token", 401));
    }
    jsonwebtoken_1.default.verify(String(access_token), "qwert12345", (err, decode) => {
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new errorHandler_1.ErrorHandler("Invalid token", 401));
        }
        req.userId = decode.id;
        next();
    });
};
exports.verifyToken = verifyToken;
