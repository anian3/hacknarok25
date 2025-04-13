import { ArtistProfileData } from "../../../../types/ArtistProfileData";

// ArtistCard Component
const ArtistCard = ({ artist }: { artist: ArtistProfileData }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">{artist.name}</h3>
            <p className="text-sm text-gray-500">{artist.title}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.bio}</p>

        <div className="text-xs text-gray-500 mb-3">
          <span className="mr-3">
            <span className="font-medium">{artist.stats.followers}</span>{" "}
            followers
          </span>
          <span>
            <span className="font-medium">{artist.stats.projects}</span>{" "}
            projects
          </span>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {artist.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {artist.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{artist.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <a
          href={`/profile/artist/${artist.id}`}
          className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default ArtistCard;
