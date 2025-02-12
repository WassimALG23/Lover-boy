import { Button } from "../components/ui/button";

const artists = [
  { name: "Mac DeMarco", route: "mac-demarco" },
  { name: "TV Girl", route: "tv-girl" },
  { name: "Mitski", route: "mitski" },
  { name: "Arctic Monkeys", route: "arctic-monkeys" },
  { name: "Alex G", route: "alex-g" },
  { name: "Tyler, The Creator", route: "tyler-the-creator" },
  { name: "Adrianne Lenker", route: "adrianne-lenker" },
];

export default function ArtistSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-3xl mb-8 font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
        Select an Artist
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <Button
            key={artist.route}
            className="w-48 h-16 text-lg hover:scale-105 transition-transform
                     bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500"
            asChild
          >
            <a href={`/artist/${artist.route}`}>{artist.name}</a>
          </Button>
        ))}
      </div>
    </div>
  );
}
