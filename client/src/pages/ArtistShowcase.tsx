import { useEffect, useRef } from "react";
import { useParams } from "wouter";
import { Howl } from "howler";
import { ARTISTS } from "../lib/constants";
import StylizedText from "../components/StylizedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArtistShowcase() {
  const { name } = useParams();
  const artist = ARTISTS.find(a => a.route === name);
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
    <div className="space-background min-h-screen">
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
                asChild
              >
                <a href="/artists">Back to Artists</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}