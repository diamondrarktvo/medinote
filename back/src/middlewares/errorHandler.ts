import { ErrorRequestHandler } from "express";

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
    return; // retourne undefined, conforme au type void
  }

  res.status(500).json({
    success: false,
    message: "Une erreur interne est survenue.",
  });
};
