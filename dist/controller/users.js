"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const users_1 = require("../entities/users");
const errorHandler_1 = require("../error/errorHandler");
const jwt_1 = require("../utils/jwt");
class UserController {
    async REGISTER(req, res, next) {
        const { name, password, phone, email } = req.filtered;
        const existingUser = await ormconfig_1.dataSource
            .getRepository(users_1.UserEntity)
            .findOne({
            where: { name, password, phone, email },
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (existingUser) {
            return next(new errorHandler_1.ErrorHandler("User already exists", 400));
        }
        const newUser = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(users_1.UserEntity)
            .values({ name, password, phone, email })
            .execute();
        res.status(201).json({
            message: "User created successfully",
            access_token: (0, jwt_1.sign)({ id: newUser.raw[0].user_id }),
        });
    }
    async LOGIN(req, res, next) {
        const { email, password } = req.filtered;
        const existingUser = await ormconfig_1.dataSource
            .getRepository(users_1.UserEntity)
            .findOne({
            where: { email, password },
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (!existingUser) {
            return next(new errorHandler_1.ErrorHandler("User not found", 404));
        }
        res.status(201).json({
            message: "Successfully",
            access_token: (0, jwt_1.sign)({ id: existingUser.id }),
        });
    }
    async GET_USER(req, res, next) {
        const { userId } = req;
        const existingUser = await ormconfig_1.dataSource
            .getRepository(users_1.UserEntity)
            .findOne({
            where: { id: userId },
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (!existingUser) {
            return next(new errorHandler_1.ErrorHandler("User not found", 404));
        }
        res.status(201).json({
            user: existingUser,
        });
    }
    async GET_USERS_PRODUCTS(req, res, next) {
        const existingUserProducts = await ormconfig_1.dataSource
            .getRepository(users_1.UserEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.products', 'products')
            .getMany()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        res.status(200).json(existingUserProducts);
    }
    async UPDATE(req, res, next) {
        const { name, password, phone, email } = req.body;
        const { userId } = req;
        const foundUser = await ormconfig_1.dataSource
            .getRepository(users_1.UserEntity)
            .findOne({
            where: { id: userId },
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (!foundUser) {
            return next(new errorHandler_1.ErrorHandler("User not found", 404));
        }
        const updateUser = await ormconfig_1.dataSource
            .createQueryBuilder()
            .update(users_1.UserEntity)
            .set({ name, password, phone, email })
            .where("id = :id", { id: userId })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (updateUser) {
            res.status(200).json({
                message: "User updated successfully",
                status: 200,
            });
        }
    }
}
exports.default = new UserController();
