import { ARTISTS } from "../lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ArtistCard from "../components/ArtistCard";

interface ArtistSelectionProps {
  onSelect: (route: string) => void;
  onBack: () => void;
}

export default function ArtistSelection({ onSelect, onBack }: ArtistSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-8 animate-fadeIn">
      <div className="w-full max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-white/10 interactive"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <h2 className="text-4xl mb-8 font-bold text-white/90 text-center font-stylized">
          Select an Artist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTISTS.map((artist) => (
            <ArtistCard
              key={artist.route}
              artist={artist}
              onClick={() => onSelect(artist.route)}
              className="h-full interactive"
              showLyrics={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}