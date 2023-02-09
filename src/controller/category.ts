import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { CategoryEntity } from "../entities/categories"
import { ErrorHandler } from "../error/errorHandler"

class CategoryController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title } = req.body

    const existingCategory: any = await dataSource
      .getRepository(CategoryEntity)
      .findOne({
        where: { title },
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (existingCategory) {
      return next(new ErrorHandler("Category already exists", 400))
    }

    const newCategory: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values({ title })
      .execute()

    if (newCategory) {
      res.status(201).json({
        message: "Category created successfully",
        status: 201,
      })
    }
  }

  async PUT(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title } = req.body
    const { id } = req.params

    const updatedeCategory: any = await dataSource
      .createQueryBuilder()
      .update(CategoryEntity)
      .set({ title })
      .where("id = :id", { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (updatedeCategory) {
      res.status(201).json({
        message: "Category updated successfully",
        status: 201,
      })
    }
  }

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const deleteCategory: any = await dataSource
      .createQueryBuilder()
      .delete()
      .from(CategoryEntity)
      .where('id = :id', { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (deleteCategory) {
      res.status(200).json({
        message: "Category deleted successfully",
        status: 200,
      })
    }
  }
}

export default new CategoryController()
