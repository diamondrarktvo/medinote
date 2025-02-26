// src/services/voiceEntryService.ts

import crypto from "crypto";
import fs from "fs";
import { env } from "../../config/env";

export const encryptFile = async (filePath: string): Promise<string> => {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex"); // Convert hex key to Buffer
  const iv = Buffer.from(env.ENCRYPTION_IV, "hex"); // Convert hex IV to Buffer

  const input = fs.createReadStream(filePath);
  const encryptedFilePath = `${filePath}.enc`;
  const output = fs.createWriteStream(encryptedFilePath);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  input.pipe(cipher).pipe(output);

  return new Promise((resolve, reject) => {
    output.on("finish", () => {
      // Delete the original file after encryption
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Failed to delete original file:", err);
        } else {
          console.log("Original file deleted successfully");
        }
      });
      resolve(encryptedFilePath);
    });
    output.on("error", reject);
  });
};
