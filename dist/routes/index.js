"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("../controller/category"));
const comments_1 = __importDefault(require("../controller/comments"));
const junction_table_1 = __importDefault(require("../controller/junction.table"));
const product_1 = __importDefault(require("../controller/product"));
const sub_category_1 = __importDefault(require("../controller/sub.category"));
const sub_sub_category_1 = __importDefault(require("../controller/sub.sub.category"));
const users_1 = __importDefault(require("../controller/users"));
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const verifyToken_1 = require("../middleware/verifyToken");
const validate_1 = require("../validate/validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/user/page", verifyToken_1.verifyToken, users_1.default.GET_USER)
    .get("/users/products", users_1.default.GET_USERS_PRODUCTS)
    .get("/categories/products", product_1.default.GET_PRODUCTS_CATEGRY)
    .get("/subcategories/products", product_1.default.GET_PRODUCTS_SUBCATEGRY)
    .get("/products/status/recomended", product_1.default.GET_PRODUCTS_BY_STATUS_RECOMENDED)
    .get("/products/status/best", product_1.default.GET_PRODUCTS_BY_STATUS_BEST)
    .get("/product/:id", product_1.default.GET_PRODUCTS_BY_ID)
    .get("/products/users", product_1.default.GET_PRODUCTS_USERS)
    .get("/products/filter", product_1.default.GET_PRODUCTS_FILTER)
    .post("/user/register", (0, validate_middleware_1.default)(validate_1.validateRegister), users_1.default.REGISTER)
    .post("/user/login", (0, validate_middleware_1.default)(validate_1.validateLogin), users_1.default.LOGIN)
    .post("/category/create", category_1.default.POST)
    .post("/subcategory/create", (0, validate_middleware_1.default)(validate_1.validateSubCategory), sub_category_1.default.POST)
    .post("/subsubcategory/create", (0, validate_middleware_1.default)(validate_1.validateSubSubCategory), sub_sub_category_1.default.POST)
    .post("/product/create", product_1.default.POST)
    .post("/comment/create", comments_1.default.POST)
    .post("/orders/create", junction_table_1.default.POST)
    .patch("/user/update", verifyToken_1.verifyToken, users_1.default.UPDATE);
