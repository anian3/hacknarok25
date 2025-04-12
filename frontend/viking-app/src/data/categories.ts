import { Category, CategoryId } from '../types/categories';

export const CATEGORIES: Category[] = [
    {
      id: CategoryId.MUSIC,
      title: "Music",
      image: "/images/categories/music.jpg",
      link: "/forums/music"
    },
    {
      id: CategoryId.FILM,
      title: "Film",
      image: "/images/categories/film.jpg",
      link: "/forums/film"
    },
    {
      id: CategoryId.THEATER,
      title: "Theater",
      image: "/images/categories/theater.jpg",
      link: "/forums/theater"
    },
    {
      id: CategoryId.LITERATURE,
      title: "Literature",
      image: "/images/categories/literature.jpg",
      link: "/forums/literature"
    },
    {
      id: CategoryId.PAINTING,
      title: "Painting",
      image: "/images/categories/painting.jpg",
      link: "/forums/painting"
    },
    {
      id: CategoryId.PHOTOGRAPHY,
      title: "Photography",
      image: "/images/categories/photography.jpg",
      link: "/forums/photography"
    },
    {
      id: CategoryId.SCULPTURE,
      title: "Sculpture",
      image: "/images/categories/sculpture.jpg",
      link: "/forums/sculpture"
    },
    {
      id: CategoryId.FASHION,
      title: "Fashion",
      image: "/images/categories/fashion.jpg",
      link: "/forums/fashion"
    },
    {
      id: CategoryId.COMPUTER_GRAPHICS,
      title: "Computer Graphics",
      image: "/images/categories/computer_art.jpg",
      link: "/forums/computer_art"
    },
    {
        id: CategoryId.MAIN,
        title: "Main Forum",
        image: "/images/categories/main.jpg",
        link: "/forums/main"
    }
  ];
  
  // Helper functions
  export function getCategoryById(id: CategoryId): Category | undefined {
    return CATEGORIES.find(category => category.id === id);
  }
  
  export function getAllCategories(): Category[] {
    return [...CATEGORIES];
  }