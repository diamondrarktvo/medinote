// src/app.ts

import express, { Application, Request, Response, NextFunction } from "express";
import { apiVersion } from "./config/constant";
import roomRoutes from "./routes/roomRoute";

//routes import
import testRoute from "./routes/testeRoute";

//middlewares import
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares pour parser les corps de requêtes en JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Medinote API");
});

app.use(`/api/${apiVersion}`, testRoute);
app.use(`/api/${apiVersion}/room`, roomRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;
