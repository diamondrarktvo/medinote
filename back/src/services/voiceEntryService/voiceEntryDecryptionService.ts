// src/services/voiceEntryService/voiceEntryDecryptionService.ts

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { env } from "../../config/env";

export const decryptFile = async (
  encryptedFilePath: string,
): Promise<string> => {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(env.ENCRYPTION_KEY, "hex"); // Clé de chiffrement
  const iv = Buffer.from(env.ENCRYPTION_IV, "hex"); // Vecteur d'initialisation

  const input = fs.createReadStream(encryptedFilePath);
  const decryptedFileName = path.basename(encryptedFilePath, ".enc"); // Nom du fichier sans .enc
  const decryptedFilePath = path.join("uploads", decryptedFileName); // Chemin relatif du fichier déchiffré
  const output = fs.createWriteStream(decryptedFilePath);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  input.pipe(decipher).pipe(output);

  return new Promise((resolve, reject) => {
    output.on("finish", () => {
      resolve(decryptedFilePath); // Retourne le chemin relatif du fichier déchiffré
    });
    output.on("error", reject);
  });
};
