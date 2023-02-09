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
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const sub_category_1 = require("./sub.category");
let CategoryEntity = class CategoryEntity {
    id;
    title;
    subCategories;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "category_id",
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "category_title",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_category_1.SubCategoryEntity, (subCategory) => subCategory.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "subCategories", void 0);
CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "categories",
    })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
