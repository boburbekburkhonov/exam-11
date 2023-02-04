"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const comments_1 = require("../entities/comments");
const errorHandler_1 = require("../error/errorHandler");
class CommentController {
    async POST(req, res, next) {
        const { title, product, user } = req.body;
        const newComment = await ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(comments_1.CommentsEntity)
            .values({ title, product, user })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (newComment) {
            res.status(201).json({
                message: "Comment created successfully",
                status: 201,
            });
        }
    }
}
exports.default = new CommentController();
