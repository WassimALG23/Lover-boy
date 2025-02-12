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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create new audio element when artist changes
    if (artist) {
      const audio = new Audio(artist.audioUrl);
      audio.loop = true;
      audio.preload = "auto";
      
      audio.addEventListener('canplaythrough', () => {
        audioRef.current = audio;
      });
      
      audio.addEventListener('error', (e) => {
        console.error("Error loading audio:", e);
        setIsPlaying(false);
      });
      
      setIsPlaying(false);
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
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
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="min-h-screen animate-fadeIn" style={{
      backgroundImage: "url('/milky-way.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="content-layer flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                className="self-start hover:bg-white/10"
                onClick={handleBack}
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
              <h2 className="text-2xl font-bold gradient-text outlined-text font-stylized">
                {artist.name}
              </h2>

              {/* Song Name and Play Button */}
              <div className="flex items-center gap-4">
                <span className="gradient-text outlined-text text-xl">
                  {artist.songName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10"
                  onClick={togglePlay}
                >
                  {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>

              {/* Lyrics */}
              <div className="text-xl text-center mb-4">
                <StylizedText
                  text={`"${artist.lyric}"`}
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