import { Button } from "@/components/ui/button";

export default function MainMenu() {
  return (
    <div className="space-background min-h-screen">
      <div className="content-layer flex flex-col items-center justify-center min-h-screen gap-6 p-4">
        <h1 className="text-5xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-stylized">
          Choose One
        </h1>

        <Button 
          className="w-48 h-16 text-xl hover:scale-105 transition-transform 
                     bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
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
    </div>
  );
}