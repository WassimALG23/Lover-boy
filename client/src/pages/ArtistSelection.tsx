
import { ARTISTS } from "../lib/constants";
import ArtistCard from "../components/ArtistCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ArtistSelectionProps {
  onSelect: (route: string) => void;
  onBack: () => void;
}

export default function ArtistSelection({ onSelect, onBack }: ArtistSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 animate-fadeIn">
      <div className="w-full max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
      </div>

      <h2 className="text-3xl mb-8 font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text font-stylized">
        Select an Artist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {ARTISTS.map((artist) => (
          <div 
            key={artist.route}
            className="cursor-pointer transform transition-all hover:scale-105"
            onClick={() => onSelect(artist.route)}
          >
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </div>
  );
}
