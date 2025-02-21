"use strict";
// src/utils/helper.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullUrl = exports.getFilePath = void 0;
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
// Reconstruit le chemin complet
const getFilePath = (fileName) => {
    return path_1.default.join(process.cwd(), "uploads", fileName);
};
exports.getFilePath = getFilePath;
const getFullUrl = (filePath) => {
    const baseUrl = env_1.env.BASE_URL;
    // Recherche l'indice de "uploads" dans le chemin complet
    const uploadsIndex = filePath.indexOf("uploads");
    let relativePath = filePath;
    if (uploadsIndex !== -1) {
        // Extrait le chemin relatif à partir de "uploads"
        relativePath = filePath.substring(uploadsIndex);
    }
    else {
        relativePath = path_1.default.relative(process.cwd(), filePath);
    }
    console.log(`fullurl : ${baseUrl}/${relativePath}`);
    return `${baseUrl}/${relativePath}`;
};
exports.getFullUrl = getFullUrl;
