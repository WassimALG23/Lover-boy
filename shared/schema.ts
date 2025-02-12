import { z } from "zod";

// Artist Schema
export const artistSchema = z.object({
  id: z.number(),
  name: z.string(),
  route: z.string(),
  image: z.string(),
  createdAt: z.date()
});

// Song Schema
export const songSchema = z.object({
  id: z.number(),
  name: z.string(),
  lyric: z.string(),
  audioUrl: z.string(),
  artistId: z.number(),
  createdAt: z.date()
});

// Schema for inserting artists
export const insertArtistSchema = artistSchema.omit({ 
  id: true,
  createdAt: true 
});

// Schema for inserting songs
export const insertSongSchema = songSchema.omit({ 
  id: true,
  createdAt: true 
});

// Types for TypeScript
export type Artist = z.infer<typeof artistSchema>;
export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Song = z.infer<typeof songSchema>;
export type InsertSong = z.infer<typeof insertSongSchema>;