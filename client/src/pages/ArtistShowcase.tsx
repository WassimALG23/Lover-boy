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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-black/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-64 h-64 object-cover rounded-lg shadow-xl"
            />
            
            <h2 className="text-2xl font-bold text-white font-stylized">
              {artist.name}
            </h2>
            
            <div className="text-xl text-center mb-4">
              <StylizedText
                text={artist.lyric}
                highlighted={artist.songName}
                className="text-white/90"
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
  );
}
