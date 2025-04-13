export type BaseProfileData = {
  id: string; // Unique identifier for each profile
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  social: Partial<{
    instagram: string;
    twitter: string;
    youtube: string;
    facebook: string;
    pinterest: string;
    // You can add more social platforms here in the future
  }>;
  contact: Partial<{
    email: string;
    website: string;
    phone: string;
  }>;
};

