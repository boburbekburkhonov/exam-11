import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { CategoryEntity } from "../entities/categories";
import { ErrorHandler } from "../error/errorHandler";

class CategoryController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title } = req.body;

    const existingCategory: any = await dataSource.getRepository(CategoryEntity)
      .findOne({
        where: { title }
      })
      .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if(existingCategory){
      return next(new ErrorHandler('Category already exists', 400))
    }

    const newCategory: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values({ title })
      .execute()

    if(newCategory){
      res.status(201).json({
        message: "Category created successfully",
        status: 201
      })
    }
  }
}

export default new CategoryController()