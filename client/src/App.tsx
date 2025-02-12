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
        // Preload all images in parallel
        const imagePromises = ARTISTS.map(artist => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = artist.image;
          });
        });

        // Preload all audio in parallel
        const audioPromises = ARTISTS.map(artist => {
          return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = "auto";
            audio.oncanplaythrough = resolve;
            audio.onerror = reject;
            audio.src = artist.audioUrl;
          });
        });

        // Wait for all assets to load with a shorter timeout (1.5s)
        await Promise.race([
          Promise.all([...imagePromises, ...audioPromises]),
          new Promise(resolve => setTimeout(resolve, 1500))
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
    if (currentPage === "showcase") {
      setCurrentPage("artists");
    } else if (currentPage === "artists") {
      setCurrentPage("main");
    }
  };

  const renderPage = () => {
    if (!assetsLoaded) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="loading-spinner mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <div className="loading-text text-lg font-medium text-white">Loading your experience...</div>
          </div>
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
    <div className="relative min-h-screen bg-black text-white">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Dark overlay for better text visibility */}
      <div className="fixed inset-0 z-10 bg-black/40" />

      {/* Content */}
      <div className="relative z-20">
        {renderPage()}
      </div>
      <Toaster />
    </div>
  );
}