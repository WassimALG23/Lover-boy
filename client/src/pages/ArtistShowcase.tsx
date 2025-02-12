import { useEffect, useState } from "react";
import { ARTISTS } from "../lib/constants";
import StylizedText from "../components/StylizedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ArtistShowcaseProps {
  artistRoute: string;
  onBack: () => void;
}

export default function ArtistShowcase({ artistRoute, onBack }: ArtistShowcaseProps) {
  const artist = ARTISTS.find(a => a.route === artistRoute);
  const [showPlayer, setShowPlayer] = useState(false);

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="space-background min-h-screen animate-fadeIn">
      <div className="content-layer flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                className="self-start hover:bg-white/10"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* Artist Image */}
              <div className="w-64 h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  loading="eager"
                />
              </div>

              {/* Artist Name */}
              <h2 className="text-2xl font-bold text-white font-stylized">
                {artist.name}
              </h2>

              {/* Song Name and Play Button */}
              <div className="flex flex-col items-center gap-4">
                <span className="bg-gradient-to-r from-blue-400 to-pink-400 text-transparent bg-clip-text text-xl">
                  {artist.songName}
                </span>
                <Button
                  variant="outline"
                  className="hover:bg-white/10"
                  onClick={() => setShowPlayer(!showPlayer)}
                >
                  {showPlayer ? "Hide Player" : "Play on Spotify"}
                </Button>
              </div>

              {/* Spotify Player */}
              {showPlayer && (
                <div className="w-full max-w-md">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${artist.spotifyId}`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-lg"
                  />
                </div>
              )}

              {/* Lyrics */}
              <div className="text-xl text-center mb-4">
                <StylizedText
                  text={artist.lyric}
                  highlighted={artist.songName}
                  className="text-white/90"
                  highlightColor={artist.quoteColor}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}