"use strict";
// src/utils/helper.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = void 0;
const path_1 = __importDefault(require("path"));
// Reconstruit le chemin complet
const getFilePath = (fileName) => {
    return path_1.default.join(__dirname, "../..", "uploads", fileName);
};
exports.getFilePath = getFilePath;
