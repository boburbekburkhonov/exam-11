import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { redisConnect } from "../config/redis"
import { CategoryEntity } from "../entities/categories"
import { ProductEntity } from "../entities/products"
import { ErrorHandler } from "../error/errorHandler"

class ProductController {
  async GET_PRODUCTS_SUBCATEGRY(req: Request, res: Response, next: NextFunction): Promise<void> {
    const client = await redisConnect()
    const allProducts: string | null = await client.get("sub-products")

    if (!allProducts) {
      const existingCategory: any = await dataSource
        .createQueryBuilder(CategoryEntity, "category")
        .leftJoinAndSelect("category.subCategories", "subCategories")
        .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
        .leftJoinAndSelect("subSubCategories.products", "products")
        .leftJoinAndSelect("products.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      const result: any[] = []
      existingCategory.forEach((e: any) => {
        result.push(...e.subCategories)
      })

      await client.setEx("sub-products", 15, JSON.stringify(result))
      res.json(result)
      return
    }

    res.status(200).json(JSON.parse(allProducts))
  }

  async GET_PRODUCTS_CATEGRY(req: Request, res: Response, next: NextFunction): Promise<void> {
    const client = await redisConnect()
    const allProducts: string | null = await client.get("products")

    if (!allProducts) {
      const existingCategory: any = await dataSource
        .createQueryBuilder(CategoryEntity, "category")
        .leftJoinAndSelect("category.subCategories", "subCategories")
        .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
        .leftJoinAndSelect("subSubCategories.products", "products")
        .leftJoinAndSelect("products.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      await client.setEx("products", 15, JSON.stringify(existingCategory))

      res.json(existingCategory)
      return
    }

    res.status(200).json(JSON.parse(allProducts))
  }

  async GET_PRODUCTS_BY_STATUS_RECOMENDED(req: Request, res: Response, next: NextFunction): Promise<void> {
    const client = await redisConnect()

    const allProductsByStatusRecomended: string | null = await client.get("products-status-recomended")

    if (!allProductsByStatusRecomended) {
      const existingProductsByStatus: any = await dataSource
        .createQueryBuilder(ProductEntity, "product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .where("product.status = :status", { status: "recomended" })
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      await client.setEx("products-status-recomended", 15, JSON.stringify(existingProductsByStatus))
      res.json(existingProductsByStatus)
      return
    }

    res.status(200).json(JSON.parse(allProductsByStatusRecomended))
  }

  async GET_PRODUCTS_BY_STATUS_BEST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const client = await redisConnect()

    const allProductsByStatusBest: string | null = await client.get("products-status-best")

    if (!allProductsByStatusBest) {
      const existingProductsByStatus: any = await dataSource
        .createQueryBuilder(ProductEntity, "product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .where("product.status = :status", { status: "best" })
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      await client.setEx("products-status-best", 15, JSON.stringify(existingProductsByStatus))
      res.json(existingProductsByStatus)
      return
    }

    res.status(200).json(JSON.parse(allProductsByStatusBest))
  }

  async GET_PRODUCTS_BY_ID(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const existingCategory: any = await dataSource
      .createQueryBuilder(CategoryEntity, "category")
      .leftJoinAndSelect("category.subCategories", "subCategories")
      .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
      .leftJoinAndSelect("subSubCategories.products", "products")
      .leftJoinAndSelect("products.comments", "comments")
      .leftJoinAndSelect("comments.user", "user")
      .where("products.id = :id", { id })
      .getMany()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    res.status(200).json(existingCategory)
  }

  async GET_PRODUCTS_USERS(req: Request, res: Response, next: NextFunction): Promise<void> {
    const existingProductsUsers: any = await dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.users", "users")
      .getMany()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    res.status(200).json(existingProductsUsers)
  }

  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, price, author, desc, lang, made, brand, color, status, rate, img, category } = req.body

    const newProduct: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values({ title, price, author, desc, lang, made, brand, color, status, rate, img, category })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (newProduct) {
      res.status(201).json({
        message: "Product created successfully",
        status: 201,
      })
    }
  }

  async GET_PRODUCTS_FILTER(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { sort, page, limit } = req.query

    if (sort == "new") {
      const allProductsFilter: any = await dataSource
        .createQueryBuilder(ProductEntity, "product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .orderBy("product.created_at", "DESC")
        .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
        .take(Number(limit ? limit : 10))
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      res.json(allProductsFilter)
      return
    } else if (sort == "old") {
      const allProductsFilter: any = await dataSource
        .createQueryBuilder(ProductEntity, "product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .orderBy("product.created_at", "ASC")
        .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
        .take(Number(limit ? limit : 10))
        .getMany()
        .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

      res.json(allProductsFilter)
      return
    }

    const allProductsFilter: any = await dataSource
      .createQueryBuilder(ProductEntity, "product")
      .leftJoinAndSelect("product.comments", "comments")
      .leftJoinAndSelect("comments.user", "user")
      .orderBy("product.created_at", "ASC")
      .skip((Number(page ? page : 1) - 1) * Number(limit ? limit : 3))
      .take(Number(limit ? limit : 10))
      .getMany()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    res.json(allProductsFilter)
  }
}

export default new ProductController()
