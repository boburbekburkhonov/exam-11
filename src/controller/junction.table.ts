import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { ErrorHandler } from "../error/errorHandler"

class CommentController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, productId } = req.body

    const newRelation: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into("users_products_products")
      .values({ usersUserId: userId, productsProductId: productId })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (newRelation) {
      res.status(201).json({
        message: "Order created successfully",
        status: 201,
      })
    }
  }
}

export default new CommentController()
