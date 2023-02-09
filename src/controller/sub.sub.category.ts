import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { SubSubCategoryEntity } from "../entities/sub.sub.category"
import { ErrorHandler } from "../error/errorHandler"

class SubSubCategoryController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, subCategory } = req.body

    const newCategory: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(SubSubCategoryEntity)
      .values({ title, subCategory })
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
    const { title, subCategory } = req.body
    const { id } = req.params

    const updatedeSubSubCategory: any = await dataSource
      .createQueryBuilder()
      .update(SubSubCategoryEntity)
      .set({ title, subCategory })
      .where("id = :id", { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (updatedeSubSubCategory) {
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
      .from(SubSubCategoryEntity)
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

export default new SubSubCategoryController()
