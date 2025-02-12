export interface Artist {
  name: string;
  route: string;
  lyric: string;
  songName: string;
  image: string;
  audioUrl?: string;  // Optional for now until user provides the audio files
  quoteColor: string;
}

export const ARTISTS: Artist[] = [
  {
    name: "Mac DeMarco",
    route: "mac-demarco",
    lyric: "just to let u know Ur my kind of women",
    songName: "My Kind of Woman",
    image: "/artists/mac-demarco.jpg",
    quoteColor: "text-emerald-400"
  },
  {
    name: "TV Girl",
    route: "tv-girl", 
    lyric: "i know that we're not allowed to but i want you",
    songName: "Not Allowed",
    image: "/artists/tv-girl.jpg",
    quoteColor: "text-rose-400"
  },
  {
    name: "Mitski",
    route: "mitski",
    lyric: "i just want you",
    songName: "I Want You",
    image: "/artists/mitski.jpg",
    quoteColor: "text-blue-400"
  },
  {
    name: "Tyler, The Creator",
    route: "tyler-the-creator",
    lyric: "i will treat u better im not like him",
    songName: "Like Him",
    image: "/artists/tyler.jpg",
    quoteColor: "text-cyan-400"
  },
  {
    name: "Adrianne Lenker",
    route: "adrianne-lenker",
    lyric: "i just want to be anything with u",
    songName: "Anything",
    image: "/artists/adrianne-lenker.jpg",
    quoteColor: "text-orange-400"
  },
  {
    name: "Arctic Monkeys",
    route: "arctic-monkeys",
    lyric: "i wanna be yours",
    songName: "I Wanna Be Yours",
    image: "/artists/arctic-monkeys.jpg",
    quoteColor: "text-purple-400"
  }
];