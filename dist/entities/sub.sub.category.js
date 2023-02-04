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
exports.SubSubCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const products_1 = require("./products");
const sub_category_1 = require("./sub.category");
let SubSubCategoryEntity = class SubSubCategoryEntity {
    id;
    title;
    subCategory;
    products;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'sub_sub_category_id'
    }),
    __metadata("design:type", String)
], SubSubCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sub_sub_category_title',
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], SubSubCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_1.SubCategoryEntity, subCategory => subCategory.subSubCategories),
    __metadata("design:type", sub_category_1.SubCategoryEntity)
], SubSubCategoryEntity.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_1.ProductEntity, product => product.category, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    }),
    __metadata("design:type", Array)
], SubSubCategoryEntity.prototype, "products", void 0);
SubSubCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'sub_sub_categories'
    })
], SubSubCategoryEntity);
exports.SubSubCategoryEntity = SubSubCategoryEntity;
