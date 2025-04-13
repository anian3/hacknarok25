import { CategoryId } from "../../../../types/categories";
import Post from "../Post/Post";

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
        id: "artist/0",
        name: "Elena Sanchez",
        avatar: "",
      },
      timestamp: "3 hours ago",
      content:
        "Just discovered this amazing indie band called 'Northern Lights'. Their harmonies are absolutely ethereal. Has anyone else been listening to their new album?",
      images: [""],
      likes: 28,
      comments: [
        {
          id: "mc1",
          author: {
            id: "user234",
            name: "BassGroove",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "Yesterday",
      content:
        "I've been practicing Bach's Cello Suite No. 1 for months now. Would love some feedback on my technique if anyone has the time.",
      images: [""],
      likes: 45,
      comments: [
        {
          id: "mc2",
          author: {
            id: "user456",
            name: "ViolinVirtuoso",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "5 hours ago",
      content:
        "Just finished watching 'The Lighthouse' (2019). The black and white cinematography and claustrophobic atmosphere create such a haunting experience. What did you all think of the ending?",
      images: [""],
      likes: 72,
      comments: [
        {
          id: "fc1",
          author: {
            id: "user678",
            name: "FilmBuff",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "1 day ago",
      content:
        "Our community theater is putting on 'Waiting for Godot' next month. I'm directing for the first time and would love some advice on staging such an abstract work.",
      images: [""],
      likes: 34,
      comments: [
        {
          id: "tc1",
          author: {
            id: "user890",
            name: "ThespianExpert",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "2 days ago",
      content:
        "I just finished 'One Hundred Years of Solitude' and I'm completely mesmerized. The way García Márquez weaves reality and magic is unlike anything I've read before.",
      images: [""],
      likes: 86,
      comments: [
        {
          id: "lc1",
          author: {
            id: "user012",
            name: "LiteraryScholar",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "4 hours ago",
      content:
        "Just finished this watercolor landscape inspired by Monet's style. Still working on my technique with light and reflection. Any feedback is welcome!",
      images: [""],
      likes: 112,
      comments: [
        {
          id: "pc1",
          author: {
            id: "user234",
            name: "ArtTeacher",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "6 hours ago",
      content:
        "Caught this amazing sunset at Glacier National Park last week. Shot on my Sony A7IV with minimal post-processing. Nature's colors are just incredible.",
      images: [""],
      likes: 203,
      comments: [
        {
          id: "phc1",
          author: {
            id: "user456",
            name: "PhotographyPro",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "2 days ago",
      content:
        "Finally completed this marble piece after 3 months of work. Trying to capture the flowing movement in static stone was challenging but rewarding.",
      images: [
        "/assets/pudzian.jpg",
        "/assets/post_picture.png",
        "/assets/pudzian.jpg",
        "/assets/pudzian.jpg",
      ],
      likes: 67,
      comments: [
        {
          id: "sc1",
          author: {
            id: "user678",
            name: "ArtHistorian",
            avatar: "",
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
        avatar: "",
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
            avatar: "",
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
        avatar: "",
      },
      timestamp: "3 days ago",
      content:
        "After weeks of rendering, my latest 3D environment is complete! Created in Blender with custom shaders for the volumetric lighting. Swipe to see the wireframe and clay renders.",
      images: [],
      likes: 215,
      comments: [
        {
          id: "cgc1",
          author: {
            id: "user012",
            name: "BlenderGuru",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "1 hour ago",
      content:
        "Hello fellow artists! I'm new to this platform and excited to connect with creative minds. I work primarily in mixed media and digital art. What are you all working on these days?",
      images: [""],
      likes: 42,
      comments: [
        {
          id: "mainc1",
          author: {
            id: "user234",
            name: "CreativeSoul",
            avatar: "",
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
        avatar: "",
      },
      timestamp: "Yesterday",
      content:
        "🎉 Exciting news! We're hosting our first virtual art exhibition next month. All members are invited to submit their work. Theme: 'Transitions'. Submission details in the comments!",
      images: [""],
      likes: 183,
      comments: [
        {
          id: "mainc2",
          author: {
            id: "user345",
            name: "CommunityManager",
            avatar: "",
          },
          content:
            "Submission deadline: May 15th. Max 3 pieces per artist. Email submissions to virtual@vikingapp.com with 'Exhibition Submission' in the subject.",
          timestamp: "Yesterday",
        },
      ],
    },
  ],
};

const Forum = ({ categoryId }: { categoryId: CategoryId }) => {
  const categoryName = categoryNames[categoryId as CategoryId];
  const categoryPosts = samplePosts[categoryId as CategoryId] || [];

  return categoryPosts.length > 0 ? (
    categoryPosts.map((post) => <Post key={post.id} post={post} />)
  ) : (
    <div className="bg-white p-8 rounded-max shadow text-center">
      <h3 className="text-xl font-medium text-gray-700">No posts yet</h3>
      <p className="text-gray-500 mt-2">
        Be the first to post in the {categoryName} forum!
      </p>
    </div>
  );
};

export default Forum;
