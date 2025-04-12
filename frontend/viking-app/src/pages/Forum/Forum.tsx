import React from "react";
import { useParams } from "react-router-dom";
import { CategoryId } from "../../types/categories";
import Post from "./components/Post/Post";
import { useState } from 'react';

const categoryNames: Record<CategoryId, string> = {
  [CategoryId.MUSIC]: "Music",
  [CategoryId.FILM]: "Film",
  [CategoryId.THEATER]: "Theater",
  [CategoryId.LITERATURE]: "Literature",
  [CategoryId.PAINTING]: "Painting",
  [CategoryId.PHOTOGRAPHY]: "Photography",
  [CategoryId.SCULPTURE]: "Sculpture",
  [CategoryId.FASHION]: "Fashion",
  [CategoryId.COMPUTER_GRAPHICS]: "Computer Graphics",
  [CategoryId.MAIN]: "Main",
};

// Sample post data categorized by forum category
const samplePosts = {
  [CategoryId.MUSIC]: [
    {
      id: "m1",
      author: {
        id: "user123",
        name: "MelodyMaster",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "3 hours ago",
      content:
        "Just discovered this amazing indie band called 'Northern Lights'. Their harmonies are absolutely ethereal. Has anyone else been listening to their new album?",
      images: ["/api/placeholder/600/400"],
      likes: 28,
      comments: [
        {
          id: "mc1",
          author: {
            id: "user234",
            name: "BassGroove",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Yes! Their vocalist has such a unique timbre. I caught them live last month and was blown away.",
          timestamp: "2 hours ago",
        },
      ],
    },
    {
      id: "m2",
      author: {
        id: "user345",
        name: "ClassicalFan",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "Yesterday",
      content:
        "I've been practicing Bach's Cello Suite No. 1 for months now. Would love some feedback on my technique if anyone has the time.",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      likes: 45,
      comments: [
        {
          id: "mc2",
          author: {
            id: "user456",
            name: "ViolinVirtuoso",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Your bowing looks smooth. Maybe try emphasizing the first note of each measure a bit more?",
          timestamp: "12 hours ago",
        },
      ],
    },
  ],

  [CategoryId.FILM]: [
    {
      id: "f1",
      author: {
        id: "user567",
        name: "CinemaCritic",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "5 hours ago",
      content:
        "Just finished watching 'The Lighthouse' (2019). The black and white cinematography and claustrophobic atmosphere create such a haunting experience. What did you all think of the ending?",
      images: ["/api/placeholder/600/400"],
      likes: 72,
      comments: [
        {
          id: "fc1",
          author: {
            id: "user678",
            name: "FilmBuff",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "The ambiguity is what makes it brilliant! Eggers really knows how to create psychological horror.",
          timestamp: "3 hours ago",
        },
      ],
    },
  ],

  [CategoryId.THEATER]: [
    {
      id: "t1",
      author: {
        id: "user789",
        name: "StageDirector",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "1 day ago",
      content:
        "Our community theater is putting on 'Waiting for Godot' next month. I'm directing for the first time and would love some advice on staging such an abstract work.",
      images: ["/api/placeholder/600/400"],
      likes: 34,
      comments: [
        {
          id: "tc1",
          author: {
            id: "user890",
            name: "ThespianExpert",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Keep the staging minimal - the emptiness is part of the play's essence. Focus on the rhythm of the dialogue.",
          timestamp: "18 hours ago",
        },
      ],
    },
  ],

  [CategoryId.LITERATURE]: [
    {
      id: "l1",
      author: {
        id: "user901",
        name: "BookWorm",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "2 days ago",
      content:
        "I just finished 'One Hundred Years of Solitude' and I'm completely mesmerized. The way García Márquez weaves reality and magic is unlike anything I've read before.",
      images: ["/api/placeholder/600/400"],
      likes: 86,
      comments: [
        {
          id: "lc1",
          author: {
            id: "user012",
            name: "LiteraryScholar",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "If you enjoyed that, you should try 'Love in the Time of Cholera' next. His prose is equally beautiful there.",
          timestamp: "1 day ago",
        },
      ],
    },
  ],

  [CategoryId.PAINTING]: [
    {
      id: "p1",
      author: {
        id: "user123",
        name: "ImpressionistLover",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "4 hours ago",
      content:
        "Just finished this watercolor landscape inspired by Monet's style. Still working on my technique with light and reflection. Any feedback is welcome!",
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
      likes: 112,
      comments: [
        {
          id: "pc1",
          author: {
            id: "user234",
            name: "ArtTeacher",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "The color palette is gorgeous! Maybe try a slightly softer transition in the water reflections?",
          timestamp: "2 hours ago",
        },
      ],
    },
  ],

  [CategoryId.PHOTOGRAPHY]: [
    {
      id: "ph1",
      author: {
        id: "user345",
        name: "LensExplorer",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "6 hours ago",
      content:
        "Caught this amazing sunset at Glacier National Park last week. Shot on my Sony A7IV with minimal post-processing. Nature's colors are just incredible.",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      likes: 203,
      comments: [
        {
          id: "phc1",
          author: {
            id: "user456",
            name: "PhotographyPro",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Stunning composition! The silhouette of the mountains creates such a dramatic effect.",
          timestamp: "4 hours ago",
        },
      ],
    },
  ],

  [CategoryId.SCULPTURE]: [
    {
      id: "s1",
      author: {
        id: "user567",
        name: "StoneCrafter",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "2 days ago",
      content:
        "Finally completed this marble piece after 3 months of work. Trying to capture the flowing movement in static stone was challenging but rewarding.",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      likes: 67,
      comments: [
        {
          id: "sc1",
          author: {
            id: "user678",
            name: "ArtHistorian",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "The dynamism you've achieved is remarkable. Reminds me of Bernini's approach to capturing motion.",
          timestamp: "1 day ago",
        },
      ],
    },
  ],

  [CategoryId.FASHION]: [
    {
      id: "fa1",
      author: {
        id: "user789",
        name: "StylishDesigner",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "1 day ago",
      content:
        "Just finished this upcycled denim collection for my sustainable fashion project. All materials are second-hand or deadstock fabrics. What do you think of the patchwork technique?",
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
      likes: 148,
      comments: [
        {
          id: "fac1",
          author: {
            id: "user890",
            name: "FashionEditor",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Love the sustainability angle! The contrast stitching adds a really nice contemporary edge.",
          timestamp: "12 hours ago",
        },
      ],
    },
  ],

  [CategoryId.COMPUTER_GRAPHICS]: [
    {
      id: "cg1",
      author: {
        id: "user901",
        name: "PixelMaster",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "3 days ago",
      content:
        "After weeks of rendering, my latest 3D environment is complete! Created in Blender with custom shaders for the volumetric lighting. Swipe to see the wireframe and clay renders.",
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
      ],
      likes: 215,
      comments: [
        {
          id: "cgc1",
          author: {
            id: "user012",
            name: "BlenderGuru",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "The atmospheric perspective is masterfully done! What did you use for the fog effect?",
          timestamp: "2 days ago",
        },
      ],
    },
  ],

  [CategoryId.MAIN]: [
    {
      id: "main1",
      author: {
        id: "user123",
        name: "ArtEnthusiast",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "1 hour ago",
      content:
        "Hello fellow artists! I'm new to this platform and excited to connect with creative minds. I work primarily in mixed media and digital art. What are you all working on these days?",
      images: ["/api/placeholder/600/400"],
      likes: 42,
      comments: [
        {
          id: "mainc1",
          author: {
            id: "user234",
            name: "CreativeSoul",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Welcome! I'm currently experimenting with linocut printmaking. Would love to see some of your mixed media work!",
          timestamp: "30 minutes ago",
        },
      ],
    },
    {
      id: "main2",
      author: {
        id: "user345",
        name: "CommunityManager",
        avatar: "/api/placeholder/32/32",
      },
      timestamp: "Yesterday",
      content:
        "🎉 Exciting news! We're hosting our first virtual art exhibition next month. All members are invited to submit their work. Theme: 'Transitions'. Submission details in the comments!",
      images: ["/api/placeholder/600/400"],
      likes: 183,
      comments: [
        {
          id: "mainc2",
          author: {
            id: "user345",
            name: "CommunityManager",
            avatar: "/api/placeholder/24/24",
          },
          content:
            "Submission deadline: May 15th. Max 3 pieces per artist. Email submissions to virtual@vikingapp.com with 'Exhibition Submission' in the subject.",
          timestamp: "Yesterday",
        },
      ],
    },
  ],
};

const Forum: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const [selectedSection, setSelectedSection] = useState<'Forum' | 'Jobs' | 'Artists'>('Forum'); // Domyślnie "Forum"

  const currentCategory = categoryId || CategoryId.MAIN;
  const categoryName = categoryNames[currentCategory as CategoryId];
  const categoryPosts = samplePosts[currentCategory as CategoryId] || [];
  const handleSectionChange = (section: 'Forum' | 'Jobs' | 'Artists') => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen m-0">
      {/* Nagłówek z przyciskami - pasek z tłem rozciągnięty na całą szerokość */}
      <header className="flex justify-center bg-blue-300 py-4 w-full">
        {/*Wiadomość w lewym rogu wyśrodkowana w pionie */}
        <div className="absolute left-0 ml-4 text-2xl font-bold py-1.5 ">
          {categoryName && categoryName !== "Main" ? (
            <span className="text-black">{categoryName}</span>
          ) : (
            <span className="text-black"></span>
          )}
        </div>

        <button
          onClick={() => handleSectionChange('Forum')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Forum' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Forum
        </button>
        <button
          onClick={() => handleSectionChange('Jobs')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Jobs' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => handleSectionChange('Artists')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Artists' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Artists
        </button>
      </header>

      {/* Sekcja informująca o aktualnej wybranej sekcji */}
      <main className="flex-grow text-center mt-4 px-0">

        <div className="space-y-6 mt-8">
          {categoryPosts.length > 0 ? (
            categoryPosts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-xl font-medium text-gray-700">
                No posts yet
              </h3>
              <p className="text-gray-500 mt-2">
                Be the first to post in the {categoryName} forum!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Forum;
