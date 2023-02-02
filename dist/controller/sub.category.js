"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const sub_category_1 = require("../entities/sub.category");
const errorHandler_1 = require("../error/errorHandler");
class SubCategoryController {
    async POST(req, res, next) {
        const { title, category } = req.body;
        const newCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(sub_category_1.SubCategoryEntity)
            .values({ title, category })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (newCategory) {
            res.status(201).json({
                message: "Category created successfully",
                status: 201
            });
        }
    }
}
exports.default = new SubCategoryController();
