// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { Room } from "../entities/Room";
import { VoiceEntry } from "../entities/VoiceEntry";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [Room, VoiceEntry],
  synchronize: process.env.NODE_ENV === "development", // uniquement en dev
  logging: false,
});
