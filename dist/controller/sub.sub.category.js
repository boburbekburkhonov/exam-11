"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const sub_sub_category_1 = require("../entities/sub.sub.category");
const errorHandler_1 = require("../error/errorHandler");
class SubSubCategoryController {
    async POST(req, res, next) {
        const { title, subCategory } = req.body;
        const newCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(sub_sub_category_1.SubSubCategoryEntity)
            .values({ title, subCategory })
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
exports.default = new SubSubCategoryController();
