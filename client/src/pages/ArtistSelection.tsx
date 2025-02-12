import { ARTISTS } from "../lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music2 } from "lucide-react";

interface ArtistSelectionProps {
  onSelect: (route: string) => void;
  onBack: () => void;
}

export default function ArtistSelection({ onSelect, onBack }: ArtistSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 animate-fadeIn">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 text-white/90 hover:text-white"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        {/* Title */}
        <div className="relative mb-12 flex justify-center">
          <h2 className="text-4xl font-bold text-white font-stylized 
                        bg-gradient-to-r from-black/50 via-black/40 to-black/50 
                        backdrop-blur-md 
                        px-12 py-4 rounded-2xl
                        border border-white/10
                        shadow-lg shadow-black/20
                        transform hover:scale-105 transition-all duration-300
                        animate-fadeIn">
            Select an Artist
          </h2>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTISTS.map((artist) => (
            <Button
              key={artist.route}
              onClick={() => onSelect(artist.route)}
              className="h-24 relative overflow-hidden group bg-black/30 
                        border border-white/10 hover:border-white/30
                        backdrop-blur-sm transition-all duration-300
                        flex items-center justify-start p-4 gap-4"
            >
              {/* Profile Picture */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-black/20 flex-shrink-0
                            border-2 border-white/10 group-hover:border-white/30 transition-colors">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/default-artist.png";
                  }}
                />
              </div>

              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start justify-center gap-1">
                <span className="text-2xl font-stylized text-white/90 
                              group-hover:text-white transition-colors duration-300">
                  {artist.name}
                </span>
                <span className="text-sm text-white/60 group-hover:text-white/80 
                              transition-colors duration-300">
                  {artist.songName}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}