// src/server.ts
import http, { Server } from "http";
import app from "./app";
import { AppDataSource } from "./config/data-source";

function normalizePort(val: string | number): number | string | false {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  if (port > 0) return port;
  return false;
}

const port = normalizePort(process.env.PORT || "3030");
app.set("port", port);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
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

function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "pipe " + addr : addr && "port " + addr.port;
  console.log(`Server is listening on ${bind}`);
}

const server: Server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);

// Initialiser la connexion à la base de données avant de lancer le serveur
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL using TypeORM");
    server.listen(port);
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
