"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.table1675329449135 = void 0
class table1675329449135 {
  name = "table1675329449135"
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_password" character varying NOT NULL, "user_phone" character varying NOT NULL, "user_email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))',
    )
  }
  async down(queryRunner) {
    await queryRunner.query('DROP TABLE "users"')
  }
}
exports.table1675329449135 = table1675329449135
