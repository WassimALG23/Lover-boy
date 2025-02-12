import { useState } from "react";
import MainMenu from "./pages/MainMenu";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import { Toaster } from "@/components/ui/toaster";
import "./lib/fonts.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedArtist, setSelectedArtist] = useState("");

  const handleBack = () => {
    // If we're in showcase, go back to artists selection
    if (currentPage === "showcase") {
      setCurrentPage("artists");
    }
    // If we're in artists selection, go back to main menu
    else if (currentPage === "artists") {
      setCurrentPage("main");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return <MainMenu onNavigate={() => setCurrentPage("artists")} />;
      case "artists":
        return (
          <ArtistSelection 
            onSelect={(name) => {
              setSelectedArtist(name);
              setCurrentPage("showcase");
            }}
            onBack={() => setCurrentPage("main")}
          />
        );
      case "showcase":
        return (
          <ArtistShowcase 
            artistRoute={selectedArtist} 
            onBack={handleBack}
          />
        );
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