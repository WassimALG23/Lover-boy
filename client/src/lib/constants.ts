export interface Artist {
  name: string;
  route: string;
  lyric: string;
  songName: string;
  image: string;
  audioUrl?: string;  // Optional for now until we add working audio files
  quoteColor: string;
}

export const ARTISTS: Artist[] = [
  {
    name: "Mac DeMarco",
    route: "mac-demarco",
    lyric: "just to let u know Ur my kind of women",
    songName: "My Kind of Woman",
    image: "/artists/mac-demarco.jpg",
    audioUrl: "/audio/mac-demarco-my-kind-of-woman.mp3",
    quoteColor: "text-emerald-400"
  },
  {
    name: "TV Girl",
    route: "tv-girl", 
    lyric: "i know that we're not allowed to but i want you",
    songName: "Not Allowed",
    image: "/attached_assets/Screenshot_2025-02-12-12-43-54-811_com.spotify.music.png",
    audioUrl: "/audio/tv-girl-not-allowed.mp3",
    quoteColor: "text-rose-400"
  },
  {
    name: "Mitski",
    route: "mitski",
    lyric: "i just want you",
    songName: "I Want You",
    image: "/artists/mitski.jpg",
    audioUrl: "/audio/mitski-i-want-you.mp3",
    quoteColor: "text-blue-400"
  },
  {
    name: "Tyler, The Creator",
    route: "tyler-the-creator",
    lyric: "i will treat u better im not like him",
    songName: "Like Him",
    image: "/artists/tyler.jpg",
    audioUrl: "/audio/tyler-like-him.mp3",
    quoteColor: "text-cyan-400"
  },
  {
    name: "Adrianne Lenker",
    route: "adrianne-lenker",
    lyric: "i just want to be anything with u",
    songName: "Anything",
    image: "/artists/adrianne-lenker.jpg",
    audioUrl: "/audio/adrianne-lenker-anything.mp3",
    quoteColor: "text-orange-400"
  },
  {
    name: "Arctic Monkeys",
    route: "arctic-monkeys",
    lyric: "i wanna be yours",
    songName: "I Wanna Be Yours",
    image: "/artists/arctic-monkeys.jpg",
    audioUrl: "/audio/arctic-monkeys-i-wanna-be-yours.mp3",
    quoteColor: "text-purple-400"
  }
];