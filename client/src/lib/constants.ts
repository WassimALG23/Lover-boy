export interface Artist {
  name: string;
  route: string;
  lyric: string;
  songName: string;
  image: string;
  audioUrl: string;
}

export const ARTISTS: Artist[] = [
  {
    name: "Mac DeMarco",
    route: "mac-demarco",
    lyric: "just to let u know",
    songName: "My Kind of Woman",
    image: "https://i.scdn.co/image/ab67616d0000b27356a8eaafb65d30b38e2d36cd",
    audioUrl: "https://p.scdn.co/mp3-preview/3c3f0bfb4b3994490cf3f08cd8801018f9e84444"
  },
  {
    name: "TV Girl",
    route: "tv-girl", 
    lyric: "i know we're not allowed to date but i just want u",
    songName: "Not Allowed",
    image: "https://i.scdn.co/image/ab67616d0000b2736d58d53e8c85ba99982ddb82",
    audioUrl: "https://p.scdn.co/mp3-preview/6a46d469b67baa0fe945c0c41f1d45d368b8b57d"
  },
  {
    name: "Mitski",
    route: "mitski",
    lyric: "i just want you",
    songName: "I Want You",
    image: "https://i.scdn.co/image/ab67616d0000b273d9e0e244b0c8642bd29bdc2a",
    audioUrl: "https://p.scdn.co/mp3-preview/1c5b2e823e0acf5d7b6aa7df1b7e5364a0837026"
  },
  {
    name: "Arctic Monkeys",
    route: "arctic-monkeys",
    lyric: "i just wanna be urs",
    songName: "I Wanna Be Yours",
    image: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
    audioUrl: "https://p.scdn.co/mp3-preview/c12c4d92454bc8fdeea5d5a9a5b8da0995e6f26f"
  },
  {
    name: "Alex G",
    route: "alex-g",
    lyric: "ik we have things to do but i love u",
    songName: "Things to Do",
    image: "https://i.scdn.co/image/ab67616d0000b273fc9c43f8c5b08d80fb0ab81c",
    audioUrl: "https://p.scdn.co/mp3-preview/f5e7c96b50c5321e601bfec0a96c9e543ad8bee2"
  },
  {
    name: "Tyler, The Creator",
    route: "tyler-the-creator",
    lyric: "i will treat u better im not like him",
    songName: "Like Him",
    image: "https://i.scdn.co/image/ab67616d0000b273c5c3e00e5e66f5e8cb507244",
    audioUrl: "https://p.scdn.co/mp3-preview/ba04068706dcd1f025df83f9bf71c5abe4f98ada"
  },
  {
    name: "Adrianne Lenker",
    route: "adrianne-lenker",
    lyric: "i just want to be anything with u",
    songName: "Anything",
    image: "https://i.scdn.co/image/ab67616d0000b273b5b39cc871f2799c9c35a79a",
    audioUrl: "https://p.scdn.co/mp3-preview/9c5cb4c974c87d9d88d87c0c6c3b20f76c87c5f1"
  }
];
