import { ArtistProfileData } from "../../../../types/ArtistProfileData";
import { CategoryId } from "../../../../types/categories";
import ArtistCard from "./ArtistCard";
import { useEffect, useState } from "react";

// Sample artist profiles for different categories
// const artistProfiles: ArtistProfileData[] = [
//   // Music Artist
//   {
//     id: "0",
//     type: "artist",
//     category: CategoryId.MUSIC,
//     name: "Elena Sánchez",
//     title: "Pianist & Composer",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Classical pianist with 15 years of experience, specializing in contemporary compositions. Currently working on my third album that explores the intersection of classical and electronic music.",
//     location: "Barcelona, Spain",
//     stats: {
//       followers: 3245,
//       following: 420,
//       projects: 28,
//     },
//     skills: [
//       "Piano",
//       "Composition",
//       "Music Theory",
//       "Orchestra Arrangement",
//       "Electronic Production",
//     ],
//     portfolio: [
//       { title: "Moonlight Sonatas", image: "/api/placeholder/300/200" },
//       { title: "Electric Concerto No. 2", image: "/api/placeholder/300/200" },
//       { title: "Ambient Variations", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@elenasanchez",
//       twitter: "@elenasmusic",
//     },
//     contact: {
//       email: "elena@musicexample.com",
//       website: "www.elenasanchez.com",
//     },
//   },
//   // Film Artist
//   {
//     id: "artist-film-1",
//     type: "artist",
//     category: CategoryId.FILM,
//     name: "David Johnson",
//     title: "Filmmaker & Director",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Independent filmmaker with a focus on documentary storytelling. My work has been featured in several international film festivals and explores themes of social justice and environmental sustainability.",
//     location: "Los Angeles, USA",
//     stats: {
//       followers: 5629,
//       following: 342,
//       projects: 14,
//     },
//     skills: [
//       "Directing",
//       "Cinematography",
//       "Screenwriting",
//       "Video Editing",
//       "Color Grading",
//     ],
//     portfolio: [
//       { title: "The Last Frontier", image: "/api/placeholder/300/200" },
//       { title: "Urban Voices", image: "/api/placeholder/300/200" },
//       { title: "Beyond the Horizon", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@davidjfilms",
//       twitter: "@davidjohnson",
//     },
//     contact: {
//       email: "david@filmexample.com",
//       website: "www.davidjohnsonfilms.com",
//     },
//   },
//   // Theater Artist
//   {
//     id: "artist-theater-1",
//     type: "artist",
//     category: CategoryId.THEATER,
//     name: "Sophia Chen",
//     title: "Theater Director & Playwright",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Award-winning theater director with a focus on experimental and immersive productions. I blend traditional theatrical elements with modern technology to create unique audience experiences.",
//     location: "New York, USA",
//     stats: {
//       followers: 2189,
//       following: 318,
//       projects: 17,
//     },
//     skills: [
//       "Directing",
//       "Playwriting",
//       "Set Design",
//       "Acting",
//       "Production Management",
//     ],
//     portfolio: [
//       { title: "The Silent Room", image: "/api/placeholder/300/200" },
//       { title: "Urban Myths Reimagined", image: "/api/placeholder/300/200" },
//       { title: "The Digital Age", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@sophiachentheater",
//       twitter: "@sophiachen",
//     },
//     contact: {
//       email: "sophia@theaterexample.com",
//       website: "www.sophiachen.theater",
//     },
//   },
//   // Literature Artist
//   {
//     id: "artist-literature-1",
//     type: "artist",
//     category: CategoryId.LITERATURE,
//     name: "Marcus Rodriguez",
//     title: "Novelist & Poet",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Published author of three novels and two poetry collections. My work explores themes of identity, migration, and the intersection of cultural traditions in modern society.",
//     location: "Mexico City, Mexico",
//     stats: {
//       followers: 4125,
//       following: 215,
//       projects: 8,
//     },
//     skills: [
//       "Fiction Writing",
//       "Poetry",
//       "Creative Nonfiction",
//       "Literary Translation",
//       "Editing",
//     ],
//     portfolio: [
//       { title: "Crossing Borders", image: "/api/placeholder/300/200" },
//       { title: "Night Whispers", image: "/api/placeholder/300/200" },
//       { title: "The Memory Collector", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@marcusbooks",
//       twitter: "@marcusrodriguezwriter",
//     },
//     contact: {
//       email: "marcus@literatureexample.com",
//       website: "www.marcusrodriguez.com",
//     },
//   },
//   // Painting Artist
//   {
//     id: "artist-painting-1",
//     type: "artist",
//     category: CategoryId.PAINTING,
//     name: "Ava Thompson",
//     title: "Contemporary Painter",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Abstract expressionist painter with exhibitions in galleries across Europe and North America. My work explores the relationship between color, emotion, and the subconscious mind.",
//     location: "Paris, France",
//     stats: {
//       followers: 7834,
//       following: 352,
//       projects: 45,
//     },
//     skills: [
//       "Oil Painting",
//       "Acrylic",
//       "Mixed Media",
//       "Portraiture",
//       "Abstract Composition",
//     ],
//     portfolio: [
//       { title: "Chromatic Dreams", image: "/api/placeholder/300/200" },
//       { title: "Urban Fragments", image: "/api/placeholder/300/200" },
//       { title: "The Inner Landscape", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@avathompsonart",
//       twitter: "@avathompson",
//     },
//     contact: {
//       email: "ava@paintingexample.com",
//       website: "www.avathompsonart.com",
//     },
//   },
//   // Photography Artist
//   {
//     id: "artist-photography-1",
//     type: "artist",
//     category: CategoryId.PHOTOGRAPHY,
//     name: "James Kim",
//     title: "Documentary Photographer",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Documentary photographer specializing in environmental and social issues. My work has been published in National Geographic, Time, and The Guardian.",
//     location: "Seoul, South Korea",
//     stats: {
//       followers: 8972,
//       following: 645,
//       projects: 32,
//     },
//     skills: [
//       "Documentary Photography",
//       "Portraiture",
//       "Photojournalism",
//       "Digital Editing",
//       "Drone Photography",
//     ],
//     portfolio: [
//       { title: "Changing Landscapes", image: "/api/placeholder/300/200" },
//       { title: "Faces of Resilience", image: "/api/placeholder/300/200" },
//       { title: "Urban Metamorphosis", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@jamesklens",
//       twitter: "@jameskphoto",
//     },
//     contact: {
//       email: "james@photographyexample.com",
//       website: "www.jameskimphotography.com",
//     },
//   },
//   // Sculpture Artist
//   {
//     id: "artist-sculpture-1",
//     type: "artist",
//     category: CategoryId.SCULPTURE,
//     name: "Lech Adamus",
//     title: "Contemporary Sculptor",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Sculptor working primarily with sustainable and recycled materials. My installations explore themes of environmental conservation and the relationship between humans and nature.",
//     location: "São Paulo, Brazil",
//     stats: {
//       followers: 3456,
//       following: 287,
//       projects: 19,
//     },
//     skills: [
//       "Metal Sculpting",
//       "Wood Carving",
//       "Installation Art",
//       "3D Modeling",
//       "Public Art",
//     ],
//     portfolio: [
//       { title: "Urban Forest", image: "/api/placeholder/300/200" },
//       { title: "Reclaimed Memories", image: "/api/placeholder/300/200" },
//       { title: "Balance in Motion", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@isabelmoreno.art",
//       twitter: "@isabelmoreno",
//     },
//     contact: {
//       email: "isabel@sculptureexample.com",
//       website: "www.isabelmoreno.art",
//     },
//   },
//   // Fashion Artist
//   {
//     id: "artist-fashion-1",
//     type: "artist",
//     category: CategoryId.FASHION,
//     name: "Alexander Wei",
//     title: "Fashion Designer & Innovator",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Fashion designer specializing in sustainable and avant-garde clothing. My collections have been featured in Milan Fashion Week and focus on blending traditional craftsmanship with modern technology.",
//     location: "Milan, Italy",
//     stats: {
//       followers: 12567,
//       following: 389,
//       projects: 21,
//     },
//     skills: [
//       "Fashion Design",
//       "Sustainable Textiles",
//       "Pattern Making",
//       "3D Garment Modeling",
//       "Couture Techniques",
//     ],
//     portfolio: [
//       { title: "Neo Nature Collection", image: "/api/placeholder/300/200" },
//       { title: "Urban Metamorphosis", image: "/api/placeholder/300/200" },
//       { title: "Digital Heritage", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@alexanderweifashion",
//       twitter: "@alexanderwei",
//       pinterest: "alexanderwei",
//     },
//     contact: {
//       email: "alexander@fashionexample.com",
//       website: "www.alexanderwei.fashion",
//     },
//   },
//   // Computer Graphics Artist
//   {
//     id: "artist-cg-1",
//     type: "artist",
//     category: CategoryId.COMPUTER_GRAPHICS,
//     name: "Nora Patel",
//     title: "3D Artist & Motion Designer",
//     avatar: "/assets/avatar_placeholder.png",
//     coverImage: "/assets/cover_placeholder.jpg",
//     bio: "Digital artist specializing in 3D modeling and motion design. My work combines technical precision with artistic expression, creating immersive digital experiences for film, games, and interactive media.",
//     location: "London, UK",
//     stats: {
//       followers: 9231,
//       following: 574,
//       projects: 37,
//     },
//     skills: [
//       "3D Modeling",
//       "Character Design",
//       "Motion Design",
//       "Texturing",
//       "Procedural Generation",
//     ],
//     portfolio: [
//       { title: "Digital Beings", image: "/api/placeholder/300/200" },
//       { title: "Alternate Realities", image: "/api/placeholder/300/200" },
//       { title: "Synthetic Nature", image: "/api/placeholder/300/200" },
//     ],
//     social: {
//       instagram: "@norapatelcg",
//       twitter: "@norapatel",
//     },
//     contact: {
//       email: "nora@cgexample.com",
//       website: "www.norapatel.art",
//     },
//   },
// ];

const Artists = ({ categoryId }: { categoryId: CategoryId }) => {
  const [artistProfiles, setArtistProfiles] = useState<ArtistProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/artist_profile/`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch artists: ${response.status}`);
        }

        const data = await response.json();
        setArtistProfiles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch artists"
        );
        console.error("Error fetching artists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);
  // Filter artists based on selected category
  const filteredArtists =
    categoryId === CategoryId.MAIN
      ? artistProfiles // Show all artists when MAIN category is selected
      : artistProfiles.filter((artist) => artist.category === categoryId);

  return (
    <div className="max-w-3xl mx-auto mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Featured Artists
        </h2>
      </div>
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h3 className="text-xl font-medium text-gray-700">
            No Artists Found
          </h3>
          <p className="text-gray-500 mt-2">
            No artists available for the selected category at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Artists;
