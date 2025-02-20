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
};
