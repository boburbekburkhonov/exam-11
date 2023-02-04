"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const categories_1 = require("../entities/categories");
const products_1 = require("../entities/products");
const errorHandler_1 = require("../error/errorHandler");
class ProductController {
    async GET_PRODUCTS_SUBCATEGRY(req, res, next) {
        const existingCategory = await ormconfig_1.dataSource
            .createQueryBuilder(categories_1.CategoryEntity, "category")
            .leftJoinAndSelect("category.subCategories", "subCategories")
            .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
            .leftJoinAndSelect("subSubCategories.products", "products")
            .leftJoinAndSelect("products.comments", "comments")
            .leftJoinAndSelect("comments.user", "user")
            .getMany();
        const result = [];
        existingCategory.forEach((e) => {
            result.push(...e.subCategories);
        });
        res.status(200).json(result);
    }
    async GET_PRODUCTS_CATEGRY(req, res, next) {
        const existingCategory = await ormconfig_1.dataSource
            .createQueryBuilder(categories_1.CategoryEntity, "category")
            .leftJoinAndSelect("category.subCategories", "subCategories")
            .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
            .leftJoinAndSelect("subSubCategories.products", "products")
            .leftJoinAndSelect("products.comments", "comments")
            .leftJoinAndSelect("comments.user", "user")
            .getMany();
        res.status(200).json(existingCategory);
    }
    async POST(req, res, next) {
        const { title, price, author, desc, lang, made, brand, color, status, rate, img, category } = req.body;
        const newProduct = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(products_1.ProductEntity)
            .values({ title, price, author, desc, lang, made, brand, color, status, rate, img, category })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (newProduct) {
            res.status(201).json({
                message: "Product created successfully",
                status: 201,
            });
        }
    }
}
exports.default = new ProductController();
