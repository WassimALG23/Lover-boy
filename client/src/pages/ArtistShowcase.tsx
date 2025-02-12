
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { ARTISTS } from "../lib/constants";
import StylizedText from "../components/StylizedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArtistShowcaseProps {
  artistRoute: string;
  onBack: () => void;
}

export default function ArtistShowcase({ artistRoute, onBack }: ArtistShowcaseProps) {
  const artist = ARTISTS.find(a => a.route === artistRoute);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (artist) {
      soundRef.current = new Howl({
        src: [artist.audioUrl],
        autoplay: true,
        loop: true,
        volume: 0.5,
      });

      return () => {
        soundRef.current?.stop();
      };
    }
  }, [artist]);

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="space-background min-h-screen animate-fadeIn">
      <div className="content-layer flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="w-64 h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  loading="eager"
                />
              </div>

              <h2 className="text-2xl font-bold text-white font-stylized">
                {artist.name}
              </h2>

              <div className="text-xl text-center mb-4">
                <StylizedText
                  text={artist.lyric}
                  highlighted={artist.songName}
                  className="text-white/90"
                  highlightColor={artist.quoteColor}
                />
              </div>

              <Button
                className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500"
                onClick={onBack}
              >
                Back to Artists
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
