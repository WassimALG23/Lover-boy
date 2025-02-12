import artistsData from './data.json';

export interface Artist {
  name: string;
  route: string;
  lyric: string;
  highlighted: string;
  highlightColor: string;
  songName: string;
  image: string;
  audioUrl: string;
}

export const ARTISTS: Artist[] = artistsData.artists;