import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";

export function registerRoutes(app: Express): Server {
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), "client", "public")));

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}