import { Route, Switch } from "wouter";
import MainMenu from "./pages/MainMenu";
import ArtistSelection from "./pages/ArtistSelection";
import ArtistShowcase from "./pages/ArtistShowcase";
import { Toaster } from "@/components/ui/toaster";
import "./lib/fonts.css";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Switch>
        <Route path="/" component={MainMenu} />
        <Route path="/artists" component={ArtistSelection} />
        <Route path="/artist/:name" component={ArtistShowcase} />
      </Switch>
      <Toaster />
    </div>
  );
}
