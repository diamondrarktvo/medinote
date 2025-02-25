import { ErrorRequestHandler } from "express";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/CustomError";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  console.error(err.stack);

  if (err.name === "AppError") {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof BadRequestError) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof InternalServerError) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Une erreur interne est survenue.",
  });
};
