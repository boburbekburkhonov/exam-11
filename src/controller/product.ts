import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { CategoryEntity } from "../entities/categories"
import { ProductEntity } from "../entities/products"
import { ErrorHandler } from "../error/errorHandler"

class ProductController {
  async GET_PRODUCTS_SUBCATEGRY(req: Request, res: Response, next: NextFunction): Promise<void> {
    const existingCategory: any = await dataSource
      .createQueryBuilder(CategoryEntity, "category")
      .leftJoinAndSelect("category.subCategories", "subCategories")
      .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
      .leftJoinAndSelect("subSubCategories.products", "products")
      .leftJoinAndSelect("products.comments", "comments")
      .leftJoinAndSelect("comments.user", "user")
      .getMany()

    const result: any = []
    existingCategory.forEach((e: any) => {
      result.push(...e.subCategories)
    })

    res.status(200).json(result)
  }

  async GET_PRODUCTS_CATEGRY(req: Request, res: Response, next: NextFunction): Promise<void> {
    const existingCategory: any = await dataSource
      .createQueryBuilder(CategoryEntity, "category")
      .leftJoinAndSelect("category.subCategories", "subCategories")
      .leftJoinAndSelect("subCategories.subSubCategories", "subSubCategories")
      .leftJoinAndSelect("subSubCategories.products", "products")
      .leftJoinAndSelect("products.comments", "comments")
      .leftJoinAndSelect("comments.user", "user")
      .getMany()

    res.status(200).json(existingCategory)
  }

  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, price, author, desc, lang, made, brand, color, status, rate, img, category } = req.body

    const newProduct = await dataSource
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
}

export default new ProductController()
