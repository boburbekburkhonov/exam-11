import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { SubCategoryEntity } from "../entities/sub.category";
import { ErrorHandler } from "../error/errorHandler";

class SubCategoryController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, category } = req.body;

    const newCategory: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(SubCategoryEntity)
      .values({ title, category })
      .execute()
      .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))


    if(newCategory){
      res.status(201).json({
        message: "Category created successfully",
        status: 201
      })
    }
  }
}

export default new SubCategoryController()