import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileType } from "../../types/ProfileType";
import { ArtistProfileData } from "../../types/ArtistProfileData";
import { ProfileData } from "../../types/ProfileData";
import { BusinessProfileData } from "../../types/BusinessProfileData";
import { CategoryId } from "../../types/categories";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { profileType, categoryId } = useParams<{
    profileType: ProfileType;
    categoryId: string;
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you'd fetch based on URL params
    // For now we'll use sample data
    setProfile(getDefaultProfile());

    if (!profileType || !categoryId) {
      // Redirect to a default profile if none is selected
      navigate("/profile/artist/0", { replace: true });
    }
  }, [profileType, categoryId, navigate]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full object-cover"
          />
        </div>
        <div className="absolute left-8 -bottom-16">
          <img
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            className="w-50 h-50 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-8 pb-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-xl text-gray-600">{profile.title}</p>
            <p className="text-gray-500 mt-1">
              <span className="inline-flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {profile.location}
              </span>
            </p>
          </div>

          {/* Profile Type Badge */}
          <div className="mt-4 md:mt-0">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                profile.type === "artist"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {profile.type === "artist" ? "Artist" : "Business"}
            </span>
          </div>
        </div>

        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Bio Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </section>

            {/* Portfolio/Featured Work Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                {profile.type === "artist" ? "Portfolio" : "Featured Work"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.type === "artist"
                  ? (profile as ArtistProfileData).portfolio.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      )
                    )
                  : (profile as BusinessProfileData).featuredWork.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      )
                    )}
              </div>
            </section>

            {/* Category (For Artists) or Services (For Businesses) */}
            {profile.type === "artist" ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                  Category
                </h2>
                <p className="text-gray-700">
                  {(profile as ArtistProfileData).category}
                </p>
              </section>
            ) : (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                  Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(profile as BusinessProfileData).services.map(
                    (service, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-1">
            {/* Stats Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Stats
              </h2>
              {profile.type === "artist" ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-medium">
                      {(
                        profile as ArtistProfileData
                      ).stats.followers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Following</span>
                    <span className="font-medium">
                      {(
                        profile as ArtistProfileData
                      ).stats.following.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-medium">
                      {(
                        profile as ArtistProfileData
                      ).stats.projects.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries((profile as BusinessProfileData).stats).map(
                    ([key, value], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span className="font-medium">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </section>

            {/* Skills (For Artists) */}
            {profile.type === "artist" && (
              <section className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(profile as ArtistProfileData).skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Contact
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {profile.contact.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a
                    href={
                      profile.contact.website.startsWith("http")
                        ? profile.contact.website
                        : `https://${profile.contact.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.contact.website}
                  </a>
                </li>

                {/* Business-specific contact fields */}
                {profile.type === "business" &&
                  (profile as BusinessProfileData).contact.phone && (
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-500 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>
                        {(profile as BusinessProfileData).contact.phone}
                      </span>
                    </li>
                  )}

                {profile.type === "business" &&
                  (profile as BusinessProfileData).contact.address && (
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-500 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {(profile as BusinessProfileData).contact.address}
                      </span>
                    </li>
                  )}
              </ul>

              {/* Social Links */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Social Media
                </h3>
                <div className="flex space-x-3">
                  {Object.entries(profile.contact.social).map(
                    ([platform, handle], index) => (
                      <a
                        key={index}
                        href={`https://${platform}.com/${handle.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                        title={`${platform}: ${handle}`}
                      >
                        <span className="sr-only">{platform}</span>
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
                          {platform.charAt(0).toUpperCase()}
                        </div>
                      </a>
                    )
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample artist profile data
const artistSampleProfile: ArtistProfileData = {
  id: "0",
  type: "artist",
  category: CategoryId.MUSIC,
  name: "Elena Sánchez",
  title: "Pianist & Composer",
  avatar: "/assets/avatar_placeholder.png",
  coverImage: "/assets/cover_placeholder.jpg",
  bio: "Classical pianist with 15 years of experience, specializing in contemporary compositions. Currently working on my third album that explores the intersection of classical and electronic music.",
  location: "Barcelona, Spain",
  stats: {
    followers: 3245,
    following: 420,
    projects: 28,
  },
  skills: [
    "Piano",
    "Composition",
    "Music Theory",
    "Orchestra Arrangement",
    "Electronic Production",
  ],
  portfolio: [
    { title: "Moonlight Sonatas", image: "/api/placeholder/300/200" },
    { title: "Electric Concerto No. 2", image: "/api/placeholder/300/200" },
    { title: "Ambient Variations", image: "/api/placeholder/300/200" },
  ],
  contact: {
    email: "elena@musicexample.com",
    website: "www.elenasanchez.com",
    social: {
      instagram: "@elenasanchez",
      twitter: "@elenasmusic",
      soundcloud: "elenasanchez",
    },
  },
};

// Sample business profile data
const businessSampleProfile: BusinessProfileData = {
  id: "business-studio-1",
  type: "business",
  name: "Harmony Studios",
  title: "Recording & Production Studio",
  avatar: "/assets/business_avatar.png",
  coverImage: "/assets/business_cover.jpg",
  bio: "Professional recording studio with state-of-the-art equipment and experienced sound engineers. We specialize in music production, post-production, and audio mastering services.",
  location: "Madrid, Spain",
  stats: {
    clients: 150,
    projects: 420,
    awards: 12,
    yearsActive: 15,
  },
  services: [
    "Music Recording",
    "Audio Mixing",
    "Sound Design",
    "Audio Mastering",
    "Voice Over Production",
  ],
  featuredWork: [
    { title: "Album: Nueva Era", image: "/api/placeholder/300/200" },
    {
      title: "Film Score: Midnight in Madrid",
      image: "/api/placeholder/300/200",
    },
    {
      title: "Documentary: Sound of Nature",
      image: "/api/placeholder/300/200",
    },
  ],
  contact: {
    email: "info@harmonystudios.com",
    website: "www.harmonystudios.com",
    phone: "+34 91 123 4567",
    address: "Calle Gran Vía 123, 28013 Madrid, Spain",
    social: {
      instagram: "@harmonystudios",
      facebook: "harmonystudios",
      youtube: "HarmonyStudiosOfficial",
    },
  },
};

// Function to get the default profile (you might fetch this from an API in a real app)
const getDefaultProfile = (): ProfileData => {
  // You could check URL parameters here to determine which profile to return
  return artistSampleProfile;
};

export default Profile;
