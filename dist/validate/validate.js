"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubSubCategory = exports.validateSubCategory = exports.validateLogin = exports.validateRegister = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateRegister = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
});
exports.validateLogin = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.validateSubCategory = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    category: joi_1.default.string().required()
});
exports.validateSubSubCategory = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    subCategory: joi_1.default.string().required(),
});
