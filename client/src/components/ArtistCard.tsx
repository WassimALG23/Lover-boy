import { Card, CardContent } from "@/components/ui/card";
import { Artist } from "../lib/constants";
import StylizedText from "./StylizedText";

interface ArtistCardProps {
  artist: Artist;
  showLyrics?: boolean;
  className?: string;
}

export default function ArtistCard({ 
  artist, 
  showLyrics = true,
  className = "" 
}: ArtistCardProps) {
  return (
    <Card className={`bg-black/50 backdrop-blur overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Artist Image */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Artist Name */}
          <h3 className="text-xl font-bold text-white font-stylized">
            {artist.name}
          </h3>

          {/* Song Name */}
          <div className="text-lg text-center font-stylized">
            <span className="gradient-text">
              {artist.songName}
            </span>
          </div>

          {/* Lyrics (Optional) */}
          {showLyrics && (
            <div className="text-base text-center mt-2">
              <StylizedText
                text={artist.lyric}
                highlighted={artist.songName}
                className="text-white/80"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
