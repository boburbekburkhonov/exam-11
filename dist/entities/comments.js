"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsEntity = void 0;
const typeorm_1 = require("typeorm");
const products_1 = require("./products");
const users_1 = require("./users");
let CommentsEntity = class CommentsEntity {
    id;
    title;
    product;
    user;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "comment_id",
    }),
    __metadata("design:type", String)
], CommentsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "comment_title",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], CommentsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_1.ProductEntity, (product) => product.comments),
    __metadata("design:type", products_1.ProductEntity)
], CommentsEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.UserEntity, (user) => user.comments),
    __metadata("design:type", users_1.UserEntity)
], CommentsEntity.prototype, "user", void 0);
CommentsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "comments",
    })
], CommentsEntity);
exports.CommentsEntity = CommentsEntity;
