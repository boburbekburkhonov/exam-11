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
exports.SubCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const categories_1 = require("./categories");
const sub_sub_category_1 = require("./sub.sub.category");
let SubCategoryEntity = class SubCategoryEntity {
    id;
    title;
    category;
    subSubCategories;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", {
        name: "sub_category_id",
    }),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "sub_category_title",
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], SubCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_1.CategoryEntity, (category) => category.subCategories, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", categories_1.CategoryEntity)
], SubCategoryEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_sub_category_1.SubSubCategoryEntity, (subSubCategory) => subSubCategory.subCategory),
    __metadata("design:type", Array)
], SubCategoryEntity.prototype, "subSubCategories", void 0);
SubCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "sub_categories",
    })
], SubCategoryEntity);
exports.SubCategoryEntity = SubCategoryEntity;
