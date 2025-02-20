import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`,
    ),
  ),
  transports: [
    // Transport de rotation quotidienne
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // on conserve les logs que durant 14j
      level: "error",
    }),
    // sortie sur la console en mode développement
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
