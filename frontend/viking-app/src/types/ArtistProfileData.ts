import { BaseProfileData } from "./BaseProfileData";
import { CategoryId } from "./categories";

export type ArtistProfileData = BaseProfileData & {
  type: "artist";
  category: CategoryId;
  stats: {
    followers: number;
    following: number;
    projects: number;
  };
  skills: string[];
  portfolio: { title: string; image: string }[];
};