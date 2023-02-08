import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { CommentsEntity } from "../entities/comments"
import { ErrorHandler } from "../error/errorHandler"

class CommentController {
  async POST(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, product, user } = req.body

    const newComment: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(CommentsEntity)
      .values({ title, product, user })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (newComment) {
      res.status(201).json({
        message: "Comment created successfully",
        status: 201,
      })
    }
  }
}

export default new CommentController()
