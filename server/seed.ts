import { storage } from "./storage";

const seedData = async () => {
  try {
    // Sample artists
    const artists = [
      {
        name: "Mac DeMarco",
        route: "mac-demarco",
        image: "/artists/mac-demarco.jpg",
      },
      {
        name: "TV Girl",
        route: "tv-girl",
        image: "/artists/tv-girl.jpg",
      },
      {
        name: "Mitski",
        route: "mitski",
        image: "/artists/mitski.jpg",
      }
    ];

    // Insert artists
    for (const artistData of artists) {
      const artist = await storage.createArtist(artistData);
      console.log(`Created artist: ${artist.name}`);

      // Add sample songs for each artist
      const songs = [
        {
          name: `${artist.name} Song 1`,
          lyric: "Sample lyrics 1",
          audioUrl: `/audio/${artist.route}-1.mp3`,
          artistId: artist.id
        },
        {
          name: `${artist.name} Song 2`,
          lyric: "Sample lyrics 2",
          audioUrl: `/audio/${artist.route}-2.mp3`,
          artistId: artist.id
        }
      ];

      for (const songData of songs) {
        await storage.createSong(songData);
        console.log(`Created song: ${songData.name}`);
      }
    }

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

export { seedData };
