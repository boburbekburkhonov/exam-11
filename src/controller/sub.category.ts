import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { SubCategoryEntity } from "../entities/sub.category"
import { ErrorHandler } from "../error/errorHandler"

class SubCategoryController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, category } = req.body

    const newCategory: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(SubCategoryEntity)
      .values({ title, category })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (newCategory) {
      res.status(201).json({
        message: "Category created successfully",
        status: 201,
      })
    }
  }

  async PATCH(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, category } = req.body
    const { id } = req.params

    const updatedeSubCategory: any = await dataSource
      .createQueryBuilder()
      .update(SubCategoryEntity)
      .set({ title, category })
      .where("id = :id", { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (updatedeSubCategory) {
      res.status(201).json({
        message: "Category updated successfully",
        status: 200,
      })
    }
  }

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const deleteCategory: any = await dataSource
      .createQueryBuilder()
      .delete()
      .from(SubCategoryEntity)
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

export default new SubCategoryController()
