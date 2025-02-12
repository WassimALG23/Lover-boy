import { artists, songs, type Artist, type InsertArtist, type Song, type InsertSong } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Artist operations
  getArtist(id: number): Promise<Artist | undefined>;
  getArtistByRoute(route: string): Promise<Artist | undefined>;
  getAllArtists(): Promise<Artist[]>;
  createArtist(artist: InsertArtist): Promise<Artist>;

  // Song operations
  getSong(id: number): Promise<Song | undefined>;
  getSongsByArtist(artistId: number): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
}

export class DatabaseStorage implements IStorage {
  // Artist operations
  async getArtist(id: number): Promise<Artist | undefined> {
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist;
  }

  async getArtistByRoute(route: string): Promise<Artist | undefined> {
    const [artist] = await db.select().from(artists).where(eq(artists.route, route));
    return artist;
  }

  async getAllArtists(): Promise<Artist[]> {
    return await db.select().from(artists);
  }

  async createArtist(artist: InsertArtist): Promise<Artist> {
    const [newArtist] = await db.insert(artists).values(artist).returning();
    return newArtist;
  }

  // Song operations
  async getSong(id: number): Promise<Song | undefined> {
    const [song] = await db.select().from(songs).where(eq(songs.id, id));
    return song;
  }

  async getSongsByArtist(artistId: number): Promise<Song[]> {
    return await db.select().from(songs).where(eq(songs.artistId, artistId));
  }

  async createSong(song: InsertSong): Promise<Song> {
    const [newSong] = await db.insert(songs).values(song).returning();
    return newSong;
  }
}

export const storage = new DatabaseStorage();