import { type Artist, type InsertArtist, type Song, type InsertSong } from "@shared/schema";

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

export class MemoryStorage implements IStorage {
  private artists: Artist[] = [];
  private songs: Song[] = [];
  private artistIdCounter = 1;
  private songIdCounter = 1;

  // Artist operations
  async getArtist(id: number): Promise<Artist | undefined> {
    return this.artists.find(artist => artist.id === id);
  }

  async getArtistByRoute(route: string): Promise<Artist | undefined> {
    return this.artists.find(artist => artist.route === route);
  }

  async getAllArtists(): Promise<Artist[]> {
    return [...this.artists];
  }

  async createArtist(artist: InsertArtist): Promise<Artist> {
    const newArtist: Artist = {
      id: this.artistIdCounter++,
      ...artist,
      createdAt: new Date()
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  // Song operations
  async getSong(id: number): Promise<Song | undefined> {
    return this.songs.find(song => song.id === id);
  }

  async getSongsByArtist(artistId: number): Promise<Song[]> {
    return this.songs.filter(song => song.artistId === artistId);
  }

  async createSong(song: InsertSong): Promise<Song> {
    const newSong: Song = {
      id: this.songIdCounter++,
      ...song,
      createdAt: new Date()
    };
    this.songs.push(newSong);
    return newSong;
  }
}

export const storage = new MemoryStorage();