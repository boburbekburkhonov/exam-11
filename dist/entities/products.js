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
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const comments_1 = require("./comments");
const sub_sub_category_1 = require("./sub.sub.category");
const users_1 = require("./users");
let ProductEntity = class ProductEntity {
    id;
    title;
    price;
    author;
    desc;
    lang;
    made;
    brand;
    color;
    status;
    rate;
    img;
    created_at;
    category;
    comments;
    users;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "product_id",
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_title",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_price",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_author",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_desc",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_lang",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "lang", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_made",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "made", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_brand",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_color",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_status",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_rate",
        type: "int",
        nullable: false,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "product_img",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamptz",
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_sub_category_1.SubSubCategoryEntity, (categories) => categories.products, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", sub_sub_category_1.SubSubCategoryEntity)
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_1.CommentsEntity, (comment) => comment.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_1.UserEntity, (user) => user.products, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "users", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "products",
    })
], ProductEntity);
exports.ProductEntity = ProductEntity;
