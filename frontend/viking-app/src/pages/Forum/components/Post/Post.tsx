import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Heart, Share2 } from "lucide-react";

// Sample data structure (for demonstration purposes)
const samplePost = {
  id: "1",
  author: {
    id: "user123",
    name: "Jane Smith",
    avatar: "/api/placeholder/32/32"
  },
  timestamp: "2 hours ago",
  content: "Just finished hiking Mount Rainier! The views were absolutely breathtaking.",
  images: [
    "/api/placeholder/600/400",
    "/api/placeholder/600/400"
  ],
  likes: 42,
  comments: [
    {
      id: "c1",
      author: {
        id: "user456",
        name: "John Doe",
        avatar: "/api/placeholder/24/24"
      },
      content: "Amazing! I've been wanting to do that hike for years!",
      timestamp: "1 hour ago"
    },
    {
      id: "c2",
      author: {
        id: "user789",
        name: "Sarah Johnson",
        avatar: "/api/placeholder/24/24"
      },
      content: "The weather looks perfect. What trail did you take?",
      timestamp: "30 minutes ago"
    }
  ]
};

const Post = ({ post = samplePost }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleShowAllImages = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation(); // Prevent expanding/collapsing the post
    setShowAllImages(!showAllImages);
  };

  const handleCommentSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // In a real app, you would send this comment to your backend
    console.log("Submitting comment:", newComment);
    setNewComment("");
    setShowCommentInput(false);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md mb-4 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={toggleExpand}
    >
      {/* Post Header - Always visible */}
      <div className="p-4 flex items-center border-b">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{post.author.name}</h3>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
        {expanded ? 
          <ChevronUp className="h-5 w-5 text-gray-500" /> : 
          <ChevronDown className="h-5 w-5 text-gray-500" />
        }
      </div>

      {/* Preview Content - Always visible */}
      <div className="p-4">
        <p className="text-gray-800 mb-3">
          {expanded ? post.content : `${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}`}
        </p>
        
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-3">
            {/* Show first image or all images */}
            <div className="relative">
              <img 
                src={post.images[0]} 
                alt="Post content" 
                className="w-full rounded-lg object-cover max-h-64"
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
            {showAllImages && expanded && (
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
      <div className="px-4 py-2 border-t border-gray-100 flex space-x-4 text-gray-600">
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <Heart className="h-5 w-5" />
          <span>{post.likes}</span>
        </button>
        <button 
          className="flex items-center space-x-1 hover:text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            setShowCommentInput(!showCommentInput);
          }}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      
      {/* Comment Input - Visible when comment button is clicked */}
      {showCommentInput && (
        <div className="px-4 py-3 border-t" onClick={(e) => e.stopPropagation()}>
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
            {post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-2">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.name} 
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900 text-sm">{comment.author.name}</h5>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
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