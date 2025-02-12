
import { useState } from "react";
import MainMenu from "./pages/MainMenu";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import { Toaster } from "@/components/ui/toaster";
import "./lib/fonts.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedArtist, setSelectedArtist] = useState("");

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return <MainMenu onNavigate={() => setCurrentPage("artists")} />;
      case "artists":
        return <ArtistSelection onSelect={(name) => {
          setSelectedArtist(name);
          setCurrentPage("showcase");
        }} />;
      case "showcase":
        return <ArtistShowcase 
          artistRoute={selectedArtist} 
          onBack={() => setCurrentPage("artists")}
        />;
      default:
        return <MainMenu onNavigate={() => setCurrentPage("artists")} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {renderPage()}
      <Toaster />
    </div>
  );
}
