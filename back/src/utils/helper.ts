// src/utils/helper.ts

import path from "path";

// Reconstruit le chemin complet
export const getFilePath = (fileName: string): string => {
  return path.join(__dirname, "../..", "uploads", fileName);
};
