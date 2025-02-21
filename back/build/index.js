"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./config/data-source");
function normalizePort(val) {
    const port = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    if (port > 0)
        return port;
    return false;
}
const port = normalizePort(process.env.PORT || "3030");
app_1.default.set("port", port);
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : addr && "port " + addr.port;
    console.log(`Server is listening on ${bind}`);
}
const server = http_1.default.createServer(app_1.default);
server.on("error", onError);
server.on("listening", onListening);
// Initialiser la connexion à la base de données avant de lancer le serveur
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Connected to MySQL using TypeORM");
    server.listen(port);
})
    .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
});
