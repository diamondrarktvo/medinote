"use strict";
// src/services/voiceEntryService/voiceEntryDecryptionService.ts
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
exports.decryptFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../../config/env");
const decryptFile = (encryptedFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const algorithm = "aes-256-cbc";
    const key = Buffer.from(env_1.env.ENCRYPTION_KEY, "hex");
    const iv = Buffer.from(env_1.env.ENCRYPTION_IV, "hex");
    const input = fs_1.default.createReadStream(encryptedFilePath);
    const decryptedFileName = path_1.default.basename(encryptedFilePath, ".enc");
    const decryptedFilePath = path_1.default.join(process.cwd(), "uploads", decryptedFileName);
    const output = fs_1.default.createWriteStream(decryptedFilePath);
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    input.pipe(decipher).pipe(output);
    return new Promise((resolve, reject) => {
        output.on("finish", () => {
            resolve(decryptedFilePath);
        });
        output.on("error", reject);
    });
});
exports.decryptFile = decryptFile;
