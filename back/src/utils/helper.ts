// src/utils/helper.ts

import path from "path";
import { env } from "../config/env";

// Reconstruit le chemin complet
export const getFilePath = (fileName: string): string => {
  return path.join(process.cwd(), "uploads", fileName);
};

export const generateFileUrl = (filePath: string): string => {
  const baseUrl = env.BASE_URL;
  // Recherche l'indice de "uploads" dans le chemin complet
  const uploadsIndex = filePath.indexOf("uploads");
  let relativePath = filePath;

  if (uploadsIndex !== -1) {
    // Extrait le chemin relatif à partir de "uploads"
    relativePath = filePath.substring(uploadsIndex);
  } else {
    relativePath = path.relative(process.cwd(), filePath);
  }

  return `${baseUrl}/${relativePath}`;
};
