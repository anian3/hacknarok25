import { ArtistProfileData } from "../../../../types/ArtistProfileData";
import { MapPin, Mail, Phone, Instagram, Youtube, Twitter } from "lucide-react";
import { useState } from "react";

const ArtistCard = ({ artist }: { artist: ArtistProfileData }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    e.stopPropagation(); // Prevent event bubbling
    setIsFollowed(!isFollowed);
  };

  return (
    <a
      href={`/profile/artist/${artist.id}`}
      className="block w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section (Avatar + Profile) */}
          <div className="flex-grow p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {artist.avatar ? (
                  <img 
                    src={artist.avatar} 
                    alt={`${artist.name}'s profile`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-800 text-xl font-semibold">
                      {artist.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name, Location, Follow button */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {artist.name}
                    </h2>
                    {artist.location && (
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{artist.location}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleFollowClick}
                    className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors cursor-pointer overflow-hidden ${
                      isFollowed
                        ? "bg-indigo-900 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 my-6 text-sm leading-relaxed">
              {artist.bio}
            </p>

            {/* Contact & Social */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{artist.stats.projects}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{artist.stats.followers}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{artist.stats.following}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                </div>

                {/* Contact & Social Section */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center ml-auto">
                  {artist.contact?.email && (
                    <div className="flex items-center text-sm text-gray-600 hover:text-indigo-700">
                      <Mail size={16} className="mr-1.5" />
                      <span>{artist.contact.email}</span>
                    </div>
                  )}
                  {artist.contact?.phone && (
                    <div className="flex items-center text-sm text-gray-600 hover:text-indigo-700">
                      <Phone size={16} className="mr-1.5" />
                      <span>{artist.contact.phone}</span>
                    </div>
                  )}
                  {artist.social?.instagram && (
                    <div className="flex items-center text-sm text-gray-600 hover:text-indigo-700">
                      <Instagram size={16} className="mr-1.5" />
                      <span>{artist.social.instagram}</span>
                    </div>
                  )}
                  {artist.social?.youtube && (
                    <div className="flex items-center text-sm text-gray-600 hover:text-indigo-700">
                      <Youtube size={16} className="mr-1.5" />
                      <span>{artist.social.youtube}</span>
                    </div>
                  )}
                  {artist.social?.twitter && (
                    <div className="flex items-center text-sm text-gray-600 hover:text-indigo-700">
                      <Twitter size={16} className="mr-1.5" />
                      <span>{artist.social.twitter}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArtistCard;