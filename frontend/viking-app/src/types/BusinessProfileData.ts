import { BaseProfileData } from "./BaseProfileData";

export type BusinessProfileData = BaseProfileData & {
  type: "business";
  stats: { [key: string]: number }; // Flexible stats for businesses
  services: string[];
  featuredWork: { title: string; image: string }[];
  contact: BaseProfileData["contact"] & {
    phone?: string;
    address?: string;
  };
};