import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";
import multer from "multer";
import { insertArtistSchema, insertSongSchema, insertSubmissionSchema } from "@shared/schema";

const ADMIN_PASSWORD = 'deadforever';

// Configure multer for file uploads
const imageStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), "client", "public", "artists"));
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const audioStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), "client", "public", "audio"));
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadImage = multer({ storage: imageStorage });
const uploadAudio = multer({ storage: audioStorage });

// Middleware to check admin authentication
const checkAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

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

  // Submission routes
  app.post("/api/submissions", uploadImage.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const submissionData = {
        ...req.body,
        imageFile: `/artists/${req.file.filename}`,
      };

      const validatedData = insertSubmissionSchema.parse(submissionData);
      const submission = await storage.createSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  // Admin routes (protected)
  app.get("/api/admin/submissions", checkAdminAuth, async (_req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.post("/api/admin/submissions/:id/:action", checkAdminAuth, uploadAudio.single('audio'), async (req, res) => {
    try {
      const { id, action } = req.params;
      if (action !== 'approve' && action !== 'reject') {
        return res.status(400).json({ message: "Invalid action" });
      }

      const status = action === 'approve' ? 'approved' : 'rejected';

      // If approving, we need an audio file
      if (status === 'approved' && !req.file) {
        return res.status(400).json({ message: "Audio file is required for approval" });
      }

      const submission = await storage.updateSubmissionStatus(parseInt(id), status);

      // If approved, create the artist and song
      if (status === 'approved' && submission) {
        const artist = await storage.createArtist({
          name: submission.artistName,
          route: submission.artistName.toLowerCase().replace(/\s+/g, '-'),
          image: submission.imageFile,
        });

        await storage.createSong({
          name: submission.songName,
          lyric: submission.quote,
          audioUrl: `/audio/${req.file!.filename}`,
          artistId: artist.id,
        });
      }

      res.json(submission);
    } catch (error) {
      console.error("Error updating submission:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}