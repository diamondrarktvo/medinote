// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  logger.error(err.stack || err.message);

  console.error(err.stack);

  res.status(500).json({ error: "Something went wrong!" });
}
