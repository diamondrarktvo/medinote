"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const logger = (0, winston_1.createLogger)({
    level: "error",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)),
    transports: [
        // Transport de rotation quotidienne
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(__dirname, "../../logs/error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d", // on conserve les logs que durant 14j
            level: "error",
        }),
        // sortie sur la console en mode développement
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
    ],
});
exports.default = logger;
