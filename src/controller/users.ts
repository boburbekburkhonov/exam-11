import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { UserEntity } from "../entities/users";
import { ErrorHandler } from "../error/errorHandler";
import { sign } from "../utils/jwt";

class UserController {
  async REGISTER(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { name, password, phone, email } = req.filtered

    const existingUser: any = await dataSource.getRepository(UserEntity)
      .findOne({
        where: { name, password, phone, email }
      })
      .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if(existingUser){
      return next(new ErrorHandler('User already exists', 400))
    }

    const newUser: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({ name, password, phone, email })
      .execute()


    res.status(201).json({
      message: 'User created successfully',
      access_token: sign({ id: newUser.raw[0].user_id })
    })

  }

  async LOGIN(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { email, password } = req.filtered

    const existingUser: any = await dataSource.getRepository(UserEntity)
      .findOne({
        where: { email, password }
      })
      .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if(!existingUser){
      return next(new ErrorHandler('User not found', 404))
    }

    res.status(201).json({
      message: 'Successfully',
      access_token: sign({ id: existingUser.id })
    })
  }

  async GET_USER(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { userId } = req

    const existingUser: any = await dataSource.getRepository(UserEntity)
      .findOne({
        where: { id: userId }
      })
    .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    res.status(201).json({
      user: existingUser
    })

  }

  async UPDATE(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { name, password, phone, email } = req.body
    const { userId } = req;

    const updateUser: any = await dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set({ name, password, phone, email})
      .where('id = :id', { id: userId })
      .execute()
    .catch((err:ErrorHandler) => next(new ErrorHandler(err.message, 500)))

    if(updateUser){
      res.status(200).json({
        message: "User updated successfully",
        status: 200
      })
    }

  }

}

export default new UserController()