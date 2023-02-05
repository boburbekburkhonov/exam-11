"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const redis_1 = require("../config/redis");
const categories_1 = require("../entities/categories");
const products_1 = require("../entities/products");
const errorHandler_1 = require("../error/errorHandler");
class ProductController {
    async GET_PRODUCTS_SUBCATEGRY(req, res, next) {
        const client = await (0, redis_1.redisConnect)();
        const allProducts = await client.get("sub-products");
        if (!allProducts) {
            const existingCategory = await ormconfig_1.dataSource
                .createQueryBuilder(categories_1.CategoryEntity, "category")
                .leftJoinAndSelect("category.subCategories", "subCategories")
                .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
                .leftJoinAndSelect("subSubCategories.products", "products")
                .leftJoinAndSelect("products.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            const result = [];
            existingCategory.forEach((e) => {
                result.push(...e.subCategories);
            });
            await client.setEx("sub-products", 15, JSON.stringify(result));
            res.json(result);
            return;
        }
        res.status(200).json(JSON.parse(allProducts));
    }
    async GET_PRODUCTS_CATEGRY(req, res, next) {
        const client = await (0, redis_1.redisConnect)();
        const allProducts = await client.get("products");
        if (!allProducts) {
            const existingCategory = await ormconfig_1.dataSource
                .createQueryBuilder(categories_1.CategoryEntity, "category")
                .leftJoinAndSelect("category.subCategories", "subCategories")
                .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
                .leftJoinAndSelect("subSubCategories.products", "products")
                .leftJoinAndSelect("products.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            await client.setEx("products", 15, JSON.stringify(existingCategory));
            res.json(existingCategory);
            return;
        }
        res.status(200).json(JSON.parse(allProducts));
    }
    async GET_PRODUCTS_BY_STATUS_RECOMENDED(req, res, next) {
        const client = await (0, redis_1.redisConnect)();
        const allProductsByStatusRecomended = await client.get("products-status-recomended");
        if (!allProductsByStatusRecomended) {
            const existingProductsByStatus = await ormconfig_1.dataSource
                .createQueryBuilder(products_1.ProductEntity, "product")
                .leftJoinAndSelect("product.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .where("product.status = :status", { status: "recomended" })
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            await client.setEx("products-status-recomended", 15, JSON.stringify(existingProductsByStatus));
            res.json(existingProductsByStatus);
            return;
        }
        res.status(200).json(JSON.parse(allProductsByStatusRecomended));
    }
    async GET_PRODUCTS_BY_STATUS_BEST(req, res, next) {
        const client = await (0, redis_1.redisConnect)();
        const allProductsByStatusBest = await client.get("products-status-best");
        if (!allProductsByStatusBest) {
            const existingProductsByStatus = await ormconfig_1.dataSource
                .createQueryBuilder(products_1.ProductEntity, "product")
                .leftJoinAndSelect("product.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .where("product.status = :status", { status: "best" })
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            await client.setEx("products-status-best", 15, JSON.stringify(existingProductsByStatus));
            res.json(existingProductsByStatus);
            return;
        }
        res.status(200).json(JSON.parse(allProductsByStatusBest));
    }
    async GET_PRODUCTS_BY_ID(req, res, next) {
        const { id } = req.params;
        const existingCategory = await ormconfig_1.dataSource
            .createQueryBuilder(categories_1.CategoryEntity, "category")
            .leftJoinAndSelect("category.subCategories", "subCategories")
            .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
            .leftJoinAndSelect("subSubCategories.products", "products")
            .leftJoinAndSelect("products.comments", "comments")
            .leftJoinAndSelect("comments.user", "user")
            .where("products.id = :id", { id })
            .getMany()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        res.status(200).json(existingCategory);
    }
    async GET_PRODUCTS_USERS(req, res, next) {
        const existingProductsUsers = await ormconfig_1.dataSource
            .getRepository(products_1.ProductEntity)
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.users", "users")
            .getMany()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        res.status(200).json(existingProductsUsers);
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
    async GET_PRODUCTS_FILTER(req, res, next) {
        const { sort, page, limit } = req.query;
        if (sort == "new") {
            const allProductsFilter = await ormconfig_1.dataSource
                .createQueryBuilder(products_1.ProductEntity, "product")
                .leftJoinAndSelect("product.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .orderBy("product.created_at", "DESC")
                .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
                .take(Number(limit ? limit : 10))
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            res.json(allProductsFilter);
            return;
        }
        else if (sort == "old") {
            const allProductsFilter = await ormconfig_1.dataSource
                .createQueryBuilder(products_1.ProductEntity, "product")
                .leftJoinAndSelect("product.comments", "comments")
                .leftJoinAndSelect("comments.user", "user")
                .orderBy("product.created_at", "ASC")
                .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
                .take(Number(limit ? limit : 10))
                .getMany()
                .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
            res.json(allProductsFilter);
            return;
        }
        const allProductsFilter = await ormconfig_1.dataSource
            .createQueryBuilder(products_1.ProductEntity, "product")
            .leftJoinAndSelect("product.comments", "comments")
            .leftJoinAndSelect("comments.user", "user")
            .orderBy("product.created_at", "ASC")
            .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
            .take(Number(limit ? limit : 10))
            .getMany()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        res.json(allProductsFilter);
    }
}
exports.default = new ProductController();
