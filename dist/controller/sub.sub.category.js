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
                status: 201,
            });
        }
    }
    async PATCH(req, res, next) {
        const { title, subCategory } = req.body;
        const { id } = req.params;
        const updatedeSubSubCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .update(sub_sub_category_1.SubSubCategoryEntity)
            .set({ title, subCategory })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (updatedeSubSubCategory) {
            res.status(201).json({
                message: "Category updated successfully",
                status: 200,
            });
        }
    }
    async DELETE(req, res, next) {
        const { id } = req.params;
        const deleteCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .delete()
            .from(sub_sub_category_1.SubSubCategoryEntity)
            .where('id = :id', { id })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (deleteCategory) {
            res.status(200).json({
                message: "Category deleted successfully",
                status: 200,
            });
        }
    }
}
exports.default = new SubSubCategoryController();
