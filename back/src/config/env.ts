// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

export const env = {
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
  AI_KEY: process.env.AI_KEY,
  AI_URL: process.env.AI_URL,
  AI_ORGANIZATION: process.env.AI_ORGANIZATION,
  AI_PROJECT: process.env.AI_PROJECT,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GLADIA_API_KEY: process.env.GLADIA_API_KEY,
  GLADIA_UPLOAD_URL: process.env.GLADIA_UPLOAD_URL,
  GLADIA_TRANSCRIPTION_URL: process.env.GLADIA_TRANSCRIPTION_URL,
};

/*
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="Diamondra_10"
DB_NAME="Medinote"
DB_PORT="3306"
SERVER_PORT="3030"
NODE_ENV="development"
ENCRYPTION_KEY="751df0a93f63940eabd0b4ff07c25dc1feb7f5966388506168aa7ba7d4764caf"
ENCRYPTION_IV="750567d0f2182e33f51ea0ea3d23aaf4"
ENCRYPTION_TEXT="medinote_ma_superbe_application"
BASE_URL="http://localhost:3030"
AI_KEY="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"
AI_URL="https://api.openai.com/v1/chat/completions"
AI_ORGANIZATION="org-CKE83Ae5rjcBVhct5lN5YlKP"
AI_PROJECT="proj_vpsX5YNeHGwMmoO6VtUSB94f"
GITHUB_TOKEN="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"
GLADIA_API_KEY="cffddd86-a972-4747-bda9-d349d7bdde34"
GLADIA_UPLOAD_URL="https://api.gladia.io/v2/upload"
GLADIA_TRANSCRIPTION_URL="https://api.gladia.io/v2/pre-recorded"
*/
