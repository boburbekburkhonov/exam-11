import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675432540886 implements MigrationInterface {
    name = 'table1675432540886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_password" character varying NOT NULL, "user_phone" character varying NOT NULL, "user_email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment_title" character varying NOT NULL, "productId" uuid, "userId" uuid, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_title" character varying NOT NULL, "product_price" character varying NOT NULL, "product_author" character varying, "product_desc" character varying, "product_lang" character varying, "product_made" character varying, "product_brand" character varying, "product_color" character varying, "product_status" character varying NOT NULL, "product_rate" integer, "product_img" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_sub_categories" ("sub_sub_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_sub_category_title" character varying NOT NULL, "subCategoryId" uuid, CONSTRAINT "PK_09a3fe663b4f37c5e567466a75d" PRIMARY KEY ("sub_sub_category_id"))`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("sub_category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_category_title" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "PK_81a45db0d4257e2f3804573a5dc" PRIMARY KEY ("sub_category_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_title" character varying NOT NULL, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "users_products_products" ("usersUserId" uuid NOT NULL, "productsProductId" uuid NOT NULL, CONSTRAINT "PK_51d16e8ded688620a7d4c0c7c68" PRIMARY KEY ("usersUserId", "productsProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_831e2da448f9fe9fa6a906e71c" ON "users_products_products" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f404eb65f80ea4b67a4afddcfa" ON "users_products_products" ("productsProductId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "sub_sub_categories"("sub_sub_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" ADD CONSTRAINT "FK_32abe67777d7c307a03082a94e0" FOREIGN KEY ("subCategoryId") REFERENCES "sub_categories"("sub_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_dfa3adf1b46e582626b295d0257" FOREIGN KEY ("categoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_products_products" ADD CONSTRAINT "FK_831e2da448f9fe9fa6a906e71c7" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_products_products" ADD CONSTRAINT "FK_f404eb65f80ea4b67a4afddcfa9" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_products_products" DROP CONSTRAINT "FK_f404eb65f80ea4b67a4afddcfa9"`);
        await queryRunner.query(`ALTER TABLE "users_products_products" DROP CONSTRAINT "FK_831e2da448f9fe9fa6a906e71c7"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_dfa3adf1b46e582626b295d0257"`);
        await queryRunner.query(`ALTER TABLE "sub_sub_categories" DROP CONSTRAINT "FK_32abe67777d7c307a03082a94e0"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f404eb65f80ea4b67a4afddcfa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_831e2da448f9fe9fa6a906e71c"`);
        await queryRunner.query(`DROP TABLE "users_products_products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`DROP TABLE "sub_sub_categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
