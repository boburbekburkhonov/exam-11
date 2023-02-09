"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://kulonngd:0i6sXyusg0pv4gEtP_blVknP3PUp6n_x@satao.db.elephantsql.com/kulonngd",
    entities: [path_1.default.join(__dirname, "..", "entities", "*.{ts,js}")],
    migrations: [path_1.default.join(__dirname, "..", "migrations", "*.{ts,js}")],
    logging: true,
    synchronize: false,
});
