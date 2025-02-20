"use strict";
// src/config/env.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    // Informations de connexion à la base de données MySQL
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME || "Medinote",
    DB_PORT: process.env.DB_NAME,
    // Configuration du serveur
    PORT: process.env.SERVER_PORT,
    NODE_ENV: process.env.NODE_ENV,
    // encription key
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || "",
    ENCRYPTION_IV: process.env.ENCRYPTION_IV || "",
    BASE_URL: process.env.BASE_URL,
};
