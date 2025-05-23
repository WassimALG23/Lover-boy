import { useEffect, useState, useRef } from "react";
import { ARTISTS } from "../lib/constants";
import StylizedText from "../components/StylizedText";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

interface ArtistShowcaseProps {
  artistRoute: string;
  onBack: () => void;
}

export default function ArtistShowcase({ artistRoute, onBack }: ArtistShowcaseProps) {
  const artist = ARTISTS.find(a => a.route === artistRoute);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload assets
  useEffect(() => {
    // Preload all artist images
    ARTISTS.forEach(artist => {
      const img = new Image();
      img.src = artist.image;
    });

    // Preload all audio
    ARTISTS.forEach(artist => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = artist.audioUrl;
    });
  }, []);

  useEffect(() => {
    if (artist) {
      const audio = new Audio(artist.audioUrl);
      audio.loop = true;
      audioRef.current = audio;

      // Autoplay when component mounts
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error loading audio:", error);
          setIsPlaying(false);
        });
      }

      // Cleanup when unmounting or changing artists
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [artist?.audioUrl]);

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onBack();
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling audio:", error);
      setIsPlaying(false);
    }
  };

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="min-h-screen page-transition">
      <div className="content-layer flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-md hover-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                className="self-start hover:bg-white/10 glow"
                onClick={handleBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* Artist Image */}
              <div className="w-64 h-64 relative overflow-hidden rounded-lg">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="artist-image w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Artist Name */}
              <h2 className="text-2xl font-bold stylized-text font-stylized">
                {artist.name}
              </h2>

              {/* Song Name and Play Button */}
              <div className="flex items-center gap-4">
                <span className="stylized-text text-xl">
                  {artist.songName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10 glow w-24"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>

              {/* Lyrics */}
              <div className="text-xl text-center mb-4">
                <StylizedText
                  text={`"${artist.lyric}"`}
                  highlighted={artist.highlighted}
                  highlightColor={artist.highlightColor}
                  className="text-white/90"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}