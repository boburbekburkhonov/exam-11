"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const ormconfig_1 = require("./config/ormconfig");
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const docs_json_1 = __importDefault(require("./docs.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const main = async () => {
    try {
        await ormconfig_1.dataSource.initialize();
        app.use(routes_1.default);
        app.use(error_middleware_1.errorMiddleware);
        app.use('/api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_json_1.default));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        app.listen(9090, () => console.log(9090));
    }
};
main();
