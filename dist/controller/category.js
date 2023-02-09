"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const categories_1 = require("../entities/categories");
const errorHandler_1 = require("../error/errorHandler");
class CategoryController {
    async POST(req, res, next) {
        const { title } = req.body;
        const existingCategory = await ormconfig_1.dataSource
            .getRepository(categories_1.CategoryEntity)
            .findOne({
            where: { title },
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (existingCategory) {
            return next(new errorHandler_1.ErrorHandler("Category already exists", 400));
        }
        const newCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(categories_1.CategoryEntity)
            .values({ title })
            .execute();
        if (newCategory) {
            res.status(201).json({
                message: "Category created successfully",
                status: 201,
            });
        }
    }
    async PUT(req, res, next) {
        const { title } = req.body;
        const { id } = req.params;
        const updatedeCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .update(categories_1.CategoryEntity)
            .set({ title })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (updatedeCategory) {
            res.status(201).json({
                message: "Category updated successfully",
                status: 201,
            });
        }
    }
    async DELETE(req, res, next) {
        const { id } = req.params;
        const deleteCategory = await ormconfig_1.dataSource
            .createQueryBuilder()
            .delete()
            .from(categories_1.CategoryEntity)
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
exports.default = new CategoryController();
