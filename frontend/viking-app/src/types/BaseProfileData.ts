export type BaseProfileData = {
  id: string; // Unique identifier for each profile
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  contact: {
    email: string;
    website: string;
    social: Record<string, string>;
  };
};

