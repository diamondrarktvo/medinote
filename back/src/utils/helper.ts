// src/utils/helper.ts

import path from "path";
import { env } from "../config/env";

// Reconstruit le chemin complet
export const getFilePath = (fileName: string): string => {
  return path.join(__dirname, "../..", "uploads", fileName);
};

export const getFullUrl = (fileName: string): string => {
  const baseUrl = env.BASE_URL;
  return `${baseUrl}/${fileName}`;
};
