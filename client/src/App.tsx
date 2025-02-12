import { useState, useEffect } from "react";
import MainMenu from "./pages/MainMenu";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import { Toaster } from "@/components/ui/toaster";
import { ARTISTS } from "./lib/constants";
import "./lib/fonts.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Preload all assets when the app starts
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload all images
        const imagePromises = ARTISTS.map(artist => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = artist.image;
          });
        });

        // Preload all audio
        const audioPromises = ARTISTS.map(artist => {
          return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = "auto";
            audio.oncanplaythrough = resolve;
            audio.onerror = reject;
            audio.src = artist.audioUrl;
          });
        });

        // Wait for all assets to load
        await Promise.race([
          Promise.all([...imagePromises, ...audioPromises]),
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        setAssetsLoaded(true);
      } catch (error) {
        console.error("Error preloading assets:", error);
        // Still set assets as loaded to not block the UI
        setAssetsLoaded(true);
      }
    };

    preloadAssets();
  }, []);

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
    if (!assetsLoaded) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading assets</div>
        </div>
      );
    }

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
    <div className="min-h-screen bg-black text-white" style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {renderPage()}
      <Toaster />
    </div>
  );
}