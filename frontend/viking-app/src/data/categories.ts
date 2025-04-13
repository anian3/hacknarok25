import { Category, CategoryId } from '../types/categories';

export const CATEGORIES: Category[] = [
    {
      id: CategoryId.MUSIC,
      title: "Music",
      image: "/assets/music.png",
      link: "/music"
    },
    {
      id: CategoryId.FILM,
      title: "Film",
      image: "/assets/film.png",
      link: "/film"
    },
    {
      id: CategoryId.THEATER,
      title: "Theater",
      image: "/assets/theater.png",
      link: "/theater"
    },
    {
      id: CategoryId.LITERATURE,
      title: "Literature",
      image: "/assets/writing.png",
      link: "/literature"
    },
    {
      id: CategoryId.PAINTING,
      title: "Painting",
      image: "/assets/painting.png",
      link: "/painting"
    },
    {
      id: CategoryId.PHOTOGRAPHY,
      title: "Photography",
      image: "/assets/photo.png",
      link: "/photography"
    },
    {
      id: CategoryId.SCULPTURE,
      title: "Sculpture",
      image: "/assets/sculpture.png",
      link: "/sculpture"
    },
    {
      id: CategoryId.FASHION,
      title: "Fashion",
      image: "/assets/fashion.png",
      link: "/fashion"
    },
    {
      id: CategoryId.COMPUTER_GRAPHICS,
      title: "Computer Graphics",
      image: "/assets/computer_graphics.png",
      link: "/computer_graphics"
    },
    {
        id: CategoryId.MAIN,
        title: "Main Forum",
        image: "/assets/all.png",
        link: "/"
    }
  ];
  
  // Helper functions
  export function getCategoryById(id: CategoryId): Category | undefined {
    return CATEGORIES.find(category => category.id === id);
  }
  
  export function getAllCategories(): Category[] {
    return [...CATEGORIES];
  }