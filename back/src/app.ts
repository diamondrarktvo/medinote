// src/app.ts

import fs from "fs";
import express, { Application, Request, Response } from "express";
import { apiVersion } from "./config/constant";
import roomRoutes from "./routes/roomRoute";
import voiceEntryRoutes from "./routes/voiceEntryRoute";
import gladiaRoutes from "./routes/gladiaRoutes";

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

app.use("/uploads", (req, res, next) => {
  const filePath = path.join(process.cwd(), "uploads", req.path);

  // Vérifier si le fichier existe
  if (fs.existsSync(filePath)) {
    // Définir le type MIME en fonction de l'extension du fichier
    if (req.path.endsWith(".aac")) {
      res.type("audio/aac");
    } else if (req.path.endsWith(".mp3")) {
      res.type("audio/mpeg");
    } else if (req.path.endsWith(".wav")) {
      res.type("audio/wav");
    } else if (req.path.endsWith(".ogg")) {
      res.type("audio/ogg");
    }

    const userAgent = req.headers["user-agent"] || "";
    if (userAgent.includes("Postman")) {
      res.set("Content-Disposition", "attachment");
    } else {
      res.set("Content-Disposition", "inline");
    }
  }

  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
app.use(`/api/${apiVersion}/gladia-callback`, gladiaRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;
