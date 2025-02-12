import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  route: text("route").notNull().unique(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  lyric: text("lyric").notNull(),
  audioUrl: text("audio_url").notNull(),
  artistId: integer("artist_id").references(() => artists.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// New submissions table for artist/song proposals
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  artistName: text("artist_name").notNull(),
  songName: text("song_name").notNull(),
  quote: text("quote").notNull(),
  imageFile: text("image_file").notNull(),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for inserting artists
export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
  createdAt: true,
});

// Schema for inserting songs
export const insertSongSchema = createInsertSchema(songs).omit({
  id: true,
  createdAt: true,
});

// Schema for submissions
export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types for TypeScript
export type Artist = typeof artists.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;
export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;