import path from "path"
import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  url: "postgres://kulonngd:0i6sXyusg0pv4gEtP_blVknP3PUp6n_x@satao.db.elephantsql.com/kulonngd",
  entities: [path.join(__dirname, "..", "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
})
