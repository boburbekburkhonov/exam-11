"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const errorHandler_1 = require("../error/errorHandler");
class CommentController {
    async POST(req, res, next) {
        const { userId, productId } = req.body;
        const newRelation = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into("users_products_products")
            .values({ usersUserId: userId, productsProductId: productId })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (newRelation) {
            res.status(201).json({
                message: "Order created successfully",
                status: 201,
            });
        }
    }
}
exports.default = new CommentController();
