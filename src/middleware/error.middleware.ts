import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../error/errorHandler";

export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof ErrorHandler) {
    return res.status(err.status).json({
      message: err.message,
      status: err.status
    })
  }

  res.status(500).json({
    message: "Internal Server Error",
    status: 500
  })
}