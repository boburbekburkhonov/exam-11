import { log } from "console"
import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { CategoryEntity } from "../entities/categories"
import { SubCategoryEntity } from "../entities/sub.category"
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

}

export default new SubSubCategoryController()
