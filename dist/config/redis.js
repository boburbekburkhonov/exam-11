"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnect = void 0;
const redis_1 = require("redis");
const redisConnect = async () => {
    const client = (0, redis_1.createClient)({
        url: 'redis://127.0.0.1:6379'
    });
    client.on('error', err => console.log(err));
    await client.connect();
    console.log('Connect');
    return client;
};
exports.redisConnect = redisConnect;
