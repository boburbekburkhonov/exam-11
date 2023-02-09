"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.table1675341346529 = void 0
class table1675341346529 {
  name = "table1675341346529"
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE "sub_sub_categories" ("sub_sub_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_sub_category_title" character varying NOT NULL, "subCategoryId" uuid, CONSTRAINT "PK_09a3fe663b4f37c5e567466a75d" PRIMARY KEY ("sub_sub_category_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "sub_categories" ("sub_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_category_title" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "PK_81a45db0d4257e2f3804573a5dc" PRIMARY KEY ("sub_category_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_title" character varying NOT NULL, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "sub_sub_categories" ADD CONSTRAINT "FK_32abe67777d7c307a03082a94e0" FOREIGN KEY ("subCategoryId") REFERENCES "sub_categories"("sub_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_dfa3adf1b46e582626b295d0257" FOREIGN KEY ("categoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }
  async down(queryRunner) {
    await queryRunner.query('ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_dfa3adf1b46e582626b295d0257"')
    await queryRunner.query('ALTER TABLE "sub_sub_categories" DROP CONSTRAINT "FK_32abe67777d7c307a03082a94e0"')
    await queryRunner.query('DROP TABLE "categories"')
    await queryRunner.query('DROP TABLE "sub_categories"')
    await queryRunner.query('DROP TABLE "sub_sub_categories"')
  }
}
exports.table1675341346529 = table1675341346529
