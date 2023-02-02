import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../error/errorHandler"

export default (scheme: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = scheme.validate(req.body)

    if(error){
      return next(new ErrorHandler(error.message, 422))
    }

    req.filtered = value;
    next()
  }
}
