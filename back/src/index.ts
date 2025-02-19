// src/index.ts

import http, { Server } from "http";
import app from "./app";

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string | number): number | string | false {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    // Si la valeur n'est pas un nombre, retourner la valeur (peut-être un pipe)
    return val;
  }
  if (port > 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || "3030");
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "pipe " + addr : addr && "port " + addr.port;
  console.log("Server is listening on " + bind);
}

const server: Server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);

server.listen(port);
