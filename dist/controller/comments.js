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
    async PATCH(req, res, next) {
        const { title, product, user } = req.body;
        const { id } = req.params;
        const updateComment = await ormconfig_1.dataSource
            .createQueryBuilder()
            .update(comments_1.CommentsEntity)
            .set({ title, product, user })
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (updateComment) {
            res.status(200).json({
                message: "Comment updated successfully",
                status: 200,
            });
        }
    }
    async DELETE(req, res, next) {
        const { id } = req.params;
        const deleteComment = await ormconfig_1.dataSource
            .createQueryBuilder()
            .delete()
            .from(comments_1.CommentsEntity)
            .where("id = :id", { id })
            .execute()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        if (deleteComment) {
            res.status(200).json({
                message: "Comment deleted successfully",
                status: 200,
            });
        }
    }
}
exports.default = new CommentController();
