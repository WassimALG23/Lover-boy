import { Route, Switch } from "wouter";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Switch>
        <Route path="/" component={MainMenu} />
        <Route path="/artists" component={ArtistSelection} />
        <Route path="/artist/:name" component={ArtistShowcase} />
      </Switch>
    </div>
  );
}

function MainMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl mb-8 font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
        Choose Your Vibe
      </h1>
      <Button 
        className="w-48 h-16 text-xl hover:scale-105 transition-transform 
                   bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500"
        asChild
      >
        <a href="/artists">Artists</a>
      </Button>
      <Button 
        className="w-48 h-16 text-xl opacity-50 cursor-not-allowed
                   bg-gradient-to-r from-gray-600 to-gray-700"
        disabled
      >
        Anime
      </Button>
    </div>
  );
}
