import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Artist } from "../lib/constants";
import StylizedText from "./StylizedText";
import { Music2 } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
  showLyrics?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ArtistCard({ 
  artist, 
  showLyrics = true,
  className = "",
  onClick
}: ArtistCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className={`hover-card glow bg-black/50 backdrop-blur-lg overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Artist Image with Enhanced Animation */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <Music2 className="w-16 h-16 text-gray-400 animate-pulse" />
              </div>
            ) : (
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="eager"
              />
            )}
          </div>

          {/* Artist Name with Enhanced Typography */}
          <h3 className="text-xl font-bold gradient-text outlined-text font-stylized">
            {artist.name}
          </h3>

          {/* Song Name with Glowing Effect */}
          <div className="text-lg text-center font-stylized">
            <span className="gradient-text glow px-2 py-1 rounded">
              {artist.songName}
            </span>
          </div>

          {/* Lyrics with Styled Text */}
          {showLyrics && (
            <div className="text-base text-center mt-2">
              <StylizedText
                text={artist.lyric}
                highlighted={artist.songName}
                className="text-white/90"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}