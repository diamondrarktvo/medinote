"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const constant_1 = require("./config/constant");
const roomRoute_1 = __importDefault(require("./routes/roomRoute"));
const voiceEntryRoute_1 = __importDefault(require("./routes/voiceEntryRoute"));
//routes import
const testeRoute_1 = __importDefault(require("./routes/testeRoute"));
//middlewares import
const errorHandler_1 = require("./middlewares/errorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use("/uploads", (req, res, next) => {
    const filePath = path_1.default.join(process.cwd(), "uploads", req.path);
    // Vérifier si le fichier existe
    if (fs_1.default.existsSync(filePath)) {
        // Définir le type MIME en fonction de l'extension du fichier
        if (req.path.endsWith(".aac")) {
            res.type("audio/aac");
        }
        else if (req.path.endsWith(".mp3")) {
            res.type("audio/mpeg");
        }
        else if (req.path.endsWith(".wav")) {
            res.type("audio/wav");
        }
        else if (req.path.endsWith(".ogg")) {
            res.type("audio/ogg");
        }
        const userAgent = req.headers["user-agent"] || "";
        if (userAgent.includes("Postman")) {
            res.set("Content-Disposition", "attachment");
        }
        else {
            res.set("Content-Disposition", "inline");
        }
    }
    next();
});
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Middlewares pour parser les corps de requêtes en JSON et URL-encoded
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//all routes
app.get("/", (req, res) => {
    res.send("Welcome to Medinote API");
});
app.use(`/api/${constant_1.apiVersion}`, testeRoute_1.default);
app.use(`/api/${constant_1.apiVersion}/room`, roomRoute_1.default);
app.use(`/api/${constant_1.apiVersion}/voice`, voiceEntryRoute_1.default);
// Middleware de gestion des erreurs
app.use(errorHandler_1.errorHandler);
exports.default = app;
