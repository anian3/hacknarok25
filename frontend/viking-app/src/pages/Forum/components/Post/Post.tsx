import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Heart,
  Share2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define proper TypeScript interfaces
interface Author {
  id: string;
  name: string;
  username?: string;
  avatar: string;
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: Author;
  timestamp: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
}

// Sample data structure (for demonstration purposes)
const samplePost: Post = {
  id: "1",
  author: {
    id: "user123",
    name: "Jane Smith",
    username: "@janesmith",
    avatar: "/api/placeholder/32/32",
  },
  timestamp: "2 hours ago",
  content:
    "Just finished hiking Mount Rainier! The views were absolutely breathtaking.",
  images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
  likes: 42,
  comments: [
    {
      id: "c1",
      author: {
        id: "user456",
        name: "John Doe",
        username: "@johndoe",
        avatar: "/api/placeholder/24/24",
      },
      content: "Amazing! I've been wanting to do that hike for years!",
      timestamp: "1 hour ago",
    },
    {
      id: "c2",
      author: {
        id: "user789",
        name: "Sarah Johnson",
        username: "@sarahjohnson",
        avatar: "/api/placeholder/24/24",
      },
      content: "The weather looks perfect. What trail did you take?",
      timestamp: "30 minutes ago",
    },
  ],
};

interface PostProps {
  post?: Post;
}

const Post = ({ post = samplePost }: PostProps) => {
  const navigate = useNavigate(); // Get the navigate function from react-router
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);

  const toggleExpand = (): void => {
    setExpanded(!expanded);
  };

  const toggleShowAllImages = (e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent expanding/collapsing the post
    setShowAllImages(!showAllImages);
  };

  const handleCommentSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // In a real app, you would send this comment to your backend
    console.log("Submitting comment:", newComment);
    setNewComment("");
    setShowCommentInput(false);
  };

  const handleProfileClick = (e: React.MouseEvent, profileId: string): void => {
    e.stopPropagation();
    navigate(`/profile/${profileId}`); // Navigate to the profile page
    console.log(`Navigating to profile: ${profileId}`);
  };

  const toggleLike = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md mb-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg max-w-2xl mx-auto"
      onClick={toggleExpand}
    >
      {/* Post Header - Always visible */}
      <div className="p-4 flex items-center border-b">
        <div
          className="relative cursor-pointer"
          onClick={(e) => handleProfileClick(e, post.author.id)}
        >
          <img
            src={post.author.avatar || "/assets/avatar_placeholder.png"}
            alt="Author avatar"
            className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h3
              className="font-bold text-gray-900 mr-2 hover:text-blue-600 cursor-pointer"
              onClick={(e) => handleProfileClick(e, post.author.id)}
            >
              {post.author.name}
            </h3>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">
              {post.author.username || post.author.name}
            </span>
            <span className="text-xs text-gray-500">• {post.timestamp}</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>

      {/* Preview Content - Always visible */}
      <div className="p-4">
        <p className="text-gray-800 mb-3">
          {expanded
            ? post.content
            : `${post.content.substring(0, 100)}${
                post.content.length > 100 ? "..." : ""
              }`}
        </p>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-3">
            {/* Show first image or all images */}
            <div className="relative">
              <img
                src={post.images[0]}
                alt="Post content"
                className="w-full rounded-lg object-cover h-64"
              />

              {/* More images indicator */}
              {!showAllImages && post.images.length > 1 && (
                <button
                  className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm"
                  onClick={toggleShowAllImages}
                >
                  +{post.images.length - 1} more
                </button>
              )}
            </div>

            {/* Additional images when expanded */}
            {showAllImages && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {post.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Post content ${index + 2}`}
                    className="w-full rounded-lg object-cover h-48"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-8 py-3 border-t border-gray-100 flex justify-between text-gray-600">
        <div className="flex space-x-8">
          <button
            className={`flex items-center space-x-1 cursor-pointer ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={toggleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            <span>{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <button
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentInput(!showCommentInput);
            }}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comment Input - Visible when comment button is clicked */}
      {showCommentInput && (
        <div
          className="px-4 py-3 border-t"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleCommentSubmit} className="flex">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>
        </div>
      )}

      {/* Expanded Comments Section */}
      {expanded && post.comments.length > 0 && (
        <div className="border-t p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Comments</h4>
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full mt-1 cursor-pointer"
                  onClick={(e) => handleProfileClick(e, comment.author.id)}
                />
                <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5
                        className="font-medium text-gray-900 text-sm hover:text-blue-600 cursor-pointer"
                        onClick={(e) =>
                          handleProfileClick(e, comment.author.id)
                        }
                      >
                        {comment.author.name}
                      </h5>
                      <span className="text-xs text-gray-600">
                        {comment.author.username || comment.author.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
