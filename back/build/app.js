"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const uploadDir = path_1.default.join(__dirname, "uploads");
app.use("/uploads", express_1.default.static(uploadDir));
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
