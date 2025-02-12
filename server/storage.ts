import { artists, songs, submissions, type Artist, type InsertArtist, type Song, type InsertSong, type Submission, type InsertSubmission } from "@shared/schema";
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

  // Submission operations
  getSubmission(id: number): Promise<Submission | undefined>;
  getAllSubmissions(): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmissionStatus(id: number, status: 'approved' | 'rejected'): Promise<Submission>;
}

export class DatabaseStorage implements IStorage {
  // Artist operations
  async getArtist(id: number): Promise<Artist | undefined> {
    try {
      const [artist] = await db.select().from(artists).where(eq(artists.id, id));
      return artist;
    } catch (error) {
      console.error('Error in getArtist:', error);
      throw error;
    }
  }

  async getArtistByRoute(route: string): Promise<Artist | undefined> {
    try {
      const [artist] = await db.select().from(artists).where(eq(artists.route, route));
      return artist;
    } catch (error) {
      console.error('Error in getArtistByRoute:', error);
      throw error;
    }
  }

  async getAllArtists(): Promise<Artist[]> {
    try {
      return await db.select().from(artists);
    } catch (error) {
      console.error('Error in getAllArtists:', error);
      throw error;
    }
  }

  async createArtist(artist: InsertArtist): Promise<Artist> {
    try {
      const [newArtist] = await db.insert(artists).values(artist).returning();
      return newArtist;
    } catch (error) {
      console.error('Error in createArtist:', error);
      throw error;
    }
  }

  // Song operations
  async getSong(id: number): Promise<Song | undefined> {
    try {
      const [song] = await db.select().from(songs).where(eq(songs.id, id));
      return song;
    } catch (error) {
      console.error('Error in getSong:', error);
      throw error;
    }
  }

  async getSongsByArtist(artistId: number): Promise<Song[]> {
    try {
      return await db.select().from(songs).where(eq(songs.artistId, artistId));
    } catch (error) {
      console.error('Error in getSongsByArtist:', error);
      throw error;
    }
  }

  async createSong(song: InsertSong): Promise<Song> {
    try {
      const [newSong] = await db.insert(songs).values(song).returning();
      return newSong;
    } catch (error) {
      console.error('Error in createSong:', error);
      throw error;
    }
  }

  // Submission operations
  async getSubmission(id: number): Promise<Submission | undefined> {
    try {
      const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
      return submission;
    } catch (error) {
      console.error('Error in getSubmission:', error);
      throw error;
    }
  }

  async getAllSubmissions(): Promise<Submission[]> {
    try {
      return await db.select().from(submissions);
    } catch (error) {
      console.error('Error in getAllSubmissions:', error);
      throw error;
    }
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    try {
      const [newSubmission] = await db.insert(submissions).values(submission).returning();
      return newSubmission;
    } catch (error) {
      console.error('Error in createSubmission:', error);
      throw error;
    }
  }

  async updateSubmissionStatus(id: number, status: 'approved' | 'rejected'): Promise<Submission> {
    try {
      const [updatedSubmission] = await db
        .update(submissions)
        .set({ status })
        .where(eq(submissions.id, id))
        .returning();
      return updatedSubmission;
    } catch (error) {
      console.error('Error in updateSubmissionStatus:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();