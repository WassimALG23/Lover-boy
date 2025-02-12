import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";
import { insertArtistSchema, insertSongSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), "client", "public")));

  // Artists API routes
  app.get("/api/artists", async (_req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      console.error("Error fetching artists:", error);
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:route", async (req, res) => {
    try {
      const artist = await storage.getArtistByRoute(req.params.route);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }

      // Get songs for this artist
      const songs = await storage.getSongsByArtist(artist.id);
      res.json({ ...artist, songs });
    } catch (error) {
      console.error("Error fetching artist:", error);
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  // Songs API routes
  app.get("/api/songs/:artistId", async (req, res) => {
    try {
      const songs = await storage.getSongsByArtist(parseInt(req.params.artistId));
      res.json(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });

  // Create routes with validation
  app.post("/api/artists", async (req, res) => {
    try {
      const artistData = insertArtistSchema.parse(req.body);
      const artist = await storage.createArtist(artistData);
      res.status(201).json(artist);
    } catch (error) {
      console.error("Error creating artist:", error);
      res.status(400).json({ message: "Invalid artist data" });
    }
  });

  app.post("/api/songs", async (req, res) => {
    try {
      const songData = insertSongSchema.parse(req.body);
      const song = await storage.createSong(songData);
      res.status(201).json(song);
    } catch (error) {
      console.error("Error creating song:", error);
      res.status(400).json({ message: "Invalid song data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}