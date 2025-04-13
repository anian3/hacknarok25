import { ArtistProfileData } from "../../../../types/ArtistProfileData";
import { User, MapPin, Mail, Phone, Instagram, Youtube, Twitter } from "lucide-react";
import { useState } from "react";

const ArtistCard = ({ artist }: { artist: ArtistProfileData }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  
  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    e.stopPropagation(); // Prevent event bubbling
    setIsFollowed(!isFollowed);
  };
  
  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    e.stopPropagation(); // Prevent event bubbling
    // Message functionality would go here
  };

  return (
    <a 
      href={`/profile/artist/${artist.id}`}
      className="block w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col md:flex-row">
        {/* Left Section (Profile) */}
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{artist.name}</h2>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin size={16} className="mr-1" />
                <span>{artist.location}</span>
              </div>
            </div>
            <button
              onClick={handleFollowClick}
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                isFollowed 
                ? "bg-indigo-900 text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {isFollowed ? "followed" : "follow"}
            </button>
          </div>
          
          <p className="text-gray-600 mb-6 text-sm">{artist.bio}</p>
          
          <div className="flex space-x-3 border-t border-gray-100 pt-4">
            <div className="text-center px-4">
              <div className="font-semibold">{artist.stats.projects}+</div>
              <div className="text-xs text-gray-500">projects</div>
            </div>
            <div className="text-center px-4">
              <div className="font-semibold">{artist.stats.followers}+</div>
              <div className="text-xs text-gray-500">followers</div>
            </div>
            <div className="text-center px-4">
              <div className="font-semibold">{artist.stats.following}+</div>
              <div className="text-xs text-gray-500">following</div>
            </div>
          </div>
        </div>
        
        {/* Right Section (Contact) */}
        <div className="bg-gray-50 p-6 md:w-64 md:border-l border-gray-100 flex flex-col">
          <div className="mb-6">
            <h3 className="text-gray-800 font-medium mb-2">Contact</h3>
            <div className="flex items-center mb-2 text-sm">
              <Mail size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{artist.contact.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{artist.contact.phone}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-gray-800 font-medium mb-2">Social media</h3>
            <div className="flex items-center mb-2 text-sm">
              <Instagram size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{artist.social.instagram}</span>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <Youtube size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{artist.social.youtube}</span>
            </div>
            <div className="flex items-center text-sm">
              <Twitter size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{artist.social.twitter}</span>
            </div>
          </div>
          
          <button
            onClick={handleMessageClick}
            className="mt-auto bg-indigo-900 text-white py-2 px-4 rounded-lg w-full text-center hover:bg-indigo-800 transition-colors"
          >
            send a message
          </button>
        </div>
      </div>
    </a>
  );
};

export default ArtistCard;