"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const Room_1 = require("../entities/Room");
const VoiceEntry_1 = require("../entities/VoiceEntry");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: env_1.env.DB_HOST,
    port: Number(env_1.env.DB_PORT),
    username: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    entities: [Room_1.Room, VoiceEntry_1.VoiceEntry],
    synchronize: process.env.NODE_ENV === "development", // uniquement en dev
    logging: false,
});
