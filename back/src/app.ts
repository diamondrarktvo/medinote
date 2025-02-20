// src/app.ts

import fs from "fs";
import express, { Application, Request, Response } from "express";
import { apiVersion } from "./config/constant";
import roomRoutes from "./routes/roomRoute";
import voiceEntryRoutes from "./routes/voiceEntryRoute";

//routes import
import testRoute from "./routes/testeRoute";

//middlewares import
import { errorHandler } from "./middlewares/errorHandler";
import path from "path";

const app: Application = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Middlewares pour parser les corps de requêtes en JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Medinote API");
});

app.use(`/api/${apiVersion}`, testRoute);
app.use(`/api/${apiVersion}/room`, roomRoutes);
app.use(`/api/${apiVersion}/voice`, voiceEntryRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;
