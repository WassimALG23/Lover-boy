import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Artist } from "../lib/constants";
import StylizedText from "./StylizedText";
import { Music2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 
                 bg-black/30 backdrop-blur-lg border-white/10 hover:border-white/20 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col items-center gap-4">
          {/* Artist Image with Enhanced Animation */}
          <div className="relative w-full aspect-square overflow-hidden rounded-xl 
                        shadow-lg shadow-black/20 group-hover:shadow-black/40 
                        transition-all duration-500">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-black/40">
                <Music2 className="w-16 h-16 text-white/40 animate-pulse" />
              </div>
            ) : (
              <>
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 
                           group-hover:scale-110"
                  onError={() => setImageError(true)}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {isHovered && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full bg-white/10 hover:bg-white/20 
                             backdrop-blur-md transition-all duration-300"
                  >
                    <Play className="w-6 h-6 text-white" />
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Artist Name with Enhanced Typography */}
          <h3 className="text-2xl font-bold text-white/90 font-stylized tracking-wide">
            {artist.name}
          </h3>

          {/* Song Name with Subtle Effect */}
          <div className="text-lg text-center font-stylized">
            <span className="text-white/80 hover:text-white transition-colors duration-300">
              {artist.songName}
            </span>
          </div>

          {/* Lyrics with Styled Text */}
          {showLyrics && (
            <div className="text-base text-center mt-2 px-4">
              <StylizedText
                text={artist.lyric}
                highlighted={artist.highlighted}
                highlightColor={artist.highlightColor}
                className="text-white/70 hover:text-white/90 transition-colors duration-300"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}