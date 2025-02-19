// src/app.ts

import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

// Middlewares pour parser les corps de requêtes en JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exemple de route de base
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

// Middleware de gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
