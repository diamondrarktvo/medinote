"use strict";
// src/services/voiceEntryService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const env_1 = require("../../config/env");
const encryptFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const algorithm = "aes-256-cbc";
    const key = Buffer.from(env_1.env.ENCRYPTION_KEY, "hex"); // Convert hex key to Buffer
    const iv = Buffer.from(env_1.env.ENCRYPTION_IV, "hex"); // Convert hex IV to Buffer
    const input = fs_1.default.createReadStream(filePath);
    const encryptedFilePath = `${filePath}.enc`;
    const output = fs_1.default.createWriteStream(encryptedFilePath);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    input.pipe(cipher).pipe(output);
    return new Promise((resolve, reject) => {
        output.on("finish", () => {
            // Delete the original file after encryption
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.log("Failed to delete original file:", err);
                }
                else {
                    console.log("Original file deleted successfully");
                }
            });
            resolve(encryptedFilePath);
        });
        output.on("error", reject);
    });
});
exports.encryptFile = encryptFile;
