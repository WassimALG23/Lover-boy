import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Artist } from "../lib/constants";
import StylizedText from "./StylizedText";
import { Music2 } from "lucide-react";

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
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={`bg-black/50 backdrop-blur overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Artist Image */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <Music2 className="w-16 h-16 text-gray-400" />
              </div>
            ) : (
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setImageError(true)}
              />
            )}
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