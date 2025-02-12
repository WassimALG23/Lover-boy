import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export function registerRoutes(app: Express): Server {
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), "client", "public")));

  // API routes
  app.get("/api/artists", async (_req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:route", async (req, res) => {
    try {
      const artist = await storage.getArtistByRoute(req.params.route);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}