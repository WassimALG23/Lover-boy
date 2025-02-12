import { useState, useEffect } from "react";
import MainMenu from "./pages/MainMenu";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import SubmissionForm from "./pages/SubmissionForm";
import AdminPanel from "./pages/AdminPanel";
import { Toaster } from "@/components/ui/toaster";
import { useLocation, Link, Route, Switch } from "wouter";
import { ARTISTS } from "./lib/constants";
import "./lib/fonts.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [location] = useLocation();

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

        // Wait for all assets to load completely
        await Promise.all([...imagePromises, ...audioPromises]);
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

  const renderMainContent = () => {
    if (!assetsLoaded) {
      return (
        <div className="loading-container">
          <div className="loading-spinner" />
          <div className="loading-text">Loading your experience</div>
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
      {/* Background image */}
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

      {/* Admin Button */}
      <Link href="/admin" className="admin-button">
        Admin Panel
      </Link>

      {/* Content */}
      <div className="relative z-20">
        <Switch>
          <Route path="/admin" component={AdminPanel} />
          <Route path="/submit" component={SubmissionForm} />
          <Route>
            <div className="page-transition-enter-active">
              {renderMainContent()}
            </div>
          </Route>
        </Switch>
      </div>
      <Toaster />
    </div>
  );
}