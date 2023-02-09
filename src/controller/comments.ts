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

  async PATCH(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, product, user } = req.body
    const { id } = req.params

    const updateComment: any = await dataSource
      .createQueryBuilder()
      .update(CommentsEntity)
      .set({ title, product, user })
      .where("id = :id", { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (updateComment) {
      res.status(200).json({
        message: "Comment updated successfully",
        status: 200,
      })
    }
  }

  async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const deleteComment: any = await dataSource
      .createQueryBuilder()
      .delete()
      .from(CommentsEntity)
      .where("id = :id", { id })
      .execute()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if (deleteComment) {
      res.status(200).json({
        message: "Comment deleted successfully",
        status: 200,
      })
    }
  }
}

export default new CommentController()
