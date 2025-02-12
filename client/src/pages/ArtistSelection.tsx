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
        <h2 className="text-4xl mb-12 font-bold text-white text-center font-stylized relative">
          <span className="bg-black/40 px-6 py-2 rounded-lg backdrop-blur-sm">
            Select an Artist
          </span>
        </h2>

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